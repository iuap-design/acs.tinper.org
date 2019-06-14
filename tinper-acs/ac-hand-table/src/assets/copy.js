/**
 *
 * @title AcHandTable
 * @description 表格支持多选，数据格式化，行样式
 *
 */

import React, { Component } from 'react';
import AcHandTable from '../../src/index';
import Handsontable from 'handsontable';

class Demo1 extends Component {
  data = [
    {
      id: 1,
      year: '',
      name: {
        firstName: '张',
        lastName: '小贝'
      },
      color: 'yellow',
      num: 19,
      price: 500000,
      date: '2018-07-02',
      handsontable: 'xxxx',

    },
    {
      id: 2,
      year: 2018,
      name: {
        firstName: '李',
        lastName: '小贝'
      },
      color: 'green',
      num: 10,
      price: 500000,
      date: '2018-07-02',
      handsontable: 'handsontable',

    },
    {
      id: 3,
      year: 2017,
      name: {
        firstName: '王',
        lastName: '小维'
      },
      color: 'black',
      num: 20,
      price: 500000,
      date: '2018-07-02',
      handsontable: 'handsontable',

    },
    {
      id: 4,
      year: 2016,
      name: {
        firstName: '孙',
        lastName: '大熊'
      },
      color: 'purple',
      num: 8,
      price: 500000,
      date: '2018-07-02',
      handsontable: 'handsontable',
    },
  ];


  manufacturerData = [
    {
      name: 'BMW',
      country: 'Germany',
      owner: 'Bayerische Motoren Werke AG'
    },
    {
      name: 'Chrysler',
      country: 'USA',
      owner: 'Chrysler Group LLC'
    },
    {
      name: 'Nissan',
      country: 'Japan',
      owner: 'Nissan Motor Company Ltd'
    },
    {
      name: 'Suzuki',
      country: 'Japan',
      owner: 'Suzuki Motor Corporation'
    },
    {
      name: 'Toyota',
      country: 'Japan',
      owner: 'Toyota Motor Corporation'
    },
    {
      name: 'Volvo',
      country: 'Sweden',
      owner: 'Zhejiang Geely Holding Group'
    },
  ];

  config = {
    data: this.data,
    colHeaders: ['年份', '姓', '名', '颜色', '价格', '数量', '日期', 'handsontable', '自定义'],
    language: 'zh-CN',
    currentRowClassName: 'currentRow',
    allowInsertRow: false,
    activeHeaderClassName: 'currentRow',
    // 行样式
    rowStyle(row) {
      if (row % 2 === 0) {
        return { backgroundColor: '#CEC' };
      }
    },
    columns: [
      {
        data: 'year',
        type: 'dropdown', // 下拉菜单
        source: [2019, 2018, 2017, 2016, 2015, 2014],
        strict: false,
        placeholder: 'Empty Cell',
        tableClassName: 'currentRow',
      },
      {
        data: 'name.firstName',
        type: 'text', // 表格类型
        readOnly: true, // 只读
        editor: false, // 不可编辑
        strict: false,
      },

      {
        data: 'name.lastName',
        type: 'text', // 表格类型
        strict: false,
      },
      {
        data: 'color',
        type: 'autocomplete',
        source: function (query, process) {
          process(['yellow', 'red', 'green', 'blue', 'gray', 'black', 'white', 'purple', 'lime', 'olive', 'cyan']);
        },
      },
      {
        type: 'numeric',
        data: 'price',
        numericFormat: { // 价格格式
          pattern: '$ 0,0.00',
          culture: 'en-US',
        },
      },
      {
        data: 'num',
        type: 'numeric', // 数字类型
      },
      {
        data: 'date',
        type: 'date',
        dateFormat: 'YYYY-MM-DD', // 日期格式
        correctFormat: true, //  当前值是否格式化
        defaultDate: '1900-01-01', // 默认值
      },
      {
        type: 'handsontable',
        data: 'handsontable',
        handsontable: {
          colHeaders: ['Marque', 'Country', 'Parent company'],
          autoColumnSize: true,
          data: this.manufacturerData,
          getValue() {
            const selection = this.getSelectedLast();
            // Get always manufacture name of clicked row
            return this.getSourceDataAtRow(selection[0]).name;
          },
        },
      },
    ],


    // 使用自定义列头
    rowHeaders: true, // false/数组 //当值为true时显示行头，当值为数组时，行头为数组的值
    // filters: true, // 表头过滤
    manualColumnResize: true, // 表格表头是否可以拖动 false时禁止拖动
    manualRowResize: true, // 当值为true时，允许拖动，当为false时禁止拖动
    manualColumnMove: true, // false 当值为true时，列可拖拽移动到指定列
    manualRowMove: true, // false 当值为true时，行可拖拽至指定行
    // dropdownMenu: ['filter_by_condition', 'filter_action_bar'],
    // multiColumnSorting: true, // 表头排序，升或降序
    dropdownMenu: true, // https://handsontable.com/docs/7.0.2/demo-dropdown-menu.html
    multiColumnSorting: { // 开启多排序
      indicator: false,
      headerAction: false,
    },
  };

  // 表头固定，隐藏 https://handsontable.com/docs/7.0.2/frameworks-wrapper-for-react-simple-examples.html
  // 多表头 https://handsontable.com/docs/7.0.2/demo-nested-headers.html
  // 多表头隐藏 https://handsontable.com/docs/7.0.2/demo-collapsing-columns.html
  // 固定row https://handsontable.com/docs/7.0.2/demo-fixing-bottom.html
  // 固定例 https://handsontable.com/docs/7.0.2/demo-freezing.html
  // 多余宽自适应 https://handsontable.com/docs/7.0.2/demo-stretching.html
  // 表格宽自适应内容  https://handsontable.com/docs/7.0.2/demo-header-tooltips.html
  // 自定义宽和高  https://handsontable.com/docs/7.0.2/demo-resizing.html
  // fix 宽和高  https://handsontable.com/docs/7.0.2/demo-fixing.html
  // 自定义表格内容，表头排序, https://handsontable.com/docs/7.0.2/demo-sorting.html
  // 表头过滤 https://handsontable.com/docs/7.0.2/demo-filtering.html
  // 表格验证 https://handsontable.com/docs/7.0.2/demo-data-validation.html
  // 合并单元格 https://handsontable.com/docs/7.0.2/demo-merged-cells.html
  // 自定义表头 https://handsontable.com/docs/7.0.2/demo-custom-renderers.html
  // 行过滤  https://handsontable.com/docs/7.0.2/demo-filtering.html
  // 字体颜色 https://handsontable.com/docs/7.0.2/demo-conditional-formatting.html
  // 修改source https://handsontable.com/docs/7.0.2/Core.html#setDataAtRowProp
  // 多表头排序 https://handsontable.com/docs/7.0.2/demo-multicolumn-sorting.html?_ga=2.191899690.1268697177.1556262588-926607838.1555489392
  // dropmenu contextMenu https://handsontable.com/docs/7.0.2/demo-context-menu.html

  getData = () => {
    const updateData = this.child.getData();
    console.log('updateData', updateData);
  };


  getCheckboxData = () => {
    const data = this.child.getCheckbox();
    console.log('data', data);

  };


  render() {
    return (
      <div className="demoPadding">
        <button onClick={this.getData}>数据</button>
        <button onClick={this.getCheckboxData}>多选框</button>
        <AcHandTable
          {...this.config}
          id="example"
          // 设置ref属性
          onRef={(ref) => {
            this.child = ref;
          }}
          // 多选框选中
          multiSelect
        />
      </div>
    );
  }
}

export default Demo1;
