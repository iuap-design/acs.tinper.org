import request from "ucf-request";

export default (url,options)=>{
    return request(
        url,
        options
    ).then((res)=>{
        return Promise.resolve(res)
    }).catch(err=>{
        return Promise.resolve(err);
    })
}