const gh = require('ghreleases');
const fs = require('fs-extra');
const moment = require('moment');
const marked = require("marked");
let componentsSource = require('../../static/componentsSource.json');
let components = require('../../static/components.json');
let sidebar = require('../../static/sidebar.json');
const latestVersion = require('latest-version');


const auth = {
    token: 'eb0215dbe40b84ac0cc4bcdd0ab8a468bafb563c',
    user: 'liushaozhen'
}

/**
 * 获得组件release
 * @param {*} component 
 */
function getRelease(component) {
    gh.list(auth, 'tinper-acs', component, (err, list) => {
        if (err) {
            console.log(`❌❌ 读取release失败！${component} `)
            console.log(err);
        } else {
            let changesArray = [];
            list.forEach(item => {
                let change = {
                    published_at: moment(item.published_at).format('YYYY-MM-DD'),
                    html_url: item.html_url,
                    tag_name: item.tag_name,
                    // body: item.body.replace(/- /g,'').replace(/##/g,''),
                    body: marked(item.body.replace(/@/g,' @').replace(/##/g,'').replace(/`/g,'')),
                };
                changesArray.push(change)
            });
            console.log("————————————"+component)
            components[component].changeLog = changesArray;
            fs.writeJson('./static/components.json', components)
                .then(() => {
                    console.log(`😀json文件写入成功! 写入了 ${component} 的 changelog`);
                })
                .catch(err => {
                    console.log(`❌json文件写入失败! ${component} 出错 的 changelog`);
                    console.error(err)
                })
        }
    })
}

Object.keys(componentsSource).forEach(item=>{
    getRelease(item);
})



let getLatestVersion = async () => {
    let tinperBeeVersion = await latestVersion('tinper-bee');

    sidebar['概述'].version = tinperBeeVersion;
        
    fs.writeJson('./static/sidebar.json', sidebar)
        .then(() => {
            console.log(`😀tinper-bee版本写入成功`);
        })
        .catch(err => {
            console.log(`❌tinper-bee版本写入失败`);
            console.error(err)
        })
};

getLatestVersion()