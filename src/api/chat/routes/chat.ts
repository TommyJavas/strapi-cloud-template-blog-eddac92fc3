export default {
  routes: [
    {
      method: "POST",
      path: "/chat",
      handler: "api::chat.chat.chat",
      config: {}
    }
  ]
};