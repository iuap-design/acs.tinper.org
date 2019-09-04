import React from 'react';
import { Modal, Button, Row, Col, Checkbox, Spin } from 'antd';
process.env.__CLIENT__ && require('./specifications.less');
import { proxy } from '@mdf/cube/lib/helpers/util';
export default class Specifications extends React.Component {
    constructor(props) {
        super(props);
        this.classId = {
            SpecSums: 'productSpec',
            PropertySums: 'productArchive',
            SKUPropertySums: 'productSku',
            OrderPropertySums: 'productOrder'
        }
        this.modelTitle = {
            SpecSums: '商品规格',
            PropertySums: '商品属性',
            SKUPropertySums: 'SKU属性',
            OrderPropertySums: '订单属性'
        }
        this.state = {
            specs: [],
            index: 0,
            isSpec: false,
            loading: true
        }
    }
    ltrim(str){
        return typeof str==='string'?str.replace(/(^\s*)/g,""):''
    }
    componentDidMount() {
        const config = {
            url: '/bill/ref/getRefData',
            method: 'POST',
            params: {
                "refCode": "pc_userdefclassref",
                "billnum": "pc_producttpl",
                "mapCondition": {
                    classId: this.classId[this.props.childrenField]
                },
                "page": {
                    "pageSize": 6000,
                    "pageIndex": 1
                }
            }
        }
        proxy(config).then(json => {
            if (json.code !== 200) return;
            json.data.gridData.recordList.map(val => {
                return val['checked'] = false
            })
            let specs = json.data.gridData.recordList;
            let _data = this.props.data;
            if (!specs.length) {
                this.setState({ isSpec: true, loading: false })
                return false
            }
            _data.length && specs.map(val => {
                val.default = 0 // 默认传过来的是否有值
                let _spec = _data.filter(v => val.id == v.specification || val.id == v.propertyType);
                if (_spec.length) {
                    val.checked = true
                    val.default = 1
                    let recordList;
                    switch (this.props.childrenField) {
                        case 'SpecSums':
                            let specitemList = (_spec[0].specitem || '').split(';'); 
                            let erpNameList = (_spec[0].erpName || '').split(';'); 
                            recordList = specitemList.map((v,index)=>{
                                return {name:this.ltrim(v),checked:true,erpName:this.ltrim(erpNameList[index])}
                            })
                            break;
                        case 'PropertySums':
                        case 'SKUPropertySums':
                        case 'OrderPropertySums':
                            let _values = (_spec[0].values || '').split(';');
                            recordList = _values.map(v => {
                                return { name: this.ltrim(v), checked: true }
                            }) || []
                            break;
                        default:
                    }
                    val.recordList = recordList
                }
                return val
            })
            this.getspecitem(specs, 0, false)
        })
    }
    handleOk = (e) => {
        let _specsCheckedData = this.state.specs.filter(v => v.checked);
        if (!_specsCheckedData.length) {
            cb.utils.alert(('请选择' + this.modelTitle[this.props.childrenField] + '值'), 'warning');
            return false
        }
        if (this.props.childrenField == 'SpecSums' && _specsCheckedData.length > 5) {
            cb.utils.alert('最多选择5个规格', 'warning');
            return false
        }
        this.props.model.execute('afterHandleOK', { key: 'Specifications', value: _specsCheckedData });
        this.props.close()
    }
    getspecitem = (specs, index, isChecked) => { // 是否改变 recordList 里面checked的值
        if (!isChecked) {
            this.setState({ loading: true })
        }
        const config = {
            "url": '/bill/ref/getRefData',
            "method": 'POST',
            "params": {
                "refCode": "pc_userdefref",
                "billnum": "pc_producttpl",
                "mapCondition": { "defineId": specs[index].defineId },
                "page": {
                    "pageSize": 6000,
                    "pageIndex": 1
                }
            }
        }
        proxy(config).then(json => {
            if (json.code !== 200) return;
            let recordList = json.data.gridData.recordList
            if (specs[index].default) { // 需要合并
                recordList.map(val => {
                    specitemlist: for (let i = 0, len = specs[index].recordList.length; i < len; i++) {
                        if (val.name == specs[index].recordList[i].name) {
                            val.checked = true
                            break specitemlist;
                        }
                    }
                })
                specs[index].recordList = recordList
                specs[index].default = 0
            } else {
                specs[index].recordList = recordList;
            }
            if (isChecked) {
                isChecked = specs[index].checked
                specs[index].recordList.map(v => {
                    v.checked = isChecked
                })
            }
            this.setState({ specs, index, loading: false })
        })
    }
    handleCancel = (e) => {
        this.props.close()
    }
    handleSpecsChange = (index, e) => {
        e.stopPropagation();
        let { specs} = this.state;
        if (this.props.childrenField == 'SpecSums') {
            let _specsCheckedData = specs.filter(v => v.checked);
            if(_specsCheckedData.length>=5){
                cb.utils.alert('最多选择5个规格', 'warning');
                return false
            }
        }
        specs[index].checked = !specs[index].checked
        if (!specs[index].recordList || specs[index].default) { //当没有子规格  ，发送请求
            // proxy 请求 当前的规格值
            this.getspecitem(specs, index, true);
        } else {
            specs[index].recordList.map(v => {
                v.checked = specs[index].checked
            })
            this.setState({ specs, index, loading: false })
        }
    }
    handleSpecsClick = (index, e) => {
        e.stopPropagation();
        let { specs } = this.state;
        if (!specs[index].recordList || specs[index].default) {
            // proxy 请求 当前的规格值
            this.getspecitem(specs, index, false)
        } else {
            this.setState({ index, loading: false })
        }
    }
    changeSpecsItem = (i, e) => {
        e.stopPropagation();
        let { specs, index } = this.state;
        specs[index].recordList[i].checked = !specs[index].recordList[i].checked
        let checked = false
        specs[index].checked = false
        specs[index].recordList.forEach(val => {
            if (!checked && val.checked) {
                checked = true
                specs[index].checked = true
            }
        })
        this.setState(specs)
    }
    render() {
        const { specs, index, isSpec } = this.state;
        const Specs = specs.length ? specs.map((val, index) => {
            return <p className='clearfix' key={index} onClick={this.handleSpecsClick.bind(this,index)}>
        <Checkbox style={{float:'left'}} onChange={this.handleSpecsChange.bind(this,index)} checked={val.checked}/>
        <span title={val.showItem || val.item}>{val.showItem || val.item}</span>
      </p>
        }) : '';
        const Subspecs = specs.length && specs[index]['recordList'] && specs[index]['recordList'].length ? specs[index]['recordList'].map((val, i) => {
            return <p key={i}>
        <Checkbox onChange={this.changeSpecsItem.bind(this,i)} checked={val.checked}>{val.name}</Checkbox>
      </p>
        }) : '';
        const IsSpec = isSpec ? <p>没有{this.modelTitle[this.props.childrenField]}</p> : ''
        const IsSubspec = (specs.length && specs[index]['recordList'] && !specs[index]['recordList'].length) ? <p>没有{this.modelTitle[this.props.childrenField]+'值'}</p> : ''
        return (
            <Modal
              visible={true}
              title={'选择'+this.modelTitle[this.props.childrenField]}
              width='600'
              height='500'
              onCancel={this.handleCancel}
              footer={null}
            >
                <Spin spinning={this.state.loading}>
                <Row gutter={24}>
                 <Col span={12}>
                    <p className='code-title'>
                        {'选择'+this.modelTitle[this.props.childrenField]} 
                        { 
                            this.props.childrenField=='SpecSums'?
                            <em>(最多选择<i>5</i>个规格)</em>:
                            null
                        }
                    </p>
                    <div className='code-box'>
                      {Specs}
                      {IsSpec}
                    </div>
                  </Col>
                  <Col span={12}>
                    <p className='code-title'>{'选择'+this.modelTitle[this.props.childrenField]+'值'}</p>
                    <div className='code-box'>
                      {Subspecs}
                      {IsSubspec}
                    </div>
                  </Col>
                </Row>
                 <div className="ant-modal-footer" style={{borderTop:'none',"paddingRight":0,"paddingBottom":0}}>
                   <button type="button" className="ant-btn ant-btn-lg" onClick={this.handleCancel}><span>取 消</span></button>
                   <button type="button" className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.handleOk.bind(this)}><span>确 定</span></button>
                 </div>
                </Spin>
          </Modal>
        );
    }
}