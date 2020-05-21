// 动态切换页面底部的标题
export function setNavigationBarTitle (title) {
  mpvue.setNavigationBarTitle({
    title
  })
}
// showToast
export function showToast (title) {
  mpvue.showToast({
    title,
    duration: 2000,
    icon: 'none'
  })
}
