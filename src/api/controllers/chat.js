module.exports = {
  async chatWithAI(ctx) {
    try {
      // 1. 获取前端发来的请求体
      const { message } = ctx.request.body;

      if (!message) {
        return ctx.badRequest('消息不能为空');
      }

      // 【核心逻辑模拟】：定义你的 system 设定
      const systemPrompt = {
        role: "system",
        content: "你是网站AI助手，请用中文回答，简洁回答"
      };

      // 2. 模拟一个遵守了 system 设定的 AI 回复
      // 这里我们在回复里明示：设定已生效，并且用中文、简洁地重复了用户的话
      const replyText = `【AI助手回复】收到！(已加载设定: "${systemPrompt.content}")。关于您问的"${message}"，由于目前处于测试阶段，我的简洁回答是：后端对接正常，准备好接入大模型了。`;

      // 3. 严格按照你前端需要的格式返回：data.reply
      return {
        reply: replyText
      };
    } catch (err) {
      // 良好的错误处理，防止前端一直 loading
      ctx.status = 500;
      return { reply: "后端发生错误，无法生成回复" };
    }
  },
};