var config = {
  PORT: process.env.KUWIT_PORT || 8000,
  WIT_TOKEN: process.env.WIT_TOKEN,
  kube: {
    protocol: 'https',
    version: 'v1',
  },
  twitter: {
    consumer_key: process.env.KUWIT_CONSUMER_KEY,
    consumer_secret: process.env.KUWIT_CONSUMER_SECRET,
    access_token_key: process.env.KUWIT_TOKEN_KEY,
    access_token_secret: process.env.KUWIT_TOKEN_SECRET
  }
}

module.exports = config;