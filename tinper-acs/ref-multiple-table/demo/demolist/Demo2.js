/**
 *
 * @title RefMultipleTableWithInput
 * @description 使用RefMultipleTableWithInput，表格参照带有input
 *
 */
import React, { Component } from 'react';
import { FormControl,Button, Form } from 'tinper-bee';
import { SearchPanelItem,RefMultipleTableWithInput }  from '../../src/index';
import  '../../src/index.less';
let props = {
    placeholder: "placehholder",
    title: '复杂表格参照',
    backdrop: true,
    disabled: false,
    multiple: false,
    strictMode: true,
    miniSearch: false,
    valueField: "refpk",
    displayField: "{refname}",
    tableData: [{ "rownum_": 1, "code": "001", "name": "人员1", "mobile": "15011430230", "refcode": "001", "refpk": "cc791b77-bd18-49ab-b3ec-ee83cd40012a", "id": "cc791b77-bd18-49ab-b3ec-ee83cd40012a", "refname": "人员1", "email": "11@11.com", "key": "cc791b77-bd18-49ab-b3ec-ee83cd40012a" }, { "rownum_": 2, "code": "002", "name": "人员2", "mobile": "15011323234", "refcode": "002", "refpk": "de2d4d09-51ec-4108-8def-d6a6c5393c3b", "id": "de2d4d09-51ec-4108-8def-d6a6c5393c3b", "refname": "人员2", "email": "22@11.com", "key": "de2d4d09-51ec-4108-8def-d6a6c5393c3b" }, { "rownum_": 3, "code": "003", "name": "人员3", "mobile": "15011430232", "refcode": "003", "refpk": "004989bb-a705-45ce-88f3-662f87ee6e52", "id": "004989bb-a705-45ce-88f3-662f87ee6e52", "refname": "人员3", "email": "33@33.com", "key": "004989bb-a705-45ce-88f3-662f87ee6e52" }, { "rownum_": 4, "code": "004", "name": "人员4", "mobile": "15011430234", "refcode": "004", "refpk": "3570cbde-0d43-49ce-ad53-ab27ee6ee7dd", "id": "3570cbde-0d43-49ce-ad53-ab27ee6ee7dd", "refname": "人员4", "email": "33@34.com", "key": "3570cbde-0d43-49ce-ad53-ab27ee6ee7dd" }, { "rownum_": 5, "code": "005", "name": "人员5", "mobile": "15011430235", "refcode": "005", "refpk": "5e3a85ec-5e14-4734-8b3a-1e6168426c89", "id": "5e3a85ec-5e14-4734-8b3a-1e6168426c89", "refname": "人员5", "email": "55@26.com", "key": "5e3a85ec-5e14-4734-8b3a-1e6168426c89" }, { "rownum_": 6, "code": "006", "name": "人员6", "mobile": "15011323232", "refcode": "006", "refpk": "112621b9-b7ae-41b9-9428-61779334c5d6", "id": "112621b9-b7ae-41b9-9428-61779334c5d6", "refname": "人员6", "email": "66@516.com", "key": "112621b9-b7ae-41b9-9428-61779334c5d6" }, { "rownum_": 7, "code": "007", "name": "人员7", "mobile": "15011234567", "refcode": "007", "refpk": "394bba90-ed0f-4794-a44e-fd9ce6e9257d", "id": "394bba90-ed0f-4794-a44e-fd9ce6e9257d", "refname": "人员7", "email": "55@4.com", "key": "394bba90-ed0f-4794-a44e-fd9ce6e9257d" }, { "rownum_": 8, "code": "008", "name": "人员8", "mobile": "15011327890", "refcode": "008", "refpk": "a9f4c869-ca0b-4d12-847e-00eca08bfef6", "id": "a9f4c869-ca0b-4d12-847e-00eca08bfef6", "refname": "人员8", "email": "55@556.com", "key": "a9f4c869-ca0b-4d12-847e-00eca08bfef6" }, { "rownum_": 9, "code": "bpm01", "name": "张一", "mobile": "18777777777", "refcode": "bpm01", "refpk": "0dc47840-873a-4ed3-8ae7-c2335a76b385", "id": "0dc47840-873a-4ed3-8ae7-c2335a76b385", "refname": "张一", "email": "bpm01@qq.com", "key": "0dc47840-873a-4ed3-8ae7-c2335a76b385" }, { "rownum_": 10, "code": "bpm02", "name": "张二", "mobile": "18788888888", "refcode": "bpm02", "refpk": "c97b59e2-9fa3-44d7-93b0-1be52f7aa550", "id": "c97b59e2-9fa3-44d7-93b0-1be52f7aa550", "refname": "张二", "email": "bpm02@qq.com", "key": "c97b59e2-9fa3-44d7-93b0-1be52f7aa550" }],
    columnsData: [{ "key": "code", "dataIndex": "code", "title": "组织编码" }, { "key": "name", "dataIndex": "name", "title": "组织名称" }],
    fliterFormInputs: [],
    showLoading:false,
    filterUrl: '/pap_basedoc/common-ref/filterRefJSON',
}
class Demo3 extends Component {
    onSave = (item) => {
        console.log('save', JSON.stringify(item))
    }
    onCancel = () => {
    }
    launchTableHeader = () => {
        let data = {
            strFieldCode: ["code", "name", "email", "mobile"],
            strFieldName: ["人员编码", "人员名称", "人员邮箱", "人员电话"]
        }
        let { multiple } = props;
        let keyList = data.strFieldCode || [];
        let titleList = data.strFieldName || [];
        props["fliterFormInputs"] = [];
        let colunmsList = keyList.map((item, index) => {
            props["fliterFormInputs"].push(
                <SearchPanelItem key={item} name={item} text={titleList[index]}>
                    <FormControl />
                </SearchPanelItem>
            )
            return {
                key: item,
                dataIndex: item,
                title: titleList[index]
            }
        });
        if (colunmsList.length === 0) {
            colunmsList = [{ title: "未传递表头数据", dataIndex: "nodata", key: "nodata" }];

        } else if (!multiple) {
            //单选时用对号符号标记当前行选中
            colunmsList.unshift({
                title: " ",
                dataIndex: "a",
                key: "a",
                width: 45,
                render(text, record, index) {
                    return <div className={`ref-multiple-table-radio ${record._checked ? 'ref-multiple-table-radio-on' : ''}`} />
                }
            })

        }
        props["columnsData"] = colunmsList;
    }
    setMatchData = () =>{
        //设置选中数据
        props['matchData'] = [{"_checked":true,"rownum_":2,"code":"002","name":"人员2","mobile":"15011323234","refcode":"002","refpk":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","id":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","refname":"人员2","email":"22@11.com","key":"de2d4d09-51ec-4108-8def-d6a6c5393c3b"}];
    }
    render() {
        this.launchTableHeader();
        this.setMatchData();
        const { getFieldError, getFieldProps } = this.props.form;
        return (
            <div>
                <RefMultipleTableWithInput
                    {...props}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                    {...getFieldProps('valueField', {
                        initialValue:'{"refname":"人员2","refpk":"de2d4d09-51ec-4108-8def-d6a6c5393c3b"}',
                        rules: [{
                            message: '请输入姓名',
                            pattern: /[^{"refname":"","refpk":""}]/
                        }]
                    })}
                >
                </RefMultipleTableWithInput>
                <span className='error'>
                    {getFieldError('valueField')}
                </span>

                <Button onClick={() => {
                    this.props.form.validateFields((err, values) => {
                        console.log(err, values)
                    });
                }}>submit</Button>
            </div>

        )
    }
}
export default Form.createForm()(Demo3);