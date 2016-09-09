const config = require('../config.js');

var twitterClient = require('twitter');
var twitter = new twitterClient({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const kuWitActions = {
  send(request, response, res) {

    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      res.json(response);
      return resolve();
    });
  },

  getTweets({context, entities}) {
    return new Promise(function(resolve, reject) {
      console.log("ENTITIES");
      console.log(entities)
      twitter.get('search/tweets', {q: 'kubernetes.js'}, function(error, tweets, response) {
        context.tweets = '';
        tweets.statuses.map((tweet) => {
          let markupTweet = '<div>@' + tweet.user.screen_name + '<p>' + tweet.text + '</p><br />';
          context.tweets = context.tweets + markupTweet;
        })
        return resolve(context);
      });
    });
  },

  getResource({context, entities}) {
    return new Promise(function(resolve, reject) {
      console.log("Entities:");
      console.log(entities)
      console.log("Context:");
      console.log(context)

      delete context.wrongResource;
      delete context.result;

      let resources = ['pods', 'namespaces', 'nodes', 'services', 'replicationControllers'];
      let resource = firstEntityValue(entities, 'resource');
      let host = firstEntityValue(entities, 'host') || context.host;
      let token = firstEntityValue(entities, 'token') || context.token;

      if (!host) {
        context.missingHost = true;
        return resolve(context);
      }
      else {
        delete context.missingHost
        context.host = host;
      }
      if (!token) {
        context.missingToken = true;
        return resolve(context);
      }
      else {
        context.token = token;
        delete context.missingToken 
      }

      console.log('transformed context');
      console.log(context);

      if (context.host && context.token && resource) {
        var kubeClient = require('node-kubernetes-client');
        var kube = new kubeClient({
            host:  context.host,
            protocol: config.kube.protocol,
            version: config.kube.version,
            token: context.token
        });

        // A valid resource
        if (resources.indexOf(resource) != -1) {
          kube[resource].get(function (err, resources) {
            console.log('err:', err);
            console.log('resources:', resources);
            context.result = '<br />';
            try {
              resources[0].items.map((resource) => {
                console.log(resource);
                context.result = context.result + resource.metadata.name + "<br />";
              })
            }
            catch(e) {
              context.result = "Something went wrong went talking to the cluster, reload the page to introduce new crendentials.";
              return resolve(context);
            }
            return resolve(context);
          });
        }
        else {
          context.wrongResource = true
          return resolve(context);
        }
      }
      // context.host && context.token but no resource yet.
      else {
        return resolve(context);
      }
    });
  }
}

module.exports = kuWitActions;
