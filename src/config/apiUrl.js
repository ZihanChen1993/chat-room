// let ipUrl = 'http://localhost:7000/'
// let socketUrl = 'localhost:7000/'
// let ipUrl = 'http://118.178.255.116:7000/'
// let socketUrl = '118.178.255.116:7000/'

let serVicePath = {

  socketUrl,

  // 登录
  checkLogin: ipUrl + 'checklogin',

  // 注册
  register: ipUrl + 'register',

  // 获取信息列表
  getMessageListByRoomId: ipUrl + 'getmessagelistbyroomid',

  // 换头像
  updateAvatar: ipUrl + 'updateavatar'

}

export default serVicePath;