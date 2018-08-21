const search = require('./searches/book');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  beforeRequest: [
  ],

  afterResponse: [
  ],

  resources: {
  },

  triggers: {
  },

  searches: {
    [search.key]: search,
  },

  creates: {
  }
};

module.exports = App;
