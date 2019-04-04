export function bindAll(context,arrFunc){
    arrFunc.forEach(item => {
        context[item] = context[item].bind(context);
    });
}

/**
 * 将属性复制给目标对象
 * @param {object} target - 目标对象
 * @param {object} obj - 包含属性的对象
 */
export function assign(target,obj){
    for(var p in obj){
        if(obj.hasOwnProperty(p)){
            target[p] = obj[p];
        }
    }
}



