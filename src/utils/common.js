// 选择图片
export function chooseImage () {
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    // 图片选择成功后,  上传到后台服务器
    success (res) {
      const tempFilePaths = res.tempFilePaths
      // console.log('选择照片')
      wx.showLoading({
        title: '上传中...',
        mask: true
      })
      wx.uploadFile({
        url: '上传接口',
        filePath: tempFilePaths,
        name: 'file',
        success (res) {
          console.log('上传成功')
        },
        fail (res) {
          console.log(res)
          wx.hideLoading()
          wx.showModal({
            title: '错误提示',
            content: '上传图片失败',
            success (res) {
              console.log(res)
            }
          })
        }
      })
    },
    fail (res) {
      console.log('上传照片失败')
    },
    complete (rs) {
      console.log('上传照片完成')
    }

  })
}
// 预览图片
export function previewImage (e) {
  wx.showActionSheet({
    itemList: ['预览', '删除'],
    success (res) {
      // 选择预览
      if (res.tapIndex === 0) {
        wx.previewImage({
          current: e.currentTarget.id,
          urls: e.currentTarget
        })
      } else {
        // 选择删除
        e.currentTarget = ''
      }
    }
  })
}

// 保存文件至手机相册
