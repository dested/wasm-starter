module.exports = env => {
  return {
    entry: './app/index.js',
    output: {
      publicPath: "dist/"
    },
    ...(process.env.WEBPACK_SERVE ? {mode: 'development'} : {}),
    resolve: {
      extensions: ['.js', '.css', '.wasm'],
      alias: {}
    },
    externals: [{}],
    module: {
      rules: [
        {
          type: 'javascript/auto',
          test: /\.wasm/,
          loaders: ['arraybuffer-loader']
        }
      ]
    }
  };
};
