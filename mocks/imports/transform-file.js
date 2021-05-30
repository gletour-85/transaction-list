const path = require('path');

module.exports = {
  process(_, filename) {
    return 'module.exports = ' + JSON.stringify(path.relative(process.cwd(), filename)) + ';';
  }
};
