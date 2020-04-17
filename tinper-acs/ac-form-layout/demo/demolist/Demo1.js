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

const layout = {
    lg:3,
    md:4,
    sm:6,
    xs:12
}

const { FormItem, FormRow,FormItemSpan } = FormLayout;

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
                <FormLayout >
                    <FormRow>
                        <FormItem label="姓名" required={true} {...layout} errorMsg={getFieldError('username')}>
                            <FormControl placeholder="请输入姓名"
                                {...getFieldProps('username', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入姓名',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="姓名" required={true} {...layout} errorMsg={getFieldError('username1')}>
                            <FormControl placeholder="请输入用户名"
                                {...getFieldProps('username1', {
                                    validateTrigger: 'onChange',
                                    rules: [{
                                        required: true, message: '请输入用户名',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="采购日期" required={true} {...layout} errorMsg={getFieldError('time')}>
                            <DatePicker
                            format="YYYY-MM-DD"
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
                        <FormItem label="订单类型" required={true} {...layout} errorMsg={getFieldError('type')}>
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
                        <FormItem label="用户名" required={true} {...layout} errorMsg={getFieldError('yonghuming')}>
                            <FormControl placeholder="请输入用户名"
                                 {...getFieldProps('yonghuming', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入用户名',
                                    }],
                                }) }
                            />
                        </FormItem>
                    </FormRow>
                    <FormRow>
                        <FormItem label="金额" required={true} {...layout}  errorMsg={getFieldError('complex_count')}>
                            <InputNumber  iconStyle="one" precision={2}
                                {...getFieldProps('complex_count', {
                                    initialValue: '',
                                    rules: [{
                                        required: true, message: '请输入金额',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="姓名" {...layout}>
                            <FormControl placeholder="请输入用户名"/>
                        </FormItem>
                    </FormRow>
                    <FormRow>
                        <FormItem label="姓名" required={true} {...layout}>
                            <FormControl placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem label="姓名"  {...layout}>
                            <FormControl placeholder="请输入用户名" value="看这是啥"/>
                        </FormItem>
                        <FormItem label="姓名"  {...layout}>
                            <FormControl placeholder="请输入用户名" value="看这是啥"/>
                        </FormItem>
                        <FormItem label="姓名" required={true} {...layout}>
                            <FormControl placeholder="请输入用户名"/>
                        </FormItem>
                    </FormRow>
                    <FormRow>
                        <FormItem label="姓名" required={true} {...layout}>
                            <FormControl placeholder="请输入用户名" value="看这是啥"/>
                        </FormItem>
                        <FormItem label="固定" {...layout}>
                            <FormItemSpan title="我比较特殊">我比较特殊</FormItemSpan>
                        </FormItem>
                        <FormItem label="姓名" required={true} {...layout}>
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