const fs = require('fs-extra');
const download = require('download-git-repo')
let componentsSource = require('../../static/componentsSource.json');
let length = Object.keys(componentsSource).length;
const oldLength = Object.keys(componentsSource).length;


function consoleItem(length){
    if(length<=3){
        for(let i = 0;i<length;i++){
            let it = oldLength - length - i -1;
            console.log(`剩下：${Object.keys(componentsSource)[it]}`)
        }
    }
}

Object.keys(componentsSource).forEach((item,index)=>{
    if(fs.pathExistsSync(`tinper-acs/${item}`)){
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
                console.log(`😀 download ${item} 成功,还剩  ${--length}  个`);
                consoleItem(length)               
            }
        })
    }
    
})



fs.writeFileSync('./static/error.txt', '');



