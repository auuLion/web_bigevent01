$(function () {
    //声明layui变量
    var form = layui.form
    //1.对表单设置校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码与原密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码输入不一致！'
            }
        }
    })
    //2.监听修改密码按钮
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('"更新密码失败！')
                }
                layui.layer.msg('"更新密码成功！')
                //清空输入框-
                $('.layui-form')[0].reset()
            }
        })
    })
})