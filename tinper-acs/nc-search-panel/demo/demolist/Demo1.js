/**
*
* @title 基本示例
* @description 基本示例
*
*/
import React, { Component } from 'react';
import {  Icon, Button, Label, CitySelect, Rate, InputNumber, Slider, Switch, Checkbox, Radio, Select,  Col,Row , FormControl } from 'tinper-bee';
import DatePicker from 'bee-datepicker';
import NcSearchPanel from '../../src';
import Form from 'bee-form';

const { Sample,Complex, FormItem } = NcSearchPanel;
const Option = Select.Option;
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

    render () {
        const { getFieldProps, getFieldError } = this.props.form;
        
        return (
            <div>
                <NcSearchPanel 
                    search={()=>{console.log('search')}}
                    reset={()=>{console.log('reset')}}
                >
                    <Sample>
                        <FormItem label="姓名" required={true}>
                            <FormControl placeholder="请输入用户名"
                                {...getFieldProps('username', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入用户名',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <DatePicker
                                {
                                ...getFieldProps('time', {
                                }
                                ) }
                                placeholder={'请选择需求日期'}
                            />
                        </FormItem>
                    
                    </Sample>
                    <Complex>
                        <FormItem label="年龄">
                            <Select 
                                {
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
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('aaa', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入年龄',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('aaa', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入年龄',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('aaa', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入年龄',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('aaa', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入年龄',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('aaa', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入年龄',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('aaa', {
                                    validateTrigger: 'onBlur',
                                    rules: [{
                                        required: true, message: '请输入年龄',
                                    }],
                                }) }
                            />
                        </FormItem>
                        <div>
                            <FormItem label="姓名" required={true}>
                                <FormControl placeholder="请输入用户名"
                                    {...getFieldProps('username', {
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请输入用户名',
                                        }],
                                    }) }
                                />
                            </FormItem>
                            <FormItem label="姓名" required={true}>
                                <FormControl placeholder="请输入用户名"
                                    {...getFieldProps('username', {
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请输入用户名',
                                        }],
                                    }) }
                                />
                            </FormItem>
                        </div>
                        <div>
                            <FormItem label="姓名" required={true}>
                                <FormControl placeholder="请输入用户名"
                                    {...getFieldProps('username', {
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请输入用户名',
                                        }],
                                    }) }
                                />
                            </FormItem>
                            <FormItem label="姓名" required={true}>
                                <FormControl placeholder="请输入用户名"
                                    {...getFieldProps('username', {
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请输入用户名',
                                        }],
                                    }) }
                                />
                            </FormItem>
                            </div>
                    </Complex>  
                </NcSearchPanel>
            </div>
        )
    }
}
export default Form.createForm()(Demo1);