$(function () {
    //获取layui定义变量
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 监听上传图片事件 / 选择上传文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    // 修改裁剪文件
    $('#file').on('change', function (e) {
        var file = e.target.files[0]
        //进行非空校验
        if (file == undefined) {
            return layer.msg('请选择图片！')
        }
        //根据选择文件，创建一个对应的url地址
        var newImgUrl = URL.createObjectURL(file)
        //重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //将头像文件转换为字符串并进行上传
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！')
                window.parent.getUserInfo()
            }
        })
    })

})