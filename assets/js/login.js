$(function () {
    //获取layui对象
    //表单元素
    var form = layui.form
    //提示框
    var layer = layui.layer
    //1.点击按钮，显示隐藏
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //2.自定义form表单校验规则
    //通过form对象verify方法定义新规则
    form.verify({
        //密码校验规则pwd
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //确认密码校验规则repwd
        repwd: function (value) {
            //value为确认密码框输入的值
            //获取pwd值
            var pwd = $('.reg-box input[name = password]').val()
            //判断pwd值与value值是否相等，不等则返回两次密码输入不一致
            if (value !== pwd) {
                return '两次密码输入不一致！'
            }
        }
    })
    //3.监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        //阻住默认提交
        e.preventDefault()
        //ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message, {
                    icon: 6
                })
                //自动跳转到登录页面
                $('#link_login').click()
                //重置注册表单元素
                $('#form-reg')[0].reset()
            }
        })
    })
    //4.监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                //提示消息判断状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你，登录成功')
                // 保存token到当地，并进行页面跳转
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})