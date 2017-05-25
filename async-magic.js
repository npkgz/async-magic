// exposed api functions
let _api = {};

// assign methods
_api.promisify = require('./lib/promisify');
_api.promisifyAll = require('./lib/promisify-all');

module.exports = _api;