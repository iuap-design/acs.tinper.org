import AcTips from 'ac-tips';

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

export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
