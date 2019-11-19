import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindAll,isNumber,clearHtml} from './common';
import AcUpload from 'ac-upload';
import {IntlProvider,addLocaleData,FormattedMessage,injectIntl} from 'react-intl';
import 'ac-upload/build/ac-upload.css';

import Table from 'bee-table';
import multiSelect from "bee-table/build/lib/multiSelect.js";
import sort from 'bee-table/build/lib/sort.js';
import Button from 'bee-button';
import Checkbox from 'bee-checkbox';
import Icon from 'bee-icon';
import Message from 'bee-message';
import axios from 'axios';
import cookie from 'react-cookies';
import Popconfirm from 'bee-popconfirm';
import 'bee-popconfirm/build/Popconfirm.css';
import './index.scss';


let MultiSelectSortTable  = multiSelect(sort(Table, Icon), Checkbox);

const propTypes = {
	recordId: PropTypes.string,
    groupname: PropTypes.string,
    permission: PropTypes.oneOf(['read','private','full']),
    tenant: PropTypes.string,
    url: PropTypes.bool,
    baseUrl: PropTypes.string,
	uploadUrl: PropTypes.string,
	queryUrl: PropTypes.string,
	deleteUrl: PropTypes.string,
    downloadUrl: PropTypes.string,
    fileType: PropTypes.string,
    onFileTypeOver: PropTypes.func,
    fileMaxSize: PropTypes.number,
    onFileSizeOver: PropTypes.func,
    fileNum: PropTypes.number,
    onFileNumOver: PropTypes.func,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    onDelete: PropTypes.func,
    checkDuplicate: PropTypes.bool,
    locale: PropTypes.string,
    onUploadSuccess: PropTypes.func,
    onUploadError: PropTypes.func,
    onUploadDelete: PropTypes.func,
    onDeleteFile: PropTypes.func
}

const defaultProps = {
    baseUrl: '',
	uploadUrl: '/iuap-saas-filesystem-service/file/upload',
	queryUrl: '/iuap-saas-filesystem-service/file/query',
	deleteUrl: '/iuap-saas-filesystem-service/file/delete',
    downloadUrl: '/iuap-saas-filesystem-service/file/download',
    batchDeleteUrl: '/iuap-saas-filesystem-service/file/batchDeleteByIds',
    fileMaxSize: 10, //默认10M
    multiple: true,
    fileNum: 999,
    disabled: false,
    checkDuplicate: true
}

class AcAttachment extends Component{
    constructor(props){
		super(props);
		this.state = {
            fileList: [],
            action: props.uploadUrl,
            selectedFiles: [],
            tableList: [],
            btnUpload: this.fGetBtnByType('upload',false,props.disabled),
            btnDownload: this.fGetBtnByType('download',true,props.disabled),
            btnDelete: this.fGetBtnByType('delete',true,props.disabled)
        }
        this.selectedFiles = [];
        this.fileTypeIcons = ['css','doc','html','javascript','jpg','pdf','png','ppt','xls','xlsx','xml'];
        bindAll(this,['fGetTableColumns','fLoadFileList','fDeleteFile','fUploadSuccess','fUploadDelete','fDeleteInRow','fGetTableList','fGetUploadData',
                      'fDownload','fDelete','onSelectData','fConClick','beforeUpload','fValidateFileType','fSetSelectedFiles','fGetBtnByType']);
    }
    get uploadUrl(){
        return `${this.props.baseUrl}${this.props.uploadUrl}?t=${new Date().getTime()}`;
    }
    get queryUrl(){
        return `${this.props.baseUrl}${this.props.queryUrl}?t=${new Date().getTime()}`;
    }
    get deleteUrl(){
        return `${this.props.baseUrl}${this.props.deleteUrl}?t=${new Date().getTime()}`;
    }
    get downloadUrl(){
        return `${this.props.baseUrl}${this.props.downloadUrl}?t=${new Date().getTime()}`;
    }
    get batchDeleteUrl(){
        return `${this.props.baseUrl}${this.props.batchDeleteUrl}?t=${new Date().getTime()}`;
    }
    get fileMaxSize(){
        return this.props.fileMaxSize * 1024 * 1024;
    }
    componentWillReceiveProps(nextProps){
        //单据Id变化刷新文件列表
        if(nextProps.recordId && nextProps.recordId != this.props.recordId){
            this.fLoadFileList(nextProps);
        }
        //disabled变化更新按钮
        if(nextProps.disabled != this.props.disabled){
            this.setState({
                disabled: nextProps.disabled
            },() => {
                let btnUpload = this.fGetBtnByType('upload',nextProps.disabled,nextProps.disabled);
                let btnDownload = this.fGetBtnByType('download',nextProps.disabled,nextProps.disabled);
                let btnDelete = this.fGetBtnByType('delete',nextProps.disabled,nextProps.disabled);
                this.setState({
                    btnUpload: btnUpload,
                    btnDownload: btnDownload,
                    btnDelete: btnDelete
                });
            });
        }
    }
	componentDidMount(){
		this.fLoadFileList();
    }
	fLoadFileList(nextProps){
        const self = this;
        const {recordId,groupname,tenant} = nextProps || self.props;
        if(recordId && groupname){
            const params = {
                filepath: recordId,
                groupname: groupname,
            }
            if(tenant){
                params['tenant'] = tenant;
            }

            return axios({
                url: self.queryUrl,
                params: params
            }).then(function(res){
                if(res.data){
                    let fileList = res.data.data || [];
                    self.setState({
                        fileList: fileList,
                        tableList: self.fGetTableList(fileList)
                    })
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    fGetTableList(fileList){
        let {selectedFiles} = this.state;
        let tableList = fileList.map(function(item){
            const regExt = /\.(\w+)$/;
            let filetypeMatch = item.filename.match(regExt);
            let filetype = filetypeMatch ? filetypeMatch[1] : '';
            //修复table的checkbox不选中bug
            let _checked = false;
            selectedFiles.forEach((sf) => {
                if(sf.id == item.id){
                    _checked = sf._checked;
                }
            })
            return {
                ...item,
                key: item.id,
                uploaderName: item.uploaderName,
                filetype: filetype,
                _checked: _checked               
            }
        });
        //数据按照上传时间倒序
        tableList.sort(this.fCompareUploadTime);

        return tableList;
    }
    fDeleteFile(id){
		const self = this;

        return axios({
            url: self.deleteUrl,
            params: {
                id: id
            }
        }).then(function(res){
            return res;
        }).catch(function (error) {
            console.log(error);
        });
    }
    fBatchDeleteFiles(ids){
        const self = this;
        if(Array.isArray(ids)){
            ids = ids.join(',');
        }

        return axios({
            url: self.batchDeleteUrl,
            params: {
                ids: ids
            }
        }).then(function(res){
            return res;
        }).catch(function (error) {
            console.log(error);
        });
    }
	//成功之后添加文件进列表
    fUploadSuccess = (data) => {
        const self = this;
        self.fLoadFileList();

        let {onUploadSuccess} = self.props;
        onUploadSuccess && onUploadSuccess(data);
    }
    fDeleteInRow(id){
        this.fDeleteFile(id).then(() => {
            this.fLoadFileList(); 

            let {onDeleteFile} = this.props;
            onDeleteFile && onDeleteFile([id]);
        });
    }
    fUploadDelete(data){
        const files = data.response.data;
        if(files && files.length){
            this.fDeleteFile(files[0].id).then(() => {
                this.fLoadFileList(); 

                let {onUploadDelete} = this.props;
                onUploadDelete && onUploadDelete(data);
            });
        }
    }
    fDownload(){
        const downloadUrl = this.downloadUrl;
        //打开多个窗口，会被拦截，需要手动允许
        this.selectedFiles.forEach((item) => {
            window.open(downloadUrl + '&id=' + item.id);
        });
    }
    fDelete(){
        const ids = this.selectedFiles.map((item) => item.id);
        this.fBatchDeleteFiles(ids).then(() => {
            this.fLoadFileList();
            this.fSetSelectedFiles([]);
            
            let {onDeleteFile} = this.props;
            onDeleteFile && onDeleteFile(ids);
        });
    }
    onSelectData(data){
        this.selectedFiles = data;
        this.fSetSelectedFiles(data);
    }
    fSetSelectedFiles(selectedFiles){
        this.setState({
            selectedFiles: selectedFiles || []
        });
        //按钮禁用
        let battchEnable = selectedFiles && selectedFiles.length > 0;
        let btnDisabled = !battchEnable;
        //获取按钮
        let outDisabled = this.props.disabled;
        let btnUpload = this.fGetBtnByType('upload',btnDisabled,outDisabled);
        let btnDownload = this.fGetBtnByType('download',btnDisabled,outDisabled);
        let btnDelete = this.fGetBtnByType('delete',btnDisabled,outDisabled);
        this.setState({
            btnUpload: btnUpload,
            btnDownload: btnDownload,
            btnDelete: btnDelete
        });
    }
	fGetTableColumns(){
        const self = this;
        const downloadUrl = self.downloadUrl;

		const columns = [
            { title: '', dataIndex: '', key: '', width: 50, 
              render(text, record, index) {
                return (
                    <React.Fragment>
                        <a href={downloadUrl + '&id=' + record.id} target="_blank">
                            <Icon className="uf-cloud-down"></Icon>
                        </a>
                        <Popconfirm trigger="click" placement="right" content={'确定删除此记录吗？'} onClose={() => this.fDeleteInRow(record.id)}>
                            <Icon className="uf-del attach-del"></Icon>
                        </Popconfirm>
                    </React.Fragment>
                );
              }
            },
            { title: <FormattedMessage id="intl.col.attachName" />, dataIndex: 'filename', key: 'filename', width: 200, 
                sorter:function(a,b){
                    return a.filename.localeCompare(b.filename);
                }
            },
            { title: <FormattedMessage id="intl.col.fileType" />, dataIndex: 'filetype', key: 'filetype', width: 150, render(text, record, index) {
                let ext = record.filetype;
                let filetypeCls = 'upload-filetype-' + ext;
                let hasIcon = self.fileTypeIcons.indexOf(ext) > -1;

                return (
                    <React.Fragment>
                        {hasIcon ? <span className={'upload-filetype ' + filetypeCls}></span> : <span>{ext}</span>}
                    </React.Fragment>
                );
              }
            },
            { title: <FormattedMessage id="intl.col.fileSize" />, dataIndex: 'filesize', key: 'filesize', width: 150, 
                sorter: function(a,b){
                    const reg = /^([\d.]+)([\w()]+)$/;
                    const matchA = a.filesize.match(reg),
                          matchB = b.filesize.match(reg);
                    if(matchA && matchB){
                        const numA = matchA[1],
                              unitA = matchA[2],
                              numB = matchB[1],
                              unitB = matchB[2];
                        if(numA && unitA && numA && unitB){
                            if(numA == numB && unitA == unitB){
                                return 0;
                            }
                            return self.fConvertFileSize(numA,unitA) > self.fConvertFileSize(numB,unitB) ? 1 : -1;
                        }
                    }
                    return 1;
                }
            },
            { title: <FormattedMessage id="intl.col.uploaderName" />, dataIndex: 'uploaderName', key: 'uploaderName', width: 150, 
                sorter:function(a,b){
                    return a.uploaderName.localeCompare(b.uploaderName);
                }
            },
            { title: <FormattedMessage id="intl.col.uploadTime" />, dataIndex: 'uploadtime', key: 'uploadtime', width: 200,
                sorter:function(a,b){
                    return self.fCompareUploadTime(a,b);
                }
            }
		];

		return columns;
    }
    fConvertFileSize(numA,unitA){
        switch(unitA){
            case 'MB':
                numA = numA * 1024 * 1024;
                break;
            case 'KB':
                numA = numA * 1024;
                break;
            default:
                break;
        }

        return numA;
    }
    fCompareUploadTime(a,b){
        let aDate = +new Date(a.uploadtime),
            bDate = +new Date(b.uploadtime);
        if(aDate == bDate){
            return 0;
        }
        return aDate > bDate ? 1 : -1;
    }
    fGetBtnByProp(prop){
        const {children} = this.props;
        let btn = null;
        if(children){
            React.Children.forEach(children,function(item){
                if(item.props['data-btn'] == prop){
                    btn = item;
                }
            });
        }
        return btn;
    }
    fGetBtnByType(type,disabled,outDisabled){
        let btn = this.fGetBtnByProp(type);
        if(!btn){
            let map = {
                'upload':  (
                    <Button data-btn="upload" colors="primary" className="upload-btn" size='sm'>
                        <Icon className="uf-upload"></Icon><FormattedMessage id="intl.btn.upload" defaultMessage="上传"/>
                    </Button>
                ),
                'download': (
                    <Button data-btn="download" colors="primary" className="upload-btn" size='sm'>
                        <Icon className="uf-download"></Icon><FormattedMessage id="intl.btn.download" />
                    </Button>
                ),
                'delete': (
                    <Button data-btn="delete" colors="primary" className="upload-btn" size='sm'>
                        <Icon className="uf-del"></Icon><FormattedMessage id="intl.btn.delete" />
                    </Button>
                )
            };
            btn = map[type];
        }
        //外部禁用，则全部按钮禁用 
        if(outDisabled){
            btn = React.cloneElement(btn,{disabled:true});
        }
        //外部不禁用，则有选择记录时候控制删除和下载按钮的disabled
        else{
            if(type != 'upload'){
                btn = React.cloneElement(btn,{disabled:disabled});
            }
        }
       
        if(type == 'delete'){
            btn = this.renderDel(btn);
        }

        return btn;
    }
    fConClick(ev){
        let btnType = ev.target.getAttribute('data-btn');
        if(!btnType){
            btnType = ev.target.parentNode.getAttribute('data-btn');
        }

        switch(btnType){
            case 'download':
                this.fDownload();
                break;
            case 'delete':
                if(!this.props.onDelete){
                    this.fDelete();
                }
                break;
            default:
                break;
        }
    }
    renderDel(btn){
        let {onDelete} = this.props;
        btn = onDelete ? React.cloneElement(btn,{onClick:(ev) => {onDelete(this)}}) : btn;
        return (
            btn
        )
    }
    fValidateFileType(fileType){
        const accept = this.props.fileType;
        if(!accept){
            return true;
        }
        const accepts = accept.split(',');
        let valid = false;
        //若直接包含，则允许，若有前面类型相同，后为*的，也是允许
        for(let i=0,len=accepts.length;i<len;i++){
            let item = accepts[i];
            if(item == fileType){
                valid = true;
                break;
            }
            if(item.indexOf('*') > -1){
                const aAccept = item.split('/');
                const aType = fileType.split('/');
                if(aAccept.length > 1 && aType.length > 1){
                    valid = aAccept[0] == aType[0] && aAccept[1] == '*';
                }
            }
        }

        return valid;
    }
    beforeUpload(file){
        const {intl} = this.props;
        //文件大小检查
        if(file.size > this.fileMaxSize){
            Message.create({
                content: intl.formatMessage({id:'intl.msg.fileSize'},{fileSize:this.props.fileMaxSize}), 
                color: 'warning'
            });
            this.props.onFileSizeOver && this.props.onFileSizeOver(file);
            return false;
        }
        //文件类型检查
        if(!this.fValidateFileType(file.type)){
            Message.create({
                content: intl.formatMessage({id:'intl.msg.fileType'}), 
                color: 'warning'
            });
            this.props.onFileTypeOver && this.props.onFileTypeOver(file);
            return false;
        }
        //文件数量检查
        let {fileNum} = this.props;
        if(fileNum){
            let fileList = this.state.fileList || [];
            fileNum = parseInt(fileNum);
            if(fileList.length + 1 > fileNum){
                Message.create({
                    content: intl.formatMessage({id:'intl.msg.fileNum'},{fileNum:this.props.fileNum}),
                    color: 'warning'
                });
                this.props.onFileNumOver && this.props.onFileNumOver(file);
                return false;
            }
        }
        //文件重复检测
        if(this.props.checkDuplicate){
            let fileList = this.state.fileList || [];
            if(fileList.some(item => item.filename == file.name)){
                Message.create({
                    content: intl.formatMessage({id:'intl.msg.fileDuplicate'}), 
                    color: 'warning'
                });
                return false;
            }
        }

        return true;
    }
    getMsg(id){
        return clearHtml(document.getElementById(id).innerHTML);
    }
    fGetUploadData(){
        let {recordId,groupname,permission,url} = this.props;

        let uploadData = {
			filepath: recordId,
			groupname: groupname
        };
        if(permission){
            uploadData['permission'] = permission;
        }
        if(url){
            uploadData['url'] = url;
        }

        return uploadData;
    }
	render(){
		const columns = this.fGetTableColumns();
        let {fileList,selectedFiles,tableList,btnUpload,btnDownload,btnDelete} = this.state;
        let {fileType,className,multiple,intl,locale} = this.props;
        let fileMaxSize = this.fileMaxSize;
        let uploadUrl = this.uploadUrl;
        let uploadData = this.fGetUploadData();
        let conClass = classNames('ac-attachmentc',className);
        
		return (
                <div className={conClass} onClick={this.fConClick}>
                    <AcUpload
                        locale={locale}
                        title={intl.formatMessage({id:'intl.upload.title'})}
                        action={uploadUrl}
                        data={uploadData}
                        multiple={multiple}
                        isView={false}
                        accept={fileType}
                        maxSize={fileMaxSize}
                        beforeUpload={this.beforeUpload}
                        onError={(err) => {
                            Message.create({
                                content: intl.formatMessage({id:'intl.upload.error'}), 
                                color: 'danger'
                            });

                            let {onUploadError} = this.props;
                            onUploadError && onUploadError(err);
                        }}
                        onSuccess={this.fUploadSuccess}
                        onDelete={this.fUploadDelete}
                    >
                        {btnUpload}
                    </AcUpload>
                    {btnDownload}
                    {btnDelete}
                    <MultiSelectSortTable
                        bordered
                        className='upload-table'
                        columns={columns}
                        data={tableList}
                        multiSelect={{type:'checkbox'}}
                        getSelectedDataFunc={this.onSelectData}
                    />
                </div> 
		)
	}
}

AcAttachment.propTypes = propTypes;
AcAttachment.defaultProps = defaultProps;

export default injectIntl(AcAttachment,{withRef:true});
 