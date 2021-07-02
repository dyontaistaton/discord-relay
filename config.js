const templates = require('./templates.json')

module.exports = {
  messageBases: {
    base: {
      timestamp: new Date(Date.now()).toISOString(),
      thumbnail: {
        url: ""
      }
    },
    ...templates
  }
}