import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Upload from 'bee-upload';
import ProgressBar from 'bee-progress-bar';
import Icon from 'bee-icon';
import Modal from 'bee-modal';
import Table from 'bee-table'
import Btns from 'ac-btns';
import Checkbox from 'bee-checkbox';
import cloneDeep from 'clone-deep';
import request from 'axios';
import { getSize, getFileNames,dateFormate,getCookie } from './utils.js';
import i18n from './i18n.js';
import multiSelect from "bee-table/build/lib/newMultiSelect";
import sort from "bee-table/build/lib/sort";

const MultiSelectTable = multiSelect(Table, Checkbox);
const ComplexTable = sort(MultiSelectTable, Icon);
const propTypes = {
    canUnfold:PropTypes.bool,//是否可以展开收起
    id:PropTypes.string.isRequired,
    clsfix:PropTypes.string,
    disabled:PropTypes.bool,
    getListNow:PropTypes.bool,//是否在willmonument时获得文件列表
    url:PropTypes.object,//地址
    uploadProps:PropTypes.object,//附件上传参数
    powerBtns:PropTypes.array,//可用按钮集合
    callback:PropTypes.func,//回调 第一个参数：成功(success)/失败(error)； 第二个参数：list 获得文件列表；delete 删除； upload 上传。 第三个参数：成功信息/错误信息。 第四个参数：null/error对象
    uploadBut:PropTypes.node, //动态肩部按钮
    lineToolbar:PropTypes.node, //动态行按钮
    afterGetList:PropTypes.func,//获取列表后可执行的操作
    vitualDelete:PropTypes.func,//本地执行删除
    recordActiveRow:PropTypes.func,//记录当前活动行
    getSelectedDataFunc:PropTypes.func,//启用多选后
    beforeAct:PropTypes.func,//执行操作前触发的方法；
    type:PropTypes.string,//使用者类型，mdf cn
};

const defaultProps = {
    id:'',
    clsfix:'ac-upload-list',
    disabled:false,
    getListNow:false,
    url:{// {id} 替换为 props.id
        "list":  `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/files`,//文件列表
        "upload": `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/{id}/`,//上传
        "delete": `https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}`,//下载 cooperation/rest/v1/file/5d639caaa957bd001936cec9  此处id为附件id
        "info":`https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/{id}/info/ `,//文件信息
    },
    uploadProps:{},
    powerBtns:['upload','reupload','download','delete','confirm','cancel'],
    localeCookie:'locale',
    callback:()=>{},
    canUnfold:true,
    getSelectedDataFunc:()=>{},
    uploadBut:null,
    lineToolbar:null,
    operationWidth: 200
};

class FileList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            selectedList:[],
            show:false,
            pageNo:1,
            pageSize:999999,
            hoverData:{},
            id:props.id,
            open:true,
            reload: Math.random()
        }
        this.hoverData={};
        this.localObj = i18n[getCookie(props.localeCookie)]||i18n['zh_CN'];
        this.columns = [{
            title: this.localObj.fileName,
            dataIndex: "fileName",
            key: "fileName",
            className: "rowClassName",
            width:300,
            render :(text,record)=>{
                return getFileNames(text,record.fileExtension);
            }
        },
        {
            title: this.localObj.fileExtension,
            dataIndex: "fileExtension",
            key: "fileExtension",
            width: 100
        },
        {
            title: this.localObj.fileSize,
            dataIndex: "fileSizeText",
            key: "fileSizeText",
            width: 100
        },
        {
            title: this.localObj.createrUser,
            dataIndex: "userName",
            key: "userName",
            width: 200,
            render:(text,record,index)=>{
                if(record.uploadStatus=='uploading'){
                    return <ProgressBar className="uploading" size="sm" active now = {20} />
                }else if(record.uploadStatus=='error'){
                    return <ProgressBar size="sm" active now = {90} />
                }else if(record.uploadStatus=='done'){
                    return decodeURIComponent(getCookie('yonyou_uname'))
                }else{
                    return text;
                }
            }
        },
        {
            title: this.localObj.createrTime,
            dataIndex: "ctime",
            key: "ctime",
            width: 200,
            render:(text,record,index)=>{
                if(record.uploadStatus=='uploading'){
                    return <span className='upload-status uploading'> <Icon type='uf-loadingstate'/> {this.localObj.uploading} </span>
                }else if(record.uploadStatus=='error'){
                    return <span className='upload-status error' title={record.errorMsg||this.localObj.uploadError}> <Icon type='uf-exc-c'/>{record.errorMsg||this.localObj.uploadError}</span>
                }else if(record.uploadStatus=='done'){
                    return dateFormate(new Date(),'yyyy-MM-dd hh:mm')
                }else{
                    return dateFormate(new Date(text),'yyyy-MM-dd hh:mm')
                }
            }
        },
        {
            title: this.localObj.operation,
            dataIndex: "e",
            key: "e",
            width: props.operationWidth,
            render:(text,record,index)=>{
                if(!this.props.disabled){
                    if(record.uploadStatus=='error'){
                        const uploadP = Object.assign({
                            name: 'files',
                            action:this.props.url.upload.replace('{id}',this.props.id),
                            onChange:this.fileChange,
                            multiple:true,
                            beforeUpload:this.reUpload,
                            withCredentials:true
                        },this.props.uploadProps);
                        return <div className="opt-btns">
                            <Btns localeCookie={this.props.localeCookie}
                                    powerBtns={this.props.powerBtns}
                                    type='line'
                                    btns={{
                                        reupload: {
                                            node:<Upload {...uploadP}>
                                                <Btns localeCookie={this.props.localeCookie}
                                                    powerBtns={this.props.powerBtns}
                                                    type='line'
                                                    btns={{ reupload:{} }}/>
                                            </Upload>
                                        },
                                        delete: {
                                            onClick: ()=>{this.deleteError(record.uid)}
                                        },
                                    }}
                                    powerBtns={props.powerBtns}
                            />
                        </div>
                    }else if(record.uploadStatus=='uploading'){
                        return <div className="opt-btns"></div>
                    }else{
                        return <div className="opt-btns">
                            {this.props.type =='mdf' ?
                                <div className="file-list-linetoolbar-container">{React.cloneElement(props.lineToolbar, { record })}</div>
                                : <Btns localeCookie={props.localeCookie}
                                        type='line'
                                        btns={{
                                            download: {
                                                onClick: this.download
                                            },
                                            delete: {
                                                onClick: this.deleteConfirm
                                            },
                                        }}
                                        powerBtns={props.powerBtns}
                            />}


                        </div>
                    }
                }

            }
            }];
    }
    componentDidMount(){
        const {getChild,getListNow}=this.props;
        getChild && getChild(this);
        getListNow && this.getList();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.id!=this.state.id){
            this.setState({
                id:nextProps.id
            })
            this.getList({},nextProps.id)
        }
        if(nextProps.getListNow&&(!this.props.getListNow)&&nextProps.id&&(nextProps.id!=this.state.id)){
            this.getList({},nextProps.id);
            this.setState({
                id:nextProps.id
            })
        }
        if(nextProps.reload && (nextProps.reload !== this.state.reload)){
            this.getList({},nextProps.id);
            this.setState({
                reload: nextProps.reload
            })
        }
    }

    /*操作前处理方法*/
    _handelBeforeAct=(type)=>{
        const {data}=this.state;
        const {beforeAct}=this.props;
        let flag=true;
        if(beforeAct){
            if(!beforeAct(type,data)){
                flag=false;
            }
        }
        return flag
    }
    /**获得文件列表 */
    getList=(pageObj={},propsId)=>{
        let id = propsId||this.props.id;
        let {afterGetList} =this.props;
        if(!this._handelBeforeAct('list')) return;
        if(id){
            let url = this.props.url.list.replace('{id}',id)
            let params=Object.assign({
                pageSize:this.state.pageSize,
                fileName:'',
                pageNo:this.state.pageNo//从1开始
            },pageObj)
            request(url, {
                method: "get",
                params,
                withCredentials:true
            }).then((res)=>{
                if(res.status==200){
                    if(res.data.data){
                        let list = res.data.data;
                        if(afterGetList){
                            list=afterGetList(list)
                        }
                        this.setState({
                            data:list,
                            pageSize:params.pageSize,
                            pageNo:params.pageNo
                        })
                    }
                    this.props.callback('success','list',res);
                }else{
                    this.props.callback('error','list',res);
                }
            }).catch(error=>{
                this.props.callback('error','list',error);
                console.error(error)
            })
        }

    }

    getSelectedDataFunc = (selectedList,record,index) => {
        let ids = []
        selectedList.forEach((item,index) => {
            ids.push(item.id)
        });

        let data = cloneDeep(this.state.data);
        data.forEach((item,index)=>{
            if(ids.indexOf(item.id)==-1){
                item._checked=false
            }else{
                item._checked=true
            }
        })
        this.setState({
            data,
            selectedList
        }, () => {
            this.props.getSelectedDataFunc && this.props.getSelectedDataFunc(selectedList,record,index);
        });
    };
    /**划过 */
    onRowHover = (index,record) => {
        const {recordActiveRow} =this.props;
        if(recordActiveRow) recordActiveRow(record);
        this.hoverData=record;
        this.state.hoverData = record;
        this.setState({
            hoverData:record
        })
    }
    /**删除上传失败的文件 */
    deleteError = (uid) => {
        let data = cloneDeep(this.state.data);
        data.forEach((item,index)=>{
            if(item.uid==uid)data.splice(index,1);
        });
        this.setState({
            data
        })
    }
    reUpload=(fileInfo,fileList)=>{
        let data = cloneDeep(this.state.data);
        let uid = this.state.hoverData.uid;
        data.forEach((item,index)=>{
            if(item.uid==uid)data.splice(index,1);
        });
        this.setState({
            data
        },()=>{
            this.beforeUpload(fileInfo,fileList);
        })
    }


    deleteConfirm=()=>{
        this.setState({
            show:true
        })
    }
    cancelFn=()=>{
        this.setState({
            show:false
        })
    }

    /**删除 */
    delete=()=>{
        const {vitualDelete}=this.props;
        if(!this._handelBeforeAct('delete')) return;
        if(vitualDelete && !vitualDelete(this.state.hoverData,this)) return; //本地删除
        let url = this.props.url.delete.replace('{id}',this.state.hoverData.id);
        request(url, {
            method: "delete",
            withCredentials:true
        }).then((res)=>{
            if(res.status==200){
                this.props.callback('success','delete',res);
                console.log(this.localObj['delSuccess']);
                this.getList()
                this.setState({
                    show:false
                })
            }else{
                this.props.callback('error','delete',res);
            }
        }).catch(error=>{
            this.setState({
                show:false
            })
            this.props.callback('error','delete',error);
            console.error(error);
        })
    }
    download=()=>{
        if(!this._handelBeforeAct('download')) return;
        let url = this.props.url.info.replace('{id}',this.state.hoverData.id)
        request(url, {
            method: "get",
            withCredentials:true
        }).then((res)=>{
            if(res.status==200){
                window.open(res.data.filePath)
                this.props.callback('success','download',res);
                console.log(this.localObj['downloadSuccess']);
            }else{
                this.props.callback('error','download',res);
            }
        }).catch(error=>{
            this.props.callback('error','download',error);
            console.error(error)
        })
    }

    // pageIndexChange=(pageNo)=>{
    //     this.getList({
    //         pageNo
    //     })
    // }
    // pageSizeChange=(pageSize)=>{
    //     this.getList({
    //         pageSize
    //     })
    // }


    fileChange=(info)=> {
        let data = cloneDeep(this.state.data);
        if (info.file.status !== 'uploading') {

        }
        if (info.file.status === 'done') {
            // let id = info.file.response.data[0].id;
            // data.forEach(item=>{
            //     if(item.uid==info.file.uid){
            //         item.uploadStatus='done';
            //         item.id=id
            //     }
            // });
            // this.setState({
            //     data
            // })
            this.props.callback('success','upload',info.file.response);
            console.log(this.localObj['uploadSuccess'])
            this.getList()
        }
        if (info.file.status === 'removed') {
            let msg = info.file.response.displayMessage[getCookie(this.props.localeCookie)]||info.file.response.displayMessage['zh_CN']
            console.error(`${info.file.name} ${this.localObj['uploadError']}`);
            this.props.callback('error','upload',info.file.response);
            data.forEach(item=>{
                if(item.uid==info.file.uid){
                    item.uploadStatus='error';
                    item.errorMsg = msg;
                }
            });
            this.setState({
                data
            })
        }
    }
    beforeUpload=(file,fileList)=>{
        let data = cloneDeep(this.state.data);
        fileList.forEach((fileInfo,index)=>{
            let nameAry = fileInfo.name.split('.');
            let obj = {
                fileExtension:'.'+nameAry[nameAry.length-1],
                fileName:nameAry.splice(0,nameAry.length-1).join('.'),
                fileSizeText:getSize(fileInfo.size),
                uid:fileInfo.uid,
                userName:decodeURIComponent(getCookie('yonyou_uname')),
                uploadStatus:'uploading'
            }
            data.unshift(obj);
        })
        this.setState({
            data
        })
    }
    changeOpenStatus = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render(){
        let { clsfix,id,disabled,uploadProps,canUnfold,uploadBut,toolbar,type, title } = this.props;
        let { data,open } = this.state;
        const uploadP =Object.assign({
            withCredentials:true,
            name: 'files',
            action: this.props.url.upload.replace('{id}',this.props.id),
            onChange:this.fileChange,
            multiple:true,
            beforeUpload:this.beforeUpload,
        },uploadProps)
        return(
            <div className={clsfix}>
                <div  className={open?`${clsfix}-header`:`${clsfix}-header close`}>
                    {
                        canUnfold?<div className={`${clsfix}-text`} onClick={this.changeOpenStatus}>
                            <Icon type={open?'uf-triangle-down':'uf-triangle-right'}></Icon>
                            <span>{title ? title : this.localObj.file}</span>
                        </div>:''
                    }
                    <div className={`${clsfix}-btns`}>
                        {
                            disabled?'':<Btns localeCookie={this.props.localeCookie}
                                              powerBtns={this.props.powerBtns}
                                              btns={{
                                                upload:{
                                                    node:<div>
                                                        {toolbar}
                                                        <Upload {...uploadP}>
                                                            {type == 'mdf' ? uploadBut : <Btns localeCookie={this.props.localeCookie} powerBtns={this.props.powerBtns} btns={{ upload:{} }}/>}
                                                        </Upload>
                                                    </div>
                                                },
                                              }}
                            />
                        }

                    </div>
                </div>
                <div className={open?`${clsfix}-file-area`:`${clsfix}-file-area hide`}>
                    {
                        type == 'mdf' ? <ComplexTable
                            columns={this.columns}
                            data={data}
                            rowKey={(record,index)=>index}
                            scroll = {{y:400}}
                            getSelectedDataFunc={this.getSelectedDataFunc}
                            onRowHover={this.onRowHover}
                            multiSelect={{type: "checkbox" }}

                        /> : <Table
                            columns={this.columns}
                            data={data}
                            rowKey={(record,index)=>index}
                            scroll = {{y:400}}
                            getSelectedDataFunc={this.getSelectedDataFunc}
                            onRowHover={this.onRowHover}

                        />
                    }
                    <Modal
                        size='sm'
                        className='pop_dialog'
                        show = { this.state.show }
                        onHide = { this.cancelFn } >
                            <Modal.Header closeButton>
                                <Modal.Title>{this.localObj.delete}</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className="pop_body">
                                <div>
                                    <span class="keyword">
                                        <i class="uf uf-exc-c-2 "></i>{this.localObj.delete}
                                    </span>
                                    <span className="pop_dialog-ctn">
                                        {this.localObj.delSure}
                                    </span>
                                </div>
                            </Modal.Body>

                            <Modal.Footer className="pop_footer">
                                <Btns localeCookie={this.props.localeCookie}
                                    powerBtns={this.props.powerBtns}
                                    btns={{
                                        confirm:{
                                            onClick:this.delete
                                        },
                                        cancel:{
                                            onClick:this.cancelFn
                                        },
                                    }}
                                />
                            </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
};

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;
export default FileList;
