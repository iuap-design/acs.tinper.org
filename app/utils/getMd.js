const download = require('download');
const fs = require('fs-extra');

//https://raw.githubusercontent.com/tinper-acs/ac-qrcode/master/README.md

let components = require('../../static/components.json');

components.forEach(item => {
    download(`https://raw.githubusercontent.com/tinper-acs/${item}/master/README.md`).then(data => {
        fs.writeFile(`./docs/${item}.md`, data).then(() => {
            console.log(`😀 ${item} 文件写入成功!`);
        }).catch(err => {
            console.log(`❌ ${item} 文件写入失败!`);
            console.log(err);
        })
    }).catch(err => {
        console.log(`❌ ⏬${item} 文件请求失败!`);
        console.log(err);
    })
});