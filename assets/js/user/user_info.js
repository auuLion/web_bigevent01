$(function () {
    //获取layui变量
    var form = layui.form
    var layer = layui.layer
    //1.设置表单验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1~6位之间！'
            }
        }
    })
    initUserInfo()
    //2.用户信息获取赋值
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                //判断是否获取成功
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    //3.监听重置按钮，点击可重置数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    //4.监听提交修改按钮，点击请求修改用户信息提交ajax，并重新获取用户数据
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败！')
                }
                layer.msg('用户信息修改成功！')
                window.parent.getUserInfo()
            }
        })
    })
})