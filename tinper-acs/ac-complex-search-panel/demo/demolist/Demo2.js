/**
 *
 * @title 自定义展开收起
 * @description 复杂查询面板
 *
 */

import React, { Component } from 'react';
import SearchPanel from '../../src/index';
import { Col, Row, Icon, InputGroup, FormControl,Checkbox, Label, Message, Select, Radio } from "tinper-bee";
import moment from "moment/moment";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
const Option = Select.Option;
const FormItem = Form.FormItem;
const { RangePicker } = DatePicker;



class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData: [],
            approvalState: '',
            closeState: '',
            confirmState: '',
            voucherDate:[],
            open:true
        }
    }
    search = (err,values) => {//查询
        console.log('查询');
        console.log(values)
        this.setState({
            open:false
        })
    }
    reset = () => {//重置
        console.log('重置')
        this.setState({
            approvalState: '',
            closeState: '',
            confirmState: '',
            voucherDate: [],
        })
    }
    openHandle=(open)=>{
        console.log('openHandle',open)
        this.setState({
            open
        })
    }
    render () {
        const self=this
        const { getFieldProps, getFieldError } = self.props.form;
        let orderTypes=[{
            "code":"0",
            "name":"D001"
          },{
            "code":"1",
            "name":"D002"
          },{
            "code":"2",
            "name":"D003"
          },{
            "code":"3",
            "name":"D004"
          }]
        return (
            <div className="demoPadding">
                <SearchPanel form={self.props.form} 
                open={this.state.open}
                openHandle={this.openHandle}
                simple={(
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>订单编号：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('orderCode', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>供应商名称：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('supplierName', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={4}>
                            <FormItem>
                                <Label className='time'>凭证日期：</Label>
                                <RangePicker
                                    defaultValue={this.state.voucherDate}
                                    placeholder={'开始 ~ 结束'}
                                    dateInputPlaceholder={['开始', '结束']}
                                    {
                                    ...getFieldProps('voucherDate', {
                                        initialValue:this.state.voucherDate,
                                        onChange: function (v) {
                                            self.setState({
                                                voucherDate: v
                                            })
                                        }
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        </Row>)
                }
                search={this.search}
                 reset={this.reset}>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>订单类型：</Label>
                                <Select {
                                    ...getFieldProps('type', {
                                        initialValue: '',
                                    }
                                    )}>
                                    <Option value="">请选择</Option>
                                    {
                                        orderTypes.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.code}>{item.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>采购组：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('purchasingGroup', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>审批状态：</Label>
                                <Radio.RadioGroup
                                    selectedValue={this.state.approvalState}
                                    {
                                    ...getFieldProps('approvalState', {
                                        initialValue: '',
                                        onChange(value) {
                                            self.setState({ approvalState: value });
                                        },
                                    }
                                    )}
                                >
                                    <Radio value="0" >未审批</Radio>
                                    <Radio value="1" >已审批</Radio>
                                    <Radio value="" >全部</Radio>
                                </Radio.RadioGroup>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>关闭状态：</Label>
                                <Radio.RadioGroup
                                    selectedValue={this.state.closeState}
                                    {
                                    ...getFieldProps('closeState', {
                                        initialValue: '',
                                        onChange(value) {
                                            self.setState({ closeState: value });
                                        },
                                    }
                                    )}
                                >
                                    <Radio value="0" >未关闭</Radio>
                                    <Radio value="1" >已关闭</Radio>
                                    <Radio value="" >全部</Radio>
                                </Radio.RadioGroup>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>确认状态：</Label>
                                <Radio.RadioGroup
                                    selectedValue={this.state.confirmState}
                                    {
                                    ...getFieldProps('confirmState', {
                                        initialValue: '',
                                        onChange(value) {
                                            self.setState({ confirmState: value });
                                        },
                                    }
                                    )}
                                >
                                    <Radio value="0" >未确认</Radio>
                                    <Radio value="1" >已确认</Radio>
                                    <Radio value="" >全部</Radio>
                                </Radio.RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                </SearchPanel>
            </div>
        )
    }
}

export default Form.createForm()(Demo1);
