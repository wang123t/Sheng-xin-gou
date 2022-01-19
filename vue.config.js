//特别注意：vue.config.js为配置文件，配置完毕需要重启终端刷新以下
module.exports = {
    lintOnSave: false,
    //配置代理服务器
    devServer: {
        proxy: {
            '/api': {
                //只对请求路由为/api开头的请求进行代理转发
                target: 'http://39.98.123.211',//转发目标url
                changeOrigin: true, //支持跨域
                pathRewrite: { '^/api': '/api' } //如果目标url不带/api前缀，需要重写,利用正则{ ^/api : '' },空字符串替换;本例有/api,所以可以不用配置，或者配置为{ '^/api': '/api' }
            }
        }
    },
}