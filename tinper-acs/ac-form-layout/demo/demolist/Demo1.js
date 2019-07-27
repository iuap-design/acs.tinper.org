/**
*
* @title 这是标题
* @description 这是描述
*
*/
import React, { Component } from 'react';
import FormLayout from '../../src';
import {  Icon, Button, Label, CitySelect, Rate, InputNumber, Slider, Switch, Checkbox, Radio, Select,  Col,Row , FormControl, Form } from 'tinper-bee';
import DatePicker from 'bee-datepicker';

const { FormItem, FormRow } = FormLayout;

const orderTypes=[
    {
        'code':'001',
        'name':'类型1'
    },
    {
        'code':'002',
        'name':'类型2'
    },
    {
        'code':'003',
        'name':'类型3'
    },
]

class Demo1 extends Component {

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('校验失败', values);
            } else {
                console.log('提交成功', values)
            }
        });
    }
    render () {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
                <FormLayout>
                    <FormRow>
                        <FormItem label="姓名" required={true} md={3} errorMsg={getFieldError('username')}>
                            <FormControl placeholder="请输入用户名"
                                {...getFieldProps('username', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入用户名',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="采购日期" required={true} md={3} errorMsg={getFieldError('time')}>
                            <DatePicker
                                {
                                ...getFieldProps('time', {
                                    rules: [{
                                        required: true, message: '请选择采购日期',
                                    }],
                                }
                                ) }
                                placeholder={'请选择采购日期'}
                            />
                        </FormItem>
                        <FormItem label="订单类型" required={true} md={3} errorMsg={getFieldError('type')}>
                            <Select 
                                {
                                ...getFieldProps('type', {
                                    initialValue: '',
                                    rules: [{
                                        required: true, message: '请选择订单类型',
                                    }],
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
                        <FormItem label="姓名" required={true} md={3}>
                            <FormControl placeholder="请输入用户名"/>
                        </FormItem>
                    </FormRow>
                    <FormRow>
                        <FormItem label="金额" required={true} md={3}  errorMsg={getFieldError('complex_count')}>
                            <InputNumber  iconStyle="one" precision={2}
                                {...getFieldProps('complex_count', {
                                    initialValue: '',
                                    rules: [{
                                        required: true, message: '请输入金额',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="姓名" md={3}>
                            <FormControl placeholder="请输入用户名"/>
                        </FormItem>
                    </FormRow>
                    <FormRow>
                        <FormItem label="姓名" required={true} md={3}>
                            <FormControl placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem label="姓名"  md={3}>
                            <FormControl placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem label="姓名"  md={3}>
                            <FormControl placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem label="姓名" required={true} md={3}>
                            <FormControl placeholder="请输入用户名"/>
                        </FormItem>
                    </FormRow>
                </FormLayout>
                <Button colors="primary" onClick={this.submit}> 提交 </Button>
            </div>
        )
    }
}
export default Form.createForm()(Demo1)