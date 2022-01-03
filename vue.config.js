//特别注意：vue.config.js为配置文件，配置完毕需要重启终端刷新以下
module.exports = {
    lintOnSave: false,
    
    //配置代理服务器
    devServer: {
        proxy: {
            '/api': {
                //只对请求路由为/api开头的请求进行代理转发
                target: 'http://39.98.123.211',//转发目标url
                changeOrigin: true              //支持跨域
            }
        }
    },
}