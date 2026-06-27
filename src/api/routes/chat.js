module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/chat',
      handler: 'chat.chatWithAI', // 指向控制器里的 chatWithAI 函数
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};