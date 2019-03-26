const marked = require("marked");
const fs = require('fs-extra');
const path = require('path');
const render = require('koa-ejs');
const sidebar = require('../../static/sidebar.json');
const axios = require('axios');


//定义变量提取
///##.*代码演示/ 匹配规则改变，
// 官网react版本
module.exports = {
  index: async (ctx, next) => {
    let component = ctx.params.component||'summarize';
    let filePath = path.join(__dirname, `../../docs/${component}.md`);
    let data = await fs.readFileSync(filePath, 'utf-8');
    let jsList = [];
    if (/##.*代码演示/.test(data)) {//优化此部分代码
      let demo = `<div id="root"></div>`;
      data = data.replace(/##.*代码演示/, demo);
      try {
        let acHomePage = await axios.get(`https://tinper-acs.github.io/${component}/`)
        let requestJSList = acHomePage.data.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi)
        let jsStartIndex,jsEndIndex,scriptUrl;
        requestJSList.forEach((item) => {
          if(item.indexOf(`${component}`)>-1) {
            jsStartIndex = item.indexOf('src=\"')
            jsEndIndex = item.indexOf('\.js')
            scriptUrl = item.slice(jsStartIndex+5,jsEndIndex+3)
            scriptUrl = scriptUrl.indexOf('tinper-acs.github.io')===-1?'https://tinper-acs.github.io'+scriptUrl:scriptUrl
            jsList.push(scriptUrl)
          }
        })
      } catch (error) {
        
      }
    }
    data = marked(data);
    data = data
    .replace(/\<table/gi, '<div class="table-container">\n<table')
    .replace(/<\/table>/gi, "</table>\n</div>\n");
    await ctx.render('index', {
      sidebar: sidebar,
      docs: data,
      jsList:jsList,
      active:component
    });
  }
}