//通过ajaxPrefilter对服务器地址进行处理
//将ajaxPrefilter
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})