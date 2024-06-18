const { legacyCreateProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        legacyCreateProxyMiddleware({
            target: 'http://localhost:5001',
            changeOrigin: true,
        })
    );
};