/**
 *
 * @title excel 解析
 * @description excel 本地解析成json，没有必要上传excel 文件, 表格禁用编辑切换
 *
 */

import React, { Component } from 'react';
import { Button } from 'tinper-bee';
import AcExcelReader from 'ac-excel-reader';


// 引入 AcHandTable 组件

// demo 工程中引入方式
import AcHandTable from '../../src/index';


// 项目中引入方式
// import AcHandTable from 'ac-hand-table';
// import 'ac-hand-table/dist/index.css';

const data = [
  {
    id: 1,
    name: '张小贝',
    level: 19,
    gender: '1',
    time: '09:20:30',
  },
  {
    id: 2,
    name: '张小贝',
    level: 10,
    gender: '1',
    time: '09:20:30',
  },
  {
    id: 3,
    name: '张小贝',
    level: 20,
    gender: '0',
    time: '09:20:30',
  },
  {
    id: 4,
    name: '张小贝',
    level: 20,
    gender: '0',
    time: '09:20:30',
  },
];


class Demo5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handData: data,
    };
  }

  componentDidMount() {

    // this.child.updateSettings({
    //   cells: this.setCell,
    // });

  }


  columns = [
    {
      data: 'name',
      textTooltip: true,
    }, // 对象文本类型
    {
      data: 'level',
      type: 'numeric', // 数字类型
    },
    {
      data: 'gender',
      type: 'select', // 选择类型
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
          key: '0',
        },
      ],
      dropdownMenu: true,
      // onChange: () => {
      //   this.child.updateSettings({
      //     cells: this.setCell,
      //   });
      // }
    },
    {
      data: 'time',
      type: 'time', // 日期类型
      timeFormat: 'hh:mm:ss',
      // defaultData: 00:00:00', // 默认值
      correctFormat: true,
      validator: (value, callback) => {
        callback(true);
      },
    },
  ];


  onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  // 导出csv
  onExportHeader = () => {
    this.child.onExportHeader();
  };

  // 将excel 转换成json
  getExcel2Json = (data) => {
    console.log('data', data);
    this.setState({ handData: data });
  };

  // 将excel 转换成Array
  getExcel2Array = (data) => {
    console.log('data', data);
  };

  // 获取多选选中的数据
  getCheckData = () => {
    const checkboxData = this.child.getCheckbox();
    console.log('checkboxData', checkboxData);
  };

  // 获取被格式化的数据
  getFormatData = () => {
    const formatData = this.child.getFormatData();
    console.log('formatData', formatData);
  };


  setCell = (row, column) => {
    const data = this.child.getSourceData();
    const { gender } = data[row];
    const cellProperties = {};
    // 设置满足条件
    if (gender === '男' && column === 1) {
      cellProperties.editor = false;
      cellProperties.readOnly = true;
      cellProperties.className = 'headClass';
    }
    return cellProperties;
  };


  render() {
    const { handData } = this.state;
    // excel 列名hash 对照
    const colKeyHash = {
      name: '姓名',
      level: '等级',
      gender: '性别',
      time: '时间',
    };

    return (
      <div className="demoPadding">

        <div style={{ marginBottom: '15px' }}>
          <AcExcelReader
            getJson={this.getExcel2Json}
            getArray={this.getExcel2Array}
            colKeyHash={colKeyHash}
          >
            <Button colors="primary" size="sm">上传excel </Button>
          </AcExcelReader>

          <Button colors="primary" onClick={this.getFormatData} size="sm">格式化数据 </Button>
          <Button colors="primary" onClick={this.getCheckData} size="sm"> 获取选中行 </Button>
          <Button colors="primary" onClick={this.onExportHeader} size="sm">导出模板 </Button>

        </div>


        <AcHandTable
          id="example5" // 组件id
          onRef={ref => this.child = ref} // 设置ref属性 调用子组件方法
          colHeaders={['姓名', '等级', '性别', '时间']} // 表格表头
          data={handData} // 表体数据
          columns={this.columns} // 列属性设置
          colWidths={[50, 100, 100, 120, null]}
          columnHeaderHeight={30}
          manualRowMove // 行移动
          fillHandle={{
            autoInsertRow: false,
            direction: 'vertical',
          }}
          csvConfig={{
            filename: '导出',
            columnHeaders: true,
          }}

          width="100%"
          height="auto"
          readOnlyCellClassName='is-readOnly'

        />

      </div>

    );
  }
}

export default Demo5;
