/**
*
* @title 区分简单复杂查询
* @description const { Sample,Complex, FormItem } = AcSearchPanel;
*
*/
import React, { Component } from 'react';
import {  Icon, Button, Label, CitySelect, Rate, Slider, Switch, Checkbox, Radio, Select,  Col,Row , FormControl } from 'tinper-bee';
import DatePicker from 'bee-datepicker';
import AcSearchPanel from '../../src';
import Form from 'bee-form';
import InputNumber from 'bee-input-number';

const InputNumberGroup = InputNumber.InputNumberGroup;

const { Sample,Complex, FormItem } = AcSearchPanel;
const Option = Select.Option;
const orderTypes={
    'a':'类型1',
    'b':'类型2',
    'c':'类型3',
    'd':'类型4',
}


class SF extends Component{
    render(){
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <FormItem label="姓名" required={true}>
                    <FormControl placeholder="请输入用户名"
                        {...getFieldProps('username', {
                            validateTrigger: 'onBlur',
                        }) }
                    />
                </FormItem>
                <FormItem label={['金额最小值','金额最大值']}>
                    <InputNumberGroup 
                        iconStyle='two'
                        {...getFieldProps('money', {
                            validateTrigger: 'onBlur',
                        })}
                    />
                </FormItem>
            </div>
        )
    }
}

class CF extends Component{
    render(){
        const { getFieldProps, getFieldValue } = this.props.form;
        return (
            <div>
                <FormItem label="类型">
                            <Select  tooltip={orderTypes[getFieldValue('type')]}
                                {
                                ...getFieldProps('type', {
                                    initialValue: '',
                                }
                                )}>
                                <Option value="">请选择类型</Option>
                                {
                                    Object.keys(orderTypes).map((item, index) => {
                                        return (
                                            <Option key={item} value={item}>{orderTypes[item]}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber placeholder="请输入年龄"
                                {...getFieldProps('nl1', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber placeholder="请输入年龄"
                                {...getFieldProps('nl2', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber placeholder="请输入年龄"
                                {...getFieldProps('nl3', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber placeholder="请输入年龄"
                                {...getFieldProps('nl4', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber placeholder="请输入年龄"
                                {...getFieldProps('nl5', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber placeholder="请输入年龄"
                                {...getFieldProps('nl6', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <div>
                            <FormItem label="姓名11" required={true}>
                                <InputNumber placeholder="请输入用户名" iconStyle='two'
                                    {...getFieldProps('username1', {
                                        validateTrigger: 'onBlur',
                                    }) }
                                />
                            </FormItem>
                            <FormItem label={['金额最小值','金额最大值']} required={true}>
                                <InputNumberGroup 
                                    iconStyle='two'
                                    {...getFieldProps('money', {
                                        validateTrigger: 'onBlur',
                                    })}
                                />
                            </FormItem>
                            <FormItem label="姓名" required={true}>
                                <FormControl placeholder="请输入用户名"
                                    {...getFieldProps('username3', {
                                        validateTrigger: 'onBlur',
                                    }) }
                                />
                            </FormItem>
                            <FormItem label="姓名" required={true}>
                                <FormControl placeholder="请输入用户名"
                                    {...getFieldProps('username4', {
                                        validateTrigger: 'onBlur',
                                    }) }
                                />
                            </FormItem>
                        </div>
            </div>
        )
    }
}


class Demo1 extends Component {


    search=()=>{
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('校验失败', values);
            } else {
                console.log('校验成功', values);
            }
        });
    }

    reset=()=>{
        this.props.form.resetFields();
    }

    render () {
        return (
            <div>
                <AcSearchPanel 
                    search={this.search}
                    reset={this.reset}
                    hasChose={true}
                >
                    <Sample>
                        <SF form={this.props.form}/>
                    </Sample>
                    <Complex>
                        <CF form={this.props.form}/>
                    </Complex> 
                </AcSearchPanel>
            </div>
        )
    }
}

export default Form.createForm()(Demo1);