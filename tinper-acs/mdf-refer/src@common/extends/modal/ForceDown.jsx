import React, { Component } from 'react';
import { Modal,Button,Input,Row,Col} from 'antd';
const { TextArea } = Input;
export default class ForceDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            len: 255
        }

    }
    handleOk() {
        this.props.model.execute('handleForcedown', {
            key: 'Audit',
            value: this.state.value
        });
        this.props.close();
    }
    handleCancel = () => {
        this.props.close();
    }
    handleChange = (e) => {
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
  render() {
    const TextareaType  = {
        placeholder:'',
        autosize:{ minRows: 4, maxRows: 6 }
    }
    return (
        <Modal width={600} visible={true}  maskClosable={false} title='违规下架原因：' onOk={this.handleOk.bind(this)}  onCancel={this.handleCancel} className='audit'>
            <Row>
                <Col span={24} className='audit-row'>
                    <TextArea {...TextareaType} value = {this.state.value} onChange={this.handleChange}/>
                    <p className='audit-tips'>还可以输入<span>{this.state.len}</span>个字</p>
                </Col>
            </Row>
        </Modal>
    );
  }
}
