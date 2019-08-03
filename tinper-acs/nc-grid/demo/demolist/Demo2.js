/**
*
* @title EditTable
* @description 
*
*/
import React, { Component } from 'react';
import NCGrid from '../../src';
const CardTable = NCGrid.CardTable;

const columns = [
    {
        itemtype: 'label', //label 类型不可编辑
        maxlength: '20', //限制字段长度
        visible: true, //是否显示列，设置为 false 或不设置，均不显示该列
        width: '100px', //列宽
        label: '行号', //列名称
        disabled: true, //是否禁止编辑
        attrcode: 'crowno' //字段名称
    },
    {
        itemtype: 'label',
        maxlength: '20',
        label: '收入合同子实体',
        width: '200px',
        disabled: true,
        required: true, //是否必填，列名称前加 *
        visible: true,
        attrcode: 'crevecontbid'
    },
    {
        itemtype: 'input',
        scale: '1',
        maxlength: '28',
        visible: true,
        width: '200px',
        label: '数量',
        required: true, 
        attrcode: 'npobnum'
    },
    {
        itemtype: 'select',
        visible: true,
        label: '确认收入时点',
        width: '200px',
        options: [
            {
                display: '销售发货',
                value: '0'
            },
            {
                display: '销售开票',
                value: '1'
            },
            {
                display: '手工',
                value: '2'
            }
        ],
        attrcode: 'fconfirmpoint'
    },
    {
        itemtype: 'number',
        scale: '2',
        width: '200px',
        maxlength: '28',
        visible: true,
        label: '分配金额',
        disabled: true,
        attrcode: 'nallotmny'
    },
    {
        itemtype: 'label',
        scale: '8',
        width: '200px',
        maxlength: '28',
        visible: true,
        label: '已履约数量',
        disabled: true,
        attrcode: 'nfinishnum'
    },
    {
        itemtype: 'label',
        scale: '8',
        width: '200px',
        maxlength: '28',
        label: '已履约金额',
        disabled: true,
        attrcode: 'nfinishmny'
    },
    {
        itemtype: 'label',
        maxlength: '19',
        width: '200px',
        label: '时间戳',
        disabled: true,
        attrcode: 'ts'
    },
    {
        itemtype: 'label',
        maxlength: '500',
        width: '200px',
        label: '行备注',
        disabled: true,
        attrcode: 'vrownote'
    }
];
  
const data = [
    {
        status: '0',
        rowid: 'hhghg-34343m43-434343wws',
        values: {
            ts: {
                value: '2018-03-21 10:53:18'
            },
            crevecontid: {
                value: '1001A310000000005SC8',
            },
            crevecontbid: {
                value: '1001A310000000005SC9',
            },
            fclosetype: {
                value: false,
            },
            nallotmny: {
                value: '1199.000',
            },
            fallocation: {
                value: false,
            },
            fconfirmpoint: {
                value: 1,
                display: '销售发货',
            },
            nfinishnum: {
                value: 'gggg',
            },
            npobnum: {
                value: '10888',
            },
            cpobid: {
                value: '10,3',
                display: '夏侯惇,白起',
            },
            cunitid: {
                value: false,
            },
            crowno: {
                value: 1
            }
        }
    },
    {
        status: '0',
        rowid: 'hhghg-344543243-434bbb3fdsf',
        values: {
            ts: {
                value: '2018-03-21 10:53:18'
            },
            crevecontid: {
                value: '1001A310000000005SC8'
            },
            crevecontbid: {
                value: '1001A310000000005SC9'
            },
            fclosetype: {
                value: false
            },
            nfinishnum: {
                value: '哈哈哈'
            },
            nallotmny: {
                value: '1199.000'
            },
            fallocation: {
                value: false
            },
            fconfirmpoint: {
                value: 1,
                display: '销售发货'
            },
            npobnum: {
                value: '10888'
            },
            cpobid: {
                value: '10,3',
                display: '广东,北京'
            },
            cunitid: {
                value: true
            },
            crowno: {
                value: 2
            }
        }
    },
    {
        status: '0',
        rowid: 'h2345hg-345hbvc43-434bebb3sdsc',
        values: {
            ts: {
                value: '2018-03-21 10:53:18'
            },
            crevecontid: {
                value: '1001A310000000005SC8'
            },
            crevecontbid: {
                value: '1001A310000000005SC9'
            },
            fclosetype: {
                value: false
            },
            nallotmny: {
                value: '1199.000'
            },
            fallocation: {
                value: false
            },
            fconfirmpoint: {
                value: 1,
                display: '销售发货'
            },
            nfinishnum: {
                value: '1234'
            },
            npobnum: {
                value: '10888'
            },
            cpobid: {
                value: '10,3',
                display: '中国,美国'
            },
            cunitid: {
                value: true
            },
            crowno: {
                value: 3
            }
        }
    },
    {
        status: '0',
        rowid: '5hhhg-345hbc43-434bebb3sddw',
        values: {
            ts: {
                value: '2018-03-21 10:53:18'
            },
            crevecontid: {
                value: '1001A310000000005SC8'
            },
            crevecontbid: {
                value: '1001A310000000005SC9'
            },
            nfinishnum: {
                value: 'ggefe'
            },
            fclosetype: {
                value: false
            },
            nallotmny: {
                value: '11955',
                scale: '2',
                disabled: false
            },
            fallocation: {
                value: false
            },
            fconfirmpoint: {
                value: 2,
                display: '手工'
            },
            npobnum: {
                value: '10.888',
                scale: '6'
            },
            cpobid: {
                value: 1,
                display: '1'
            },
            cunitid: {
                value: false
            },
            crowno: {
                value: 4
            }
        }
    },
    {
        status: '0',
        rowid: 'hhghg-34343m143-4343431wwde',
        values: {
            ts: {
                value: '2018-03-21 10:53:18'
            },
            crevecontid: {
                value: '1001A310000000005SC8'
            },
            crevecontbid: {
                value: '1001A310000000005SC9'
            },
            fclosetype: {
                value: false
            },
            nallotmny: {
                value: '1199.000'
            },
            fallocation: {
                value: false
            },
            fconfirmpoint: {
                value: 1,
                display: '销售发货'
            },
            nfinishnum: {
                value: 'gggg'
            },
            npobnum: {
                value: '10888'
            },
            cpobid: {
                value: '10,3',
                display: '夏侯惇,白起'
            },
            cunitid: {
                value: false
            },
            crowno: {
                value: 5
            }
        }
    },
];

const tabLists = [{
    code: 'body', 
    name: '详细信息',
    items: [], 
}];
  
class Demo2 extends Component {
    render () {
        return (
            <CardTable
            columns={columns}
            data={data}
            moduleId="body"
            tabLists={tabLists}
            showMore={true}
            showMax={true}
            config={{
                showCheck: true, //是否开启多选功能
                hideSwitch: () => false, //表格
            }}
            />
        )
    }
}
export default Demo2;