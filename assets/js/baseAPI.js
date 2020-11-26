//通过ajaxPrefilter对服务器地址进行处理
//将ajaxPrefilter
$.ajaxPrefilter(function (options) {
    //1.配置统一路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //2.身份认证
    //统一为/my/权限接口配置headers请求头信息
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            //获取权限
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //3.登录拦截
    options.complete = function (res) {
        //请求失败，而且是身份认证失败则强制跳转到login页面，并清空token
        if (res.responseJSON.status !== 0 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = "/login.html"
        }
    }
    //$.ajaxPrefilter() 里面的书写逻辑
    //1.所有ajax都要进行的配置
    //2.大部分ajax都要进行的操作
    //3.有规律的ajax进行的特有操作
})