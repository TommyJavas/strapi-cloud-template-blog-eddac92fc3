const secret = process.env.TURNSTILE_SECRET_KEY;

import axios from "axios";

export default {
  async verify(ctx) {
    const { token } = ctx.request.body;

    const secret = process.env.TURNSTILE_SECRET_KEY;

    const result = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      new URLSearchParams({
        secret,
        response: token,
      })
    );

    if (result.data.success) {
      return ctx.send({ ok: true });
    } else {
      return ctx.throw(400, "验证失败");
    }
  },
};