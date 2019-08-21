/**
*
* @title 基本示例
* @description 不区分简单复杂查询
*
*/
import React, { Component } from 'react';
import { Select, FormControl } from 'tinper-bee';
import AcSearchPanel from '../../src';
import Form from 'bee-form';
import InputNumber from 'bee-input-number';
import DatePicker from 'ac-datepicker';


const { AcRangePicker } = DatePicker;
const InputNumberGroup = InputNumber.InputNumberGroup;
const { FormItem } = AcSearchPanel;
const Option = Select.Option;
const orderTypes={
    'a':'类型1',
    'b':'类型2',
    'c':'类型3',
    'd':'类型4',
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
        const { getFieldProps,getFieldValue} = this.props.form;
        return (
            <div>
                <AcSearchPanel 
                    search={this.search}
                    reset={this.reset}
                >
                    <FormItem label="姓名" required={true} tooltip="我是自定义tooltip">
                    <FormControl 
                        {...getFieldProps('username', {
                            validateTrigger: 'onBlur',
                        }) }
                    />
                </FormItem>
                <FormItem label={['金额最小值','金额最大值']}>
                    <InputNumberGroup 
                        {...getFieldProps('money', {
                            validateTrigger: 'onBlur',
                        })}
                    />
                </FormItem>
                <FormItem label="类型" tooltip={orderTypes[getFieldValue('type')]}>
                            <Select 
                                {
                                ...getFieldProps('type', {
                                }
                                )}>
                                {
                                   Object.keys(orderTypes).map((item, index) => {
                                        return (
                                            <Option key={item} value={item}>{orderTypes[item]}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </FormItem>
                        <FormItem label="时间段" >
                            <AcRangePicker
                            format="YYYY-MM-DD"
                                {...getFieldProps('nl1', {
                                    initialValue:[]
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄" >
                            <InputNumber 
                                {...getFieldProps('nl2', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber 
                                {...getFieldProps('nl3', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber 
                                {...getFieldProps('nl4', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber 
                                {...getFieldProps('nl5', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>
                        <FormItem label="年龄">
                            <InputNumber 
                                {...getFieldProps('nl6', {
                                    validateTrigger: 'onBlur',
                                }) }
                            />
                        </FormItem>                     
                </AcSearchPanel>
            </div>
        )
    }
}

export default Form.createForm()(Demo1);