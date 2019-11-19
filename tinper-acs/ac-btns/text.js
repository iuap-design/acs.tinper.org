const fs = require('fs-extra')


let powerBtns = [ 'add',
            'search',
            'clear',
            'export',
            'save',
            'cancel',
            'update',
            'delete',
            'pbmsubmit',
            'pbmcancle',
            'pbmapprove',
            'printpreview',
            'printdesign',
            'upload' ]

        
let obj = {};

powerBtns.forEach(item=>{
    obj[item]={
        onClick:()=>{console.log(item)}
    }
})
console.log(JSON.stringify(obj))



fs.writeFile('file.txt',JSON.stringify(obj),(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('success')
    }
    
})