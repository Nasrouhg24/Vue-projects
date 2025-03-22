const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    hot: true, // Active le hot reload (déjà activé par défaut)
    open: true, // Ouvre le navigateur automatiquement

    liveReload: true,         // Active le rechargement automatique
    port: 8080
  },
  transpileDependencies: true,


})
