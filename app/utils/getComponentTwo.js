const fs = require('fs-extra');
const download = require('download-git-repo')
let componentsSource = require('../../static/componentsSource.json');
let length = Object.keys(componentsSource).length;
let components = require('../../static/componentsSource.json');


function consoleItem(length){
    if(length<=3){
        console.log(Object.keys(components))
    }
}

Object.keys(componentsSource).forEach((item,index)=>{
    if(fs.pathExistsSync(`tinper-acs/${item}`)){
        delete components[item]
        console.log(`😀 ${item} 已存在,还剩  ${--length}  个`)
        consoleItem(length)
    }else{
        let org = 'tinper-acs';
        if(item.indexOf('bee')==0)org='tinper-bee';
        console.log(`download ${item} tinper-acs/${item}`)
        download(`${org}/${item}`,`tinper-acs/${item}`,
        function (error) {
            if (error) {
                console.log(`❌ download ${item} 失败,下载地址是 ${org}/${item},还剩  ${length}  个` + error);
            }else{
                delete components[item]
                console.log(`😀 download ${item} 成功,还剩  ${--length}  个`);
                consoleItem(length)               
            }
        })
    }
    
})



fs.writeFileSync('./static/error.txt', '');



