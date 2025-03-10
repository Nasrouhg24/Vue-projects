const { defineConfig } = require('@vue/cli-service')

module.exports = {
  devServer: {

    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
      options: {
        usePolling: true,
      },
    },

  },
};

