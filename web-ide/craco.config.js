const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  webpack: {
    plugins: [new MonacoEditorWebpackPlugin()],
  },
  devServer: {
    proxy: {
      '/debug': 'http://localhost:3033',
      changeOrigin: true,
    },
  },
}
