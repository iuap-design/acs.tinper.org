import React, { Component,Fragment } from 'react';
import PropTypes from "prop-types";
import { Modal,Loading } from 'tinper-bee';
import Btns from 'ac-btns';
import AcGrids from 'ac-grids';
import cloneDeep from 'clone-deep'
import request from './utils/request';
import { Error,processData } from './utils/index';


const propTypes = {
    processkey:PropTypes.string,//单据标示
    record:PropTypes.object,//单据对象
    callback:PropTypes.func,//回调函数
    type:PropTypes.oneOfType(['button','line']),//按钮类型
    locale:PropTypes.object,//多语资源
    context:PropTypes.string,//接口上下文
    submitProcessInstJudgeGo:PropTypes.bool,//是否需要接口判断
};

const defaultProps = {
   processkey:'1357000026525952',
   record:{},
   callback:()=>{},
   type:'line',
   context:'/demo-contract-server',
   submitProcessInstJudgeGo:false,
   locale:{
        activityName:'环节名称',
        userName:'被指派人',
        options:'操作',
        code:'编码',
        name:'名称',
        subSucess:'提交成功',
        assign:'指派',
        selectionOfficer:'选择人员',
   }
};

class ApprovalSubmit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            data:[],
            selectIndex:0,
            showLoading:false,
            allDataObj:{},
            showModal:false,
            data2:[]
        }

        this.columns=[
            {
                title: props.locale.activityName,
                dataIndex: "activityName",
                key: "activityName",
            },
            {
                title: props.locale.userName,
                dataIndex: "userName",
                key: "userName",
                render:(text,record,index)=>{
                    return <span>{this.getUserName(record)}</span>
                }   
            },
            {
                title: props.locale.options,
                dataIndex: "e",
                key: "e",
                textAlign:'center',
                render:(text,record,index)=>{
                    return <span className='approval-board-operation' onClick={()=>{this.appoint(index)}}>{props.locale.assign}</span>
                }
            },
        ]
        this.columns2=[
            {
                title: props.locale.code,
                dataIndex: "code",
                key: "code",
            },
            {
                title: props.locale.name,
                dataIndex: "name",
                key: "name" 
            },
        ]
    }

    getUserName = (record)=>{
        if(record.participants.length){
            let names = [];
            record.participants.forEach(item=>{
                names.push(item.name);
            })
            return names.join(',')
        }else{
            return ''
        }
    }
    /**
     * 指派
     */
    appoint = (selectIndex) =>{
        this.setState({
            selectIndex,
            showModal:true,
        })
    }

    onClick = ()=>{
        this.setState({
            showLoading:true
        })
        let record = this.props.record;
        delete record.ts;
        record.subscribeDate = new Date(record.subscribeDate.substr(0,10)).toISOString();
        let url = `${this.props.context}/contract/bpmSubmit/assignCheck`;
        request(url, {
            method: "post",
            data:{
                entity:record
            },
            params:{
                category:this.props.processkey,
                orgId:record.orgId
            }
        }).then(res=>{
            let { result } = processData(res);
            this.setState({
                showLoading:false
            })
            if(result.status=='success'){
                if(result&&result.data&&result.data.assignAble){
                    let data = result.data.assignInfo.assignInfoItems;
                    let data2 = data[this.state.selectIndex].participants;
                    this.setState({
                        allDataObj:result.data,
                        data:data,
                        show:true,
                        data2
                    })
                }else{//直接提交
                    this.sampleSubmit()
                }
            }
            
        }).catch(error=>{
            Error(error);
            this.setState({
                showLoading:false
            })
        })
        
    }

    close = ()=> {
        this.setState({
            show: false
        });
    }

    closeModal=()=>{
        this.setState({
            showModal:false
        })
    }


    ok=()=>{
        //保存数据
        this.setState({
            showLoading:true
        })
        let record = this.props.record;
        delete record.ts;
        let allDataObj = this.state.allDataObj;
        allDataObj.assignInfo.assignInfoItems=this.state.data;
        allDataObj.vo = {
            entity:record
        };
        let url = `${this.props.context}/contract/bpmSubmit/assignSubmit`;
        if(this.props.submitProcessInstJudgeGo)url = `${this.props.context}/contract/submitProcessInstJudgeGo`;
        request(url, {
            method: "post",
            data:allDataObj,
            params:{
                category:this.props.processkey,
                needSaved: false,
                orgId:record.orgId,
                processInstId:record.processInstId
            }
        }).then(res=>{
            let { result } = processData(res,this.props.locale.subSucess);
            this.props.callback()
            this.setState({
                show:false,
                showLoading:false
            })
        }).catch(error=>{
            this.props.callback(error)
            Error(error)
            this.setState({
                showLoading:false
            })
        })

    }

    /**
     * 直接提交
     */
    sampleSubmit=()=>{
        this.setState({
            showLoading:true
        })
        let url = `${this.props.context}/contract/bpmSubmit/commonSubmit`;
        let record = this.props.record;
        delete record.ts;
        record.subscribeDate = new Date(record.subscribeDate.substr(0,10)).toISOString();
        let data = {
            entity:record,
        }
        if(this.props.submitProcessInstJudgeGo){
            url = `${this.props.context}/contract/submitProcessInstJudgeGo`;
            data = {
                assignInfo:{},
                description:null,
                createType:null,
                assignSingle:false,
                assignAll:false,
                assignAble:true,
                vo:{
                    entity:record,
                }
            }
        }
        request(url, {
            method: "post",
            data:data,
            params:{
                category:this.props.processkey,
                needSaved: false,
                orgId:record.orgId,
                processInstId:record.processInstId
            }
        }).then(res=>{
            let { result } = processData(res,this.props.locale.subSucess);
            this.props.callback()
            this.setState({
                showLoading:false
            })
        }).catch(error=>{
            Error(error);
            this.setState({
                showLoading:false
            })
        })
    }


    getSelectedDataFunc = (selectData, record, index) => {
        this.setState({
            selectData
        });
        let _list = cloneDeep(this.state.data2);
        const allChecked = selectData.length == 0?false:true;
        if(!record){
            _list.forEach(item=>{
            item._checked = allChecked;
          })
        }else{
            _list[index]['_checked'] = record._checked;
        } 
        this.setState({
            data2:_list
        })
    }

    confirmOk=()=>{
        let index  = this.state.selectIndex;
        let data = cloneDeep(this.state.data);
        let participants = []
        this.state.selectData.forEach(item => {
            delete item._checked
            participants.push(item)
        });
        data[index].participants=participants;
        this.setState({
            data,
            showModal:false
        })
    }

    render() {
        return (
            <Fragment >
                <Loading show={this.state.showLoading} />
                <Btns type={this.props.type}
                    btns={{
                        pbmsubmit:{
                            onClick:this.onClick
                        }
                    }}
                />
                <Modal
                    backdropClassName="approval-board-modal-backdrop"
                    size = 'xlg'
                    dialogClassName='approval-board-modal'
                    show = { this.state.show }
                    onHide = { this.close } 
                    autoFocus ={false}
                    enforceFocus={false}
                    >
                    
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.locale.assign}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           <AcGrids
                                rowKey={(record, index) => index}
                                columns={this.columns}
                                data={this.state.data}
                                multiSelect={false}
                                scroll = {{y:500}}
                           />
                        </Modal.Body>
                        <Modal.Footer>
                            <Btns
                                btns={{
                                    confirm:{
                                        onClick:this.ok
                                    },
                                    cancel:{
                                        onClick:this.close
                                    },
                                }}
                            />
                        </Modal.Footer>
                </Modal>


                <Modal
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    dialogClassName='approval-board-modal2'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.locale.selectionOfficer}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <AcGrids
                            rowKey={(record, index) => index}
                            columns={this.columns2}
                            data={this.state.data2}
                            multiSelect={true}
                            scroll = {{y:500}}
                            getSelectedDataFunc={this.getSelectedDataFunc}
                            paginationObj={null}
                           />
                    </Modal.Body>

                    <Modal.Footer>
                        <Btns
                            btns={{
                                confirm:{
                                    onClick:this.confirmOk
                                },
                                cancel:{
                                    onClick:this.closeModal
                                },
                            }}
                        />
                    </Modal.Footer>
                </Modal>
            </Fragment>
            
        )
    }
}

ApprovalSubmit.propTypes = propTypes;
ApprovalSubmit.defaultProps = defaultProps;
export default ApprovalSubmit;
