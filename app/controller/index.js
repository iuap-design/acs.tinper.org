
const marked = require("marked");
const fs = require('fs-extra');

module.exports = {
    index: async(ctx, next) => {
      let data = fs.readFileSync(
        path.join(__dirname, "../../docs/summarize.md"),
        "utf-8"
      );
      console.log(data);
      // data = marked(data);
      ctx.response.body = '123';
    },
    com: async(ctx, next) => {
      console.log(ctx.request.query)
      console.log(ctx.request.querystring)
    }
  }