import path from 'path';
const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const config = require('./config.js');


let Wit = require('./lib/wit.js').Wit;
let log = require('./lib/log.js');

// Webserver parameter
const PORT = config.PORT;
// Wit.ai parameters
const WIT_TOKEN = config.WIT_TOKEN;

// actions
const actions = require('./lib/kuWit');
const wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  logger: new log.Logger(log.DEBUG)
});

// ----------------------------------------------------------------------------
// Wit.ai bot specific code

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {userId: userId, context: sessionState}
const sessions = {};

const findOrCreateSession = (userId) => {
  let sessionId;
  // Let's see if we already have a session for the user userId
  Object.keys(sessions).forEach(k => {
    if (sessions[k].userId === userId) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user userId, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {userId: userId, context: {}};
  }
  return sessionId;
};


// Starting our webserver and putting it all together
const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Serving static content.
app.use(express.static(path.resolve(__dirname, '../www')));

app.use(({method, url}, rsp, next) => {
  rsp.on('finish', () => {
    console.log(`${rsp.statusCode} ${method} ${url}`);
  });
  next();
});
app.use(bodyParser.json());

// Message handler
app.post('/webhook', (req, res) => {
  const data = req.body;

  // We retrieve the user ID of the sender
  const { userId, message } = data;

  // We retrieve the user's current session, or create one if it doesn't exist
  // This is needed for our bot to figure out the conversation history
  const sessionId = findOrCreateSession(userId);

  if (message) {
    console.log('message');
    console.log(message);
    // We received a text message

    // Let's forward the message to the Wit.ai Bot Engine
    // This will run all actions until our bot has nothing left to do
    wit.runActions(
      sessionId, // the user's current session
      message, // the user's message
      sessions[sessionId].context,  // the user's current session state
      res // the response object
    ).then((context) => {
      // Our bot did everything it has to do.
      // Now it's waiting for further messages to proceed.
      console.log('Waiting for next user messages');

      // Based on the session state, you might want to reset the session.
      // This depends heavily on the business logic of your bot.
      // Example:
      // if (context['done']) {
      //   delete sessions[sessionId];
      // }

      // Updating the user's current session state
      sessions[sessionId].context = context;
    })
    .catch((err) => {
      console.error('Oops! Got an error from Wit: ', err.stack || err);
    })
  }
});

app.listen(PORT);
console.log('Listening on :' + PORT + '...');
