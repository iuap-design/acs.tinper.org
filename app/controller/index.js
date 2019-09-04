const marked = require("marked");
const fs = require('fs-extra');
const path = require('path');
const render = require('koa-ejs');
const sidebar = require('../../static/sidebar.json');
const components = require('../../static/components.json');
let componentType = require('../../static/componentsType.json');


const renderer = new marked.Renderer();


renderer.heading = function (text, level) {
  if (level > 1) {
    return `<h${level} id="${text}">${text}</h${level}/>`
  } else {
    return `<h${level}>${text}</h${level}/>`
  }
}

renderer.link = function (href, title, text) {
  var target = '';
  if (href) {
    target = "_blank";
  } else {
    href = 'javacript:void(0);'
  }
  return `<a target="${target}" href="${href}" style="color:#E14C46" title="${text}" >${text}</a>`;
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});


/**
 * 获得文档的导航菜单
 */

let docsMenus = {};
Object.keys(sidebar).forEach(item => {
  let doc = sidebar[item];
  if (doc.children) {
    let child = doc.children[""];
    if (child) {
      Object.keys(child).forEach(ch => {
        docsMenus[child[ch].component] = {};
        docsMenus[child[ch].component].menus = child[ch].menus;
      })
    }
  } else {
    docsMenus[sidebar[item].component] = {};
    docsMenus[sidebar[item].component].menus = sidebar[item].menus;
  }
})



//定义变量提取
///##.*代码演示/ 匹配规则改变，
// 官网react版本
module.exports = {
  index: async (ctx, next) => {
    let component = ctx.params.component || 'summarize';
    let data = '';
    let filePath = '';
    let isComponentFlag = false; //是否是组件
    let rightMenus = {}; //右侧菜单
    let changeLog = []; //组件更新日志
    let isStander = false;
    let isGhpages = false;

    if (components[component]) { //是组件

      isComponentFlag = true;
      rightMenus = components[component].menus;
      changeLog = components[component].changeLog;
      let pack_data = await fs.readFileSync(path.join(__dirname, "../../tinper-acs/" + component + "/package.json"));
      if (pack_data) {
        pack_data = JSON.parse(pack_data);
        if (!pack_data) {
          pack_data = {};
        }
      }

      let flag = await fs.pathExistsSync(path.join(__dirname, `../../tinper-acs/${component}/docs/api.md`));

      if (!flag) { //非标准组件

        isStander = false;
        filePath = path.join(__dirname, `../../tinper-acs/${component}/README.md`); 
        data = await fs.readFileSync(filePath, 'utf-8');
        let haveGhpage = await fs.pathExistsSync(path.join(__dirname, `../../tinper-acs/${component}/ghpages/index.html`));
        if (haveGhpage) { //有github.io
          isGhpages = true;
          let indexHtml = fs.readFileSync(path.join(__dirname, `../../tinper-acs/${component}/ghpages/index.html`), 'utf-8');
          let requestJSList = indexHtml.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi);
          let scripts = '';
          requestJSList.forEach((item) => {
            if (item.indexOf(component) != -1) {
              scripts += item.replace('/'+component, './'+component + '/ghpages');
            }
          })
          let demo = '<h2 id="能力特性" class="">能力特性</h2><div id="root"></div>' + scripts;
          data = data.replace(/##.*代码演示/, demo);
        } else {

        }

      } else { //标准组件
        isStander = true;
        filePath = path.join(__dirname, `../../tinper-acs/${component}/docs/api.md`);
        data = await fs.readFileSync(filePath, 'utf-8');
        let demo1 = '<h2 id="能力特性" class="">能力特性</h2><div id="tinperBeeDemo"></div>';
        data = data.replace(/##.*代码演示/, demo1);


      }
      let str =
      data.match(/#? \w+/g) && data.match(/#? \w+/g).length ?
      data.match(/#? \w+/g)[0] :
      "";
    data = data.replace(
      /#? \w+/,
      str +
      "<a href='https://github.com/tinper-acs/" +
      component +
      "/edit/master/docs/api.md' class='pencil'  target='_blank' title='在github上编辑此页'><i class='uf uf-pencil-s' style='font-size: 20px;padding-left: 10px;'></i></a>" +
      "<div class='title-right'>" +
      "<a class='title-tag' href='https://github.com/tinper-acs/" + component + "/issues/new' target='_blank'><i class='uf uf-qm-c'></i><span>issue</span></a>" +
      "<a class='title-tag title-version' href='"+pack_data.homepage+"' target='_blank'>v"+pack_data.version+"</a>" +
      "</div>"
    );
    }else if (component == 'changelog') {
      rightMenus = docsMenus[component].menus;
      changeLog = sidebar['更新日志'].changeLog;
      filePath = path.join(__dirname, `../../docs/${component}.md`);
      data = await fs.readFileSync(filePath, 'utf-8');
    }
     else {
      filePath = path.join(__dirname, `../../docs/${component}.md`);
      rightMenus = docsMenus[component].menus;
      data = await fs.readFileSync(filePath, 'utf-8');
    }

   

    data = marked(data);

    data = data
      .replace(/\<table/gi, '<div class="table-container">\n<table')
      .replace(/<\/table>/gi, "</table>\n</div>\n");

    

    await ctx.render('index', {
      sidebar: sidebar,
      docs: data,
      active: component,
      isComponent: isComponentFlag,
      isStander: isStander,
      isGhpages: isGhpages,
      rightMenus: rightMenus,
      changeLog: changeLog,
      latestVersion:sidebar['概述']['version']
    });
  }
}