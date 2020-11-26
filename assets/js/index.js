$(function () {
    //获取layui定义变量
    var layer = layui.layer


    // 1.调用用户信息函数
    getUserInfo()
    //2.监控退出事件
    $('#btnLogout').on('click', function () {
        console.log(111);
        //对是否退出进行询问
        layer.confirm('是否确认退出？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //情况本地token
            localStorage.removeItem('token')
            //进行页面跳转
            location.href = "/login.html"
            //关闭询问框
            layer.close(index);
        });
    })
})
//外部调用需要全局函数，只能封装到入口函数之外，避免局部函数无法调用
//设置获取用户信息函数(由于其他页面还需要获取用户信息，封装到入口函数之外)
function getUserInfo() {
    $.ajax({

        url: '/my/userinfo',
        //12小时须重新登录，token为12小时过期事件
        //获取需要访问权限的数据需要特殊请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}
//获取用户信息，渲染头像
function renderAvatar(user) {
    //渲染用户名到侧边栏头像模块
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染头像
    if (user.user_pic !== null) {
        //用户信息包含头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //用户信息不包含头像则将用户名第一个文字渲染成头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}