/**
*
* @title 基本示例
* @description 基本示例
*
*/
import React, { Component } from 'react';
import {  Icon, Button, Label, CitySelect, Rate, Slider, Switch, Checkbox, Radio, Select,  Col,Row , FormControl } from 'tinper-bee';
import DatePicker from 'bee-datepicker';
import NcSearchPanel from '../../src';
import Form from 'bee-form';
import InputNumber from 'bee-input-number';

const InputNumberGroup = InputNumber.InputNumberGroup;

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



const translateKeyFunc=(values)=>{
    let obj = {};
    const translateKey = {
        'username':'姓名',
        'username1':'姓名1',
        'username2':'姓名2',
        'username3':'姓名3',
        'username4':'姓名4',
        'nl':'年龄1',
        'nl1':'年龄2',
        'nl2':'年龄3',
        'nl3':'年龄4',
        'nl4':'年龄5',
        'nl5':'年龄6',
        'nl6':'年龄7',
        'type':'类型',
        'money':'金额'
    }
    for(let attr in values){
        obj[translateKey[attr]] = values[attr];
    }
    console.log(obj)
    return obj;
}

class SF extends Component{
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
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
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
                <FormItem label="类型">
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
                                {...getFieldProps('nl1', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('nl2', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('nl3', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('nl4', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
                                {...getFieldProps('nl5', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <FormControl placeholder="请输入年龄"
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
    constructor(props){
        super(props);
        this.state={
            searchObj:{}
        }
    }

    search=()=>{
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('校验失败', values);
            } else {
                console.log('校验成功', values);
                this.setState({
                    searchObj:translateKeyFunc(values)
                })
            }
        });
    }

    reset=()=>{
        this.props.form.resetFields();
        this.setState({
            searchObj:{}
        })
    }

    render () {
        const { getFieldProps, getFieldError } = this.props.form;
        
        return (
            <div>
                <NcSearchPanel 
                    search={this.search}
                    reset={this.reset}
                    selectedData={this.state.searchObj}
                    hasChose={true}
                >
                    <Sample>
                        <SF form={this.props.form}/>
                    </Sample>
                    <Complex>
                        <CF form={this.props.form}/>
                    </Complex> 
                </NcSearchPanel>
            </div>
        )
    }
}

export default Form.createForm()(Demo1);