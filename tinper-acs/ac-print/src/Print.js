import { getCookie,processData,Error } from './utils/index'
import request from './utils/request';


const localeObj = {//打印地址语言对应示例节点语言
    "zh_CN":'cn',
    "en_US":'en'
}

class Print{
    constructor(context='/demo-contract-server',printOrigin='https://u8cprint-daily.yyuap.com',locale={
        getCodeError:'获取打印code失败',
        getTenantError:'获取租户id失败',
        checkDataFirst:'请先选择一条数据'
    }){
        this.context = context;//接口上下文
        this.printOrigin = printOrigin;//打印上下文
        this.GET_PRINT_CODE = `${context}/contract/defaultprintcode`;//获得打印编码接口
        this.GET_TENANT = `${context}/contract/session_context_info`;//获得租户信息接口
        this.tenantid = window.jDiworkContext&&window.jDiworkContext.tenantId;//租户id
        this.locale = localeObj[getCookie('locale')]||'cn';
        this.localeLanguage = locale;
    }
    /**
     * 获取打印租户ID
     * @param {*} params
     */
    requestTenant(param){
        return request(this.GET_TENANT, {
            method: "get",
            param
        });
    }
    /**
     * 获取printcode
     * @param {*} params
     */
    requestPrintCode(){
        return request(this.GET_PRINT_CODE, {
            method: "get",
        });
    }
    printDesign(callback){
        if(!this.tenantid){
            this.requestTenant().then((res)=>{
                let { result } =  processData(res);
                if(result.status == 'success'){
                    this.tenantid = result.data.tenantId;
                    this.requestPrintCode().then(ress=>{
                        let resultt = processData(ress).result;
                        if(resultt.status=='success'){
                            let printCode = processData(ress).result.data.printCode;
                            window.open(`${this.printOrigin}/u8cprint/design/getDesign?printcode=${printCode}&lang=${this.locale}&tenantId=${this.tenantid}&u8cServerCode=u8cServerCode&domainDataBaseByCode=0b3f7f67-78b9-485d-8d91-c871ab446ab9&currentMainClassCode=7c03a217-568e-4fa6-99ec-346d83cf09f2&meta=1`);
                            callback&&callback()
                        }else{
                            Error(this.localeLanguage.getCodeError)
                        }
                    })
                }else{
                    Error(this.localeLanguage.getTenantError)
                }
            })
        }else{
            this.requestPrintCode().then(ress=>{
                let resultt = processData(ress).result;
                if(resultt.status=='success'){
                    let printCode = processData(ress).result.data.printCode;
                    window.open(`${this.printOrigin}/u8cprint/design/getDesign?printcode=${printCode}&lang=${this.locale}&tenantId=${this.tenantid}&u8cServerCode=u8cServerCode&domainDataBaseByCode=0b3f7f67-78b9-485d-8d91-c871ab446ab9&currentMainClassCode=7c03a217-568e-4fa6-99ec-346d83cf09f2&meta=1`);
                    callback&&callback()
                }else{
                    Error(this.localeLanguage.getCodeError)
                }
            })
        }
    }
    printView(dataId,callback){
        let serverUrl = `${window.location.origin}${this.context}/contract/dataForPrint`;
        if(dataId){
            if(!this.tenantid){
                this.requestTenant().then((res)=>{
                    let { result } =  processData(res);
                    if(result.status == 'success'){
                        this.tenantid = result.data.tenantId;
                        this.requestPrintCode().then(ress=>{
                            let resultt = processData(ress).result;
                            if(resultt.status=='success'){
                                let printCode = processData(ress).result.data.printCode;
                                window.open(`${this.printOrigin}/u8cprint/design/getPreview?printcode=${printCode}&lang=${this.locale}&tenantId=${this.tenantid}&serverUrl=${serverUrl}&params=${encodeURIComponent(JSON.stringify({id:dataId}))}&sendType=6&mate=1&domainDataBaseByCode=0b3f7f67-78b9-485d-8d91-c871ab446ab9&classifyCode=2df7c250-aa00-4532-a8f4-80478f03e5a8`)
                                callback&&callback()
                            }else{
                                Error(this.localeLanguage.getCodeError)
                            }
                        })
                    }else{
                        Error(this.localeLanguage.getTenantError)
                    }
                })
            }else{
                this.requestPrintCode().then(ress=>{
                    let resultt = processData(ress).result;
                    if(resultt.status=='success'){
                        let printCode = processData(ress).result.data.printCode;
                        window.open(`${this.printOrigin}/u8cprint/design/getPreview?printcode=${printCode}&lang=${this.locale}&tenantId=${this.tenantid}&serverUrl=${serverUrl}&params=${encodeURIComponent(JSON.stringify({id:dataId}))}&sendType=6&mate=1&domainDataBaseByCode=0b3f7f67-78b9-485d-8d91-c871ab446ab9&classifyCode=2df7c250-aa00-4532-a8f4-80478f03e5a8`)
                        callback&&callback()
                    }else{
                        Error(this.localeLanguage.getCodeError)
                    }
                })
            }
        }else{
            Error(this.localeLanguage.checkDataFirst)
        }
    }
}
export default Print;