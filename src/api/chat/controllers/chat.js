const { OpenRouter } = require("@openrouter/sdk");

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

      const stream = await openrouter.chat.send({
        chatRequest: {
          model: process.env.AI_MODEL || "cohere/north-mini-code:free",
          
          // 👇 就是这里：增加了 system 提示词来控制 AI 的语言和字数
          messages: [
            {
              role: "system",
              content: "你是一个 AI 助手，中文回答，回答要简洁明了。"
            },
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