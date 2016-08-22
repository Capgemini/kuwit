const context = require.context('./src', true, /-test\.js$/); // make sure you have your directory and regex test set correctly!
require('core-js/es5');
context.keys().forEach(context);
