const path   = require('path');

const config = {
	context: path.join(__dirname, 'scripts'),
	entry: './main',
	output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js'
	},
  resolve: {
    modules: [
      'node_modules'
    , path.resolve(__dirname, 'scripts')
    ]
  }
};

module.exports = config;
