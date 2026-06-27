module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  // { 替换开始 }
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://www.duck666.fun'], // 允许你的前端域名访问
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  // { 替换结束 }
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
