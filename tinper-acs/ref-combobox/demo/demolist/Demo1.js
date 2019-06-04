/**
 *
 * @title 基础示例1
 * @description ref-combobox下拉参照
 *
 */

import React, { Component } from 'react';

import Form from "bee-form";
import RefComboBoxBaseUI, { ComboStore,ComboItem } from '../../src';
// import '../../src/index.less';
import Button from 'bee-button';
import 'bee-button/build/Button.css';
import Icon from 'bee-icon';
import 'bee-icon/build/Icon.css';

let op = {
     valueField : 'refcode',
     displayField : (record) => {
        return <div > <Icon type="uf-personin-o" style={{ color: 'red' }} /> {record.refname}-{record.refcode}-{record.type}</div>
    },
}
let storeData =  [{"rownum_":1,"code":"bj","name":"北京总部-简","refcode":"bj","refpk":"11111","id":"11111","refname":"北京总部-简"},{"rownum_":2,"code":"xd","name":"新道-简","refcode":"xd","refpk":"b691afff-ea83-4a3f-affa-beb2be9cba52","id":"b691afff-ea83-4a3f-affa-beb2be9cba52","refname":"新道-简"},{"rownum_":3,"code":"yy3","name":"test3","refcode":"yy3","refpk":"e75694d9-7c00-4e9e-9573-d29465ae79a9","id":"e75694d9-7c00-4e9e-9573-d29465ae79a9","refname":"test3"},{"rownum_":4,"code":"yy1","name":"test1","refcode":"yy1","refpk":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","id":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","refname":"test1"},{"rownum_":5,"code":"fan-1","name":"fan-1","refcode":"fan-1","refpk":"e73fca8d-3f33-4632-9650-c2e33816b3b3","id":"e73fca8d-3f33-4632-9650-c2e33816b3b3","refname":"fan-1"},{"rownum_":6,"code":"fan-2","name":"fan-2","refcode":"fan-2","refpk":"b6a7697f-ee6b-439e-b210-b144b8a12e3c","id":"b6a7697f-ee6b-439e-b210-b144b8a12e3c","refname":"fan-2"},{"rownum_":7,"code":"fan-3","name":"fan-3","refcode":"fan-3","refpk":"4b304d32-54e4-4f40-81d9-25a31ed02760","id":"4b304d32-54e4-4f40-81d9-25a31ed02760","refname":"fan-3"},{"rownum_":8,"code":"fan-4","name":"fan-4","refcode":"fan-4","refpk":"102b81f0-129f-450e-a113-18c1e37b4188","id":"102b81f0-129f-450e-a113-18c1e37b4188","refname":"fan-4"},{"rownum_":9,"code":"fan-5","name":"fan-5","refcode":"fan-5","refpk":"84cc4a82-09ba-4dce-9ab5-4526709d1a20","id":"84cc4a82-09ba-4dce-9ab5-4526709d1a20","refname":"fan-5"},{"rownum_":10,"code":"fan-6","name":"fan-6","refcode":"fan-6","refpk":"ad2bd02a-90da-44ed-991b-ced5b1e90598","id":"ad2bd02a-90da-44ed-991b-ced5b1e90598","refname":"fan-6"}]
class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading:false,
          currentIndex:1,
          value :'{"refpk":"11111","refname":"北京总部-简"}',  //M0000000000002
        };
      }
    
    componentDidMount(){
    //   let _this = this;
    //   setTimeout(() => {
    //     _this.props.form.setFieldsValue({combobox:null})
    //   }, 4000);
    }
    onClickItem=(id,record)=>{
        console.log('clickItem',id,record)
        this.setState({
          value:`{"refname":${JSON.stringify(record.refname)},"refpk":${JSON.stringify(record.refpk)}}`
        })
    }
    onChangeFormControl  = (value) =>{
        console.log('搜索',value)
        this.setState({
          searchValue:value
        })
    }
    onFocusFormControl = (visible) =>{
        console.log('下拉当前是否展示',visible)
    }
    onSelect = (currentIndex) =>{
        console.log('分页跳转',currentIndex);
        this.setState({
            currentIndex:currentIndex
        })
    }
    render() {
        const { getFieldError, getFieldProps } = this.props.form;
        let {searchValue,currentIndex} = this.state;
        return (
            <div className="demoPadding">
                <RefComboBoxBaseUI
                    displayField={(record)=>{return `${record.refname}-haha`}}
                    inputDisplay={item=>{return `我们的:${item.refname}`}}
                    valueField={'refpk'}
                    lang={'zh_CN'}
                    {...getFieldProps('combobox', {
                        initialValue:this.state.value,  //M0000000000002
                        rules: [{
                            message: '提示：请选择',
                            pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                        }]
                    })}
                    // value={this.state.value}
                    storeData={storeData}
                    onClickItemInner={this.onClickItem}
                    onFocusFormControl={this.onFocusFormControl}
                    onSelect={this.onSelect}
                    onChangeFormControl={this.onChangeFormControl}
                    pageCount={5}
                    currPageIndex={currentIndex}
                    searchValue={searchValue}

                >
                </RefComboBoxBaseUI>
                <span style={{ color: 'red' }}>
                    {getFieldError('combobox')}
                </span>
                <Button
                    colors="primary"
                    onClick={() => {
                        this.props.form.validateFields((err, values) => {
                            if (err) {
                                alert("" + JSON.stringify(err));
                                return false;
                            }
                            alert("" + JSON.stringify(values))
                        });
                    }}>
                    提交
            </Button>
            </div>
        )
    }
}


export default Form.createForm()(Demo1);
