const fs = require('fs-extra');
const download = require('download-git-repo')
let componentsSource = require('../../static/componentsSource.json');
let length = Object.keys(componentsSource).length;

fs.remove('tinper-acs')
    .then(() => {
        fs.mkdir('tinper-acs');
        Object.keys(componentsSource).forEach((item,index)=>{
            let org = 'tinper-acs';
            if(item.indexOf('bee')==0)org='tinper-bee';
            console.log(`download ${item} tinper-acs/${item}`)
            download(`${org}/${item}`,`tinper-acs/${item}`,
            function (error) {
                if (error) {
                    console.log(`❌ download ${item} 失败,还剩  ${length}  个` + error);
                }else{
                    console.log(`😀 download ${item} 成功,还剩  ${--length}  个`)
                }
            })
        })
    })
    .catch(err => {
        console.error(err)
})

fs.writeFileSync('./static/error.txt', '');



