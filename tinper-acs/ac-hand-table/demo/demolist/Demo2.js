/**
 *
 * @title 表格常用方法
 * @description 设置行样式、表格添加行、删除多选选中行、获取验证通过后数据、获取多选选中的数据、获取被修改后的数据、获取被格式化的数据、获取新增加的数据和获取删除的数据
 *
 */

import React, { Component } from 'react';
import { Button } from 'tinper-bee';

// 引入 AcHandTable 组件
// demo 工程中引入方式
import AcHandTable from '../../src/index';
import '../../src/index.less';

// 项目中引入方式
// import AcHandTable from 'ac-hand-table';
// import 'ac-hand-table/dist/index.css';

const data = [
  {
    id: 1,
    name: '张三',
    gender: '1',
    date: '2018-07-02',
    money: 10000,
    custom: '自定义',
  },
  {
    id: 2,
    name: '李四',
    gender: 0,
    date: '2018-07-02 09:01:01',
    money: 10000,
    custom: '自定义',
  },
  {
    id: 3,
    name: '王五',
    gender: null,
    date: '2018-07-02',
    money: 10000,
    custom: '自定义',
  },
  {
    id: 3,
    name: '王五',
    gender: null,
    date: '2018-07-02',
    money: 10000,
    custom: '自定义',
  },
  {
    id: 4,
    name: '王五',
    gender: null,
    date: '2018-07-02',
    money: 10000,
    custom: '自定义',
  },
];

const btn_style = {
  'marginBottom': '10px'
};


class Demo2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handData: data,
      changeRowNum: 0,
    };
  }

  columns = [
    {
      data: 'name',
      type: 'text',
      validator: (value, callback) => {
        console.log('valuevalue', !!value);
        callback(true);
      },
      allowInvalid: true,
      strict: true,
      // todo 被弃用
      // onChangeCell: (rowData, rowNum) => { // 单元格改变回调
      //   console.log('rowData, rowNum', rowData, rowNum);
      //   this.setState({ changeRowNum: rowNum });
      // },
      onClick: (rowData, rowNum, value) => {
        console.log('rowData, rowNum, value', rowData, rowNum, value);
      },
      dblClick: (rowData, rowNum, value) => {
        console.log('dblClick,rowData, rowNum, value', rowData, rowNum, value);
      },
      onChange: (rowData, rowNum, rowNumList, rowDataList) => { // 单元格改变回调
        console.log('rowData, rowNum,rowNumList, rowDataList', rowData, rowNum, rowNumList, rowDataList);
        // this.setState({ changeRowNum: rowNum });
      },

    },
    {
      data: 'gender',
      type: 'select', // 表格类型
      source: [
        {
          value: '请选择',
          key: '',
        },
        {
          value: '男',
          key: '1',
        },
        {
          value: '女',
          key: 0,
        },
      ],
    },
    {
      data: 'date',
      type: 'date',
      dateFormat: 'YYYY-MM-DD', // 日期格式
      correctFormat: false, //  当前值是否格式化
      defaultDate: '1900-01-01', // 默认值
      allowInvalid: true, // 不容许日期为空
    },
    {
      data: 'money',
      type: 'numeric', // 资薪
      allowInvalid: false,
      numericFormat: {
        // pattern: '0,0.00',
        // culture:'ja-JP',
        pattern: '0,0.00 $',
        culture: 'de-DE' // use this for EUR (German),
        // pattern: '$0,0.00',
        // culture: 'en-US' // this is the default culture, set up for USD
      },
    },
    // {
    //   data: 'custom1',
    //   renderer: (instance, td, row, col, prop, value, cellProperties) => {
    //     // 插入内容
    //     td.innerHTML = '自定义';
    //     return td;
    //   },
    //   dblClick: (rowData, rowNum, value) => {
    //     console.log('dblClick,rowData, rowNum, value', rowData, rowNum, value);
    //   },
    //   // readOnly: true,
    // },

  ];

  // 设置行样式
  setStyle = (rowIndex, colIndex, prop, value, rowData) => {
    let style = { 'background-color': '#fff' };
    if (rowIndex % 2 === 0) {
      style = { 'background-color': '#3fc8c1' };
    }
    return style;
  };

  // 表格添加行
  onInsertRowData = () => {
    const rowDefaultData = {
      id: 99,
      name: '张三 insert',
      // gender: '1',
      gender: 0,
      date: '2018-07-02',
      money: 10000,
      custom: '自定义',
    };
    // this.child.onInsertRowData() // 默认从第一行添加
    this.child.onInsertRowData(-1, rowDefaultData);
  };

  // 更新行
  onUpdateRowData = () => {
    const rowDefaultData = {
      id: 99,
      name: '张三 update',
      gender: 0,
      date: '2018-07-02',
      money: 10000,
      custom: '自定义',
    };
    this.child.onUpdateRowData(0, rowDefaultData);
  };


  // 删除多选选中的行
  onDelRowCheck = () => {
    this.child.onDelRowCheck();
  };

  // 获取验证通过后数据
  getData = () => {
    this.child.getData((data) => {
      console.log('data', data);
    });
  };

  // 获取多选选中的数据
  getCheckData = () => {
    const checkboxData = this.child.getCheckbox();
    console.log('checkboxData', checkboxData);
  };

  // 获取被修改后的数据
  getUpdateData = () => {
    const updateData = this.child.getUpdateData();
    console.log('updateData', updateData);
  };

  // 获取被格式化的数据
  getFormatData = () => {
    const formatData = this.child.getFormatData();
    console.log('formatData', formatData);
  };

  // 获取新增加的数据
  getAddRowData = () => {
    const addRowDate = this.child.getAddRowData();
    console.log('addRowDate', addRowDate);
  };

  // 获取删除的数据
  getDelRowData = () => {
    const delRowData = this.child.getDelRowData();
    console.log('delRowData', delRowData);
  };

  // 获取行选中数据
  getSelectData = () => {
    const selectData = this.child.getSelectData();
    console.log('selectData', selectData);
  };

  // 删除行选中
  onDelRowSelect = () => {
    const onDelRowSelect = this.child.onDelRowSelect();
    console.log('onDelRowSelect', onDelRowSelect);
  };

  // 删除行
  onDelRowNum = () => {
    this.child.onDelRowNum([0, 1]);
  };


  // 导出csv
  onDownCsv = () => {
    this.child.onExportCSV();
  };


  render() {
    const { handData, changeRowNum } = this.state;

    return (
      <div className="demoPadding">

        <div style={{ marginBottom: '15px' }}>
          <Button colors="primary" style={btn_style} onClick={this.onInsertRowData}
                  size="sm"> 增行 </Button>
          <Button colors="primary" style={btn_style} onClick={this.onUpdateRowData}
                  size="sm">修改行</Button>
          <Button colors="danger" style={btn_style} onClick={this.onDelRowCheck}
                  size="sm">删除选中行</Button>
          <Button colors="primary" style={btn_style} onClick={this.getData}
                  size="sm"> 获取验证数据</Button>
          <Button colors="primary" style={btn_style} onClick={this.getCheckData}
                  size="sm"> 获取选中行 </Button>
          <Button colors="primary" style={btn_style} onClick={this.getUpdateData}
                  size="sm">获取修改行 </Button>
          <Button colors="primary" style={btn_style} onClick={this.getAddRowData}
                  size="sm">获取新增加行</Button>
          <Button colors="primary" style={btn_style} onClick={this.getDelRowData}
                  size="sm">获取删除行</Button>
          <Button colors="primary" style={btn_style} onClick={this.getFormatData}
                  size="sm">格式化数据 </Button>
          <Button colors="primary" style={btn_style} onClick={this.onDownCsv}
                  size="sm">导出csv </Button>
          <Button colors="primary" style={btn_style} onClick={this.getSelectData}
                  size="sm">逐行选中数据</Button>
          <Button colors="primary" style={btn_style} onClick={this.onDelRowSelect}
                  size="sm">删除选中行数据</Button>
          <Button colors="primary" style={btn_style} onClick={this.onDelRowNum}
                  size="sm">删除指定行</Button>
        </div>


        <AcHandTable
          id="example2" // 组件id
          onRef={(ref) => { // 设置ref属性 调用子组件方法
            this.child = ref;
          }}
          colHeaders={['姓名', '性别', '日期', '资薪', '自定义', '钉耙日期']} // 表格表头
          data={handData} // 表体数据
          columns={this.columns} // 列属性设置
          // 设置行样式
          rowStyle={this.setStyle}
          rowKey="id" // 数组对象中唯一id 默认值为'id'
          colWidths={100}
          csvConfig={{
            filename: '导出',
            rowHeaders: true,
          }}

          afterSelection={(startRow, startCol, endRow, endCol, selectRowNum) => {
            console.log('startRow, startCol, endRow, endCol', startRow, startCol, endRow, endCol, selectRowNum);
          }}

          // mergeCells // 右键菜单是否开启单元格合并
          // multiSelect={false} // 关闭多选框
          width="100%"
          height="auto"
        />


      </div>
    );
  }
}

export default Demo2;
