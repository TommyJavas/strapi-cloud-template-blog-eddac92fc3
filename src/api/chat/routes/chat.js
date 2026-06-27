module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/chat',
      handler: 'chat.handleChat',
      config: {
        policies: [],
        auth: false, // 允许前端公开调用，如果你需要登录鉴权可以改为 true
      },
    },
  ],
};