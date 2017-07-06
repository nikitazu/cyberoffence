const path    = require('path');
const webpack = require('webpack');

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

const compiler = webpack(config);
compiler.run(function (err, stats) {
	console.log(stats.toJson());
});
