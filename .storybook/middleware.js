const proxy = require('http-proxy-middleware')

module.exports = function expressMiddleware(router) {
    router.use(['/json.worker.js', '/editor.worker.js', '/typescript.worker.js'], proxy({
        target: 'http://localhost:9005/dist/',
        changeOrigin: true
    }))
}