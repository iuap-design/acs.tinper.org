const fs = require('fs-extra');
const download = require('download-git-repo')
let componentsSource = require('../../static/componentsSource.json');
let componentType = require('../../static/componentsType.json')
let length = Object.keys(componentsSource).length;
let replaceReg = /import (.*) from "tinper-bee\/lib\/(.*)"/;

let item = 'ac-button';

if (componentType['others'].indexOf('ac-button') == -1) {
    let demojs = fs.readFileSync(`tinper-acs/${item}/dist/demo.js`);
    let com = replaceReg.exec(demojs)[1];
    if (com) {
        demojs = demojs.replace(replaceReg, `import ${com} from "${item}"`)
    }
    fs.writeFileSync(`tinper-acs/${item}/dist/demo.js`)
}