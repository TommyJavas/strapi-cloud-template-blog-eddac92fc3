module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/chat', // 前端请求的路径就会变成 /api/chat
      handler: 'chat.chatWithAI', // 对应 controller 里的函数名
      config: {
        auth: false, // 暂时关闭安全策略，方便 Public 角色访问
        policies: [],
        middlewares: [],
      },
    },
  ],
};