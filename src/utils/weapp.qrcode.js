import drawQrcode from 'weapp-qrcode'

drawQrcode({
  width: 137,
  height: 137,
  canvasId: 'myQrcode',
  text: 'https://github.com/yingye'
})