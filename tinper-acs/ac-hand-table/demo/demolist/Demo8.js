/**
 *
 * @title 甘特图
 * @description 甘特图
 *
 */

import React, { Component } from 'react';
import { Button } from 'tinper-bee';
// 引入 AcHandTable 组件

// demo 工程中引入方式
import AcHandTable from '../../src/index';
import moment from 'moment';

const mockData = [
  {
    id: '1',
    title: '工程拆分',
    planStartDate: '2019-01-01',
    planEndDate: '2019-01-14',
    actualStarDate: '2019-01-05',
    actualEndDate: '2019-01-15',
  },
  {
    id: '2',
    title: '工程拆分',
    planStartDate: '2019-01-14',
    planEndDate: '2019-02-10',
    actualStarDate: '2019-01-15',
    actualEndDate: '2019-02-15',
  },
  {
    id: '3',
    title: '工程拆分',
    planStartDate: '2019-02-01',
    planEndDate: '2019-02-08',
    actualStarDate: '2019-02-02',
    actualEndDate: '2019-02-9',
  },
  {
    id: '4',
    title: '工程拆分',
    planStartDate: '2019-02-10',
    planEndDate: '2019-02-16',
    actualStarDate: '2019-02-10',
    actualEndDate: '2019-02-16',
  }
];


class Demo8 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      handData: mockData,
    };
  }


  // 获取第一个表头，也就是月份
  getNestedHeaders = () => {
    const { startDate } = this.getStartEndDate();
    const dayNum = this.getDayNum();

    let monthTemp = {};   // 月份
    let dayTemp = []; // 日期数组

    for (let i = 0; i < dayNum; i++) {
      // 构造月份对象
      const yyMM = moment(startDate)
        .add(i, 'd')
        .format('YYYY-MM');
      monthTemp[yyMM] = monthTemp[yyMM] ? monthTemp[yyMM] + 1 : 1;
      // 周几计算
      const day = moment(startDate)
        .add(i, 'd')
        .format('DD');
      dayTemp.push(day);

    }

    // 构造月份表头
    const monthNestTemp = [];
    for (const key in monthTemp) {
      monthNestTemp.push({
        label: key,
        colspan: monthTemp[key],
      });
    }
    // 构造周几表头
    const dayNestTemp = [];
    for (const item of dayTemp) {
      dayNestTemp.push({
        label: item,
        colspan: 1,
      });

    }
    return [monthNestTemp, dayNestTemp];
  };


  // 获取col
  getColumns = () => {
    const { startDate } = this.getStartEndDate();
    const dayNum = this.getDayNum();
    let columnsGantta = [];
    for (let i = 0; i < dayNum; i++) {
      const date = moment(startDate)
        .add(i, 'd')
        .format('YYYY-MM-DD');

      const col = {
        data: date,
        readOnly: true,
        renderer: (instance, td, row, col, prop, value) => { // 自定义列显示值
          // 是否出现计划时间条
          if (Array.isArray(value)) {
            const planDivString = value[0] ? '<div style="height: 10px;background-color:red;"></div>' : '';
            // 是否出现实际时间条
            let actualDivString = '';
            if (value[0]) {
              // 实际时间在计划时间内
              actualDivString = value[1] ? '<div style="height: 10px;background-color:green;"></div>' : '';
            } else {
              // 实际时间超出计划时间
              actualDivString = value[1] ? '<div style="height: 10px;"></div><div style="height: 10px;background-color:green;"></div>' : '';
            }
            td.innerHTML = planDivString + actualDivString;
            td.style = 'padding:0px';
          }
          return td;
        },
      };
      columnsGantta.push(col);
    }
    return columnsGantta;
  };


  // 获取 colHeaders
  getColHeaders = () => {
    const { startDate } = this.getStartEndDate();
    const dayNum = this.getDayNum();
    let colHeaders = [];
    for (let i = 0; i < dayNum; i++) {
      const week = moment(startDate)
        .add(i, 'd')
        .format('dddd')
        .substr(2, 1);
      colHeaders.push(week);
    }
    return colHeaders;
  };


  // 获取两个日期直接的天数
  getDayNum = () => {
    const { startDate, endDate, } = this.getStartEndDate();
    return moment(endDate)
      .diff(moment(startDate), 'days') + 1;
  };


  // 计算甘特图数据
  getGanttaData = () => {

    const { handData } = this.state;
    const { startDate, } = this.getStartEndDate();
    const dayNum = this.getDayNum();

    let ganttaArray = []; // 甘特图数组

    // 构造甘特图数据
    for (const ele of handData) {

      const { planStartDate, planEndDate, actualStarDate, actualEndDate } = ele;

      let ganttaItem = {}; // 工程数字
      for (let i = 0; i < dayNum; i++) {
        const date = moment(startDate)
          .add(i, 'd')
          .format('YYYY-MM-DD');

        // 当前日期是否在计划时间内
        const planStatus = moment(date)
          .isBetween(planStartDate, planEndDate, 'days', '[]');
        // 当前日期是否在实际时间内
        const actualStatus = moment(date)
          .isBetween(actualStarDate, actualEndDate, 'days', '[]');
        ganttaItem[date] = [planStatus, actualStatus];

      }
      ganttaArray.push(ganttaItem);
    }
    return ganttaArray;
  };


  // 动态计算日期改变事件
  onChangeDate = (rowNumList, newValueList, key) => {
    const rowNum = rowNumList[0];
    const newValue = newValueList[0];
    const { handData } = this.state;
    handData[rowNum][key] = newValue;

    // 获取表头1，2
    let nestedHeaders = this.getNestedHeaders();
    let temp = [];
    for (const item of this.getColHeaders()) {
      temp.push({
        label: item,
        colspan: 1,
      });
    }
    // 添加表头3
    nestedHeaders.push(temp);

    //  更新甘特图设置
    this.childGantta.updateSettings({
      data: this.getGanttaData(),
      columns: this.getColumns(),
      width: this.getDayNum() * 20 + 50,
      nestedHeaders,
    });

    this.setState({ handData });

  };

  // 计算开始日期和结束日期

  getStartEndDate = () => {
    const { handData } = this.state;
    const dateArray = [];
    // 获取所有日期
    for (const item of  handData) {
      const { planStartDate, planEndDate, actualStarDate, actualEndDate } = item;
      dateArray.push(planStartDate, planEndDate, actualStarDate, actualEndDate);
    }

    // 去重
    let set = new Set(dateArray);
    const dateClearArray = Array.from(set);
    // 获取最小日期
    const startDate = moment.min(dateClearArray.map(a => moment(a)))
      .format('YYYY-MM-DD');

    // 获取最大日期
    const endDate = moment.max(dateClearArray.map(a => moment(a)))
      .format('YYYY-MM-DD');
    return {
      startDate,
      endDate
    };
  };


  column = [
    {
      data: 'title',
      type: 'text',
      textTooltip: true,
    },
    {
      type: 'date',
      data: 'planStartDate',
      dateFormat: 'YYYY-MM-DD',
      correctFormat: true,
      onChange: (rowNumList, rowDataList, newValueList) => {
        this.onChangeDate(rowNumList, newValueList, 'planStartDate');
      }

    },
    {
      type: 'date',
      data: 'planEndDate',
      dateFormat: 'YYYY-MM-DD',
      correctFormat: true,
      onChange: (rowNumList, rowDataList, newValueList) => {
        this.onChangeDate(rowNumList, newValueList, 'planEndDate');
      }
    },
    {
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
      data: 'actualStarDate',
      correctFormat: true,
      onChange: (rowNumList, rowDataList, newValueList) => {
        this.onChangeDate(rowNumList, newValueList, 'actualStarDate');
      }
    },
    {
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
      data: 'actualEndDate',
      correctFormat: true,
      onChange: (rowNumList, rowDataList, newValueList) => {
        this.onChangeDate(rowNumList, newValueList, 'actualEndDate');
      }
    },
  ];


  // 表格添加行
  onInsertRowData = () => {
    const rowDefaultData =
      {
        id: '4',
        title: '工程拆分',
        planStartDate: '2019-01-01',
        planEndDate: '2019-01-14',
        actualStarDate: '2019-01-05',
        actualEndDate: '2019-01-15',
      };
    // this.child.onInsertRowData(); // 默认从第一行添加
    const { handData } = this.state;
    handData.push(rowDefaultData);
    this.setState({ handData, });
    // 强制更新数据
    this.mainTable.updateSettings({
      data: handData,
    });
  };


  // 删除选中
  onDelRowSelect = () => {
    // const { rowList, indexList } =

    this.mainTable.onDelRowSelect();
    // 强制更新
    let { handData } = this.state;
    this.setState({ handData });

  };

  // 获取验证数据
  getData = () => {
    this.mainTable.getData((data) => {
      console.log('data', data);
    });
  };


  render() {

    const { handData } = this.state;

    return (
      <div className="demoPadding">

        <div style={{ marginBottom: '15px' }}>
          <Button colors="primary" className='btn-style' onClick={this.onInsertRowData}
                  size="sm"> 增行 </Button>
          <Button colors="primary" className='btn-style' onClick={this.onDelRowSelect}
                  size="sm">删除</Button>
          <Button colors="primary" className='btn-style' onClick={this.getData}
                  size="sm">格式化数据 </Button>

        </div>


        <div className={'gantta-content'}>
          <AcHandTable
            id="example8" // 组件id
            onRef={(ref) => this.mainTable = ref} // 设置ref属性 调用子组件方法
            data={handData} // 表体数据
            columns={this.column} // 列属性设置
            colWidths={100}
            colHeaders={['工程拆分', '计划开始时间', '计划结束时间', '实际开始时间', '实际结束时间']} // 表格表头
            manualRowMove // 行移动
            fillHandle={{
              autoInsertRow: false,
              direction: 'vertical',
            }}
            width="548px"
            height="auto"
            multiSelect={false}
            stretchH={'none'}
            dropdownMenu={false}
            multiColumnSorting={false} // 去掉排序
            columnHeaderHeight={77} //表头高
            afterRowMove={(rows, target, newArray) => { //行移动事件
              this.setState({ handData: newArray });
            }}
            afterSelection={(startRow, startCol, endRow, endCol) => { //行移动事件
              console.log('startRow, startCol, endRow, endCol', startRow, startCol, endRow, endCol);
            }}

          />

          {handData &&
          <AcHandTable
            id="columnsGantta" // 组件id
            onRef={ref => this.childGantta = ref} // 设置ref属性 调用子组件方法

            colHeaders={this.getColHeaders()} // 表格表头
            data={this.getGanttaData()} // 表体数据
            columns={this.getColumns()} // 列属性设置
            colWidths={25}
            manualRowMove // 行移动
            fillHandle={{
              autoInsertRow: false, // 去掉自动加行
              direction: 'vertical',
            }}
            width={'800px'}
            // width={this.getDayNum() * 25}
            height="auto"
            headerTooltips
            nestedHeaders={this.getNestedHeaders()} // 设置多表头
            contextMenu={false}  // 去掉菜单
            dropdownMenu={false} // 去掉下拉
            multiSelect={false}  // 去掉多选
            multiColumnSorting={false} // 去掉排序
            manualColumnResize={false} // 去掉 Resize
            stretchH={'none'} // 最后一行禁止拉伸
          />
          }
        </div>

      </div>

    );
  }
}

export default Demo8;
