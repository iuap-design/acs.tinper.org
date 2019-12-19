import AcTips from 'ac-tips';
import cloneDeep from 'clone-deep';
import request from './request';

export const Success = (msg) => {
    AcTips.create({content: msg, type:'success', duration: 3000, })
}

export const Error = (msg) => {
    AcTips.create({content: msg, type:'error', duration: 3000, })
}

export const Warning = (msg) => {
    AcTips.create({content: msg, type:'warning', duration: 3000, })
}

export const Info = (msg) => {
    AcTips.create({content: msg, color: 'info', duration: 3000});
}
/**
 * 数据返回统一处理函数
 * @param {*} response
 * @param {*} successMsg 成功提示
 */
export const processData = (response, successMsg) => {
    let result={};
    try {
        if (typeof response != 'object') {
            Error('数据返回出错：1、请确保服务运行正常；2、请确保您的前端工程代理服务正常；3、请确认您已在本地登录过应用平台');
            return {result:null};
        }
        if (response.code == '200') {
            if (successMsg) {
                Success(successMsg);
            }
            result.status = 'success';
            result.data = response.data;
            return { result };
        } else {
            Error(`${response.message||'request error'}`);
            result.status = 'error';
            return { result };
        }
    } catch (e) {
        return {result};
    }
}