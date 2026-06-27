const { OpenRouter } = require("@openrouter/sdk"); // 如果是 CommonJS 规范 (根据你项目实际支持的语法)
// 或者如果你的项目完全支持打包/ESM，用：import { OpenRouter } from "@openrouter/sdk";

module.exports = {
  async handleChat(ctx) {
    try {
      const { message } = ctx.request.body;
      
      if (!message) {
        return ctx.badRequest('Message is required');
      }

      const openrouter = new OpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY || "<YOUR_FALLBACK_KEY>"
      });

      // 🔥 关键修改：将参数包裹在 chatRequest 对象中
      const stream = await openrouter.chat.send({
        chatRequest: {
          model: process.env.AI_MODEL || "cohere/north-mini-code:free",
          messages: [
            {
              role: "user",
              content: message
            }
          ],
          stream: true
        }
      });

      let fullResponse = "";
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          fullResponse += content;
        }

if (chunk.usage) {
  // 1. 先尝试获取原生下划线字段，再尝试驼峰字段
  const reasoning = chunk.usage['reasoning_tokens'] || chunk.usage['reasoningTokens'];
  if (reasoning) {
    console.log("\n[OpenRouter] 消耗 Reasoning tokens:", reasoning);
  }
}
      }

      return { reply: fullResponse };

    } catch (error) {
      console.error('OpenRouter AI Error:', error);
      return ctx.internalServerError('AI processing failed');
    }
  },
};