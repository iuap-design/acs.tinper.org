import React, { Component } from 'react';
import { Modal,Button,Input,Row,Col,Radio } from 'antd';
const RadioGroup = Radio.Group;
const { TextArea } = Input;
export default class Audit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            radiovalue: 'pass',
            radioshow: true,
            len: 255
        }
    }
    handlePass(e) {
        e.stopPropagation();
        this.props.model.execute('handleAudit', {
            key: 'Audit',
            state: this.state.radiovalue,
            value: this.state.value
        });
        this.props.close();
    }
    handleCancel = () => {
        this.props.close();
    }
    handleChange = (e) => {
        if (!this.state.radioshow) {
            let _value = e.target.value
            let _len = 255 - _value.length
            if (_len>=0) {
                this.setState({
                    value: _value,
                    len: _len
                })
            } else {
                let arr = _value.split('')
                arr.length=255
                this.setState({
                    value: arr.join(''),
                    len: 0
                })
            }
        }
    }
    radioChange(e) {
        this.setState({
            radioshow: !this.state.radioshow,
            radiovalue: e.target.value,
        });
    }
    render() {
            const TextareaType = {
                placeholder: '审核不通过原因',
                autosize: {
                    minRows: 4,
                    maxRows: 6
                },
                placeholder: '原因'
            }
    return (
        <Modal width={600} visible={true}  maskClosable={false} title='商品审核' onOk={this.handlePass.bind(this)}  onCancel={this.handleCancel} className='audit'>
            <Row>
                <Col span={24}>
                    <RadioGroup onChange={this.radioChange.bind(this)} value={this.state.radiovalue}>
                        <Radio value='pass'>通过</Radio>
                        <Radio value='unpass'>驳回</Radio>
                    </RadioGroup>
                </Col>
                <Col span={24} className='audit-row'>
                    <TextArea {...TextareaType} disabled={this.state.radioshow} value = {this.state.value} onChange={this.handleChange}/>
                    <p className='audit-tips'>还可以输入<span>{this.state.len}</span>个字</p>
                </Col>
            </Row>
        </Modal>
    );
  }
}
