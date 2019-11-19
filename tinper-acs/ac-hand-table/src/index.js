/* eslint-disable import/first,prefer-const,no-shadow,guard-for-in,no-param-reassign,no-restricted-syntax,prefer-rest-params,no-return-assign,react/prop-types,valid-typeof,quotes,react/destructuring-assignment,padded-blocks,react/no-unused-state,prefer-template,no-underscore-dangle,object-curly-newline,no-unused-vars,prefer-destructuring,operator-linebreak */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import Handsontable from 'handsontable';

import RefMultipleTable from './RefMultipleTable.js'; // 表格参照
import RefTreeWithInput from './RefTreeWithInput.js'; // 树参照
import RefTreeTableWithInput from './RefTreeTableWithInput.js'; // 树表参照
import RefTreeTransferWithInput from './RefTreeTransferWithInput.js'; // 树穿梭参照

import {
  getCheckboxActive,
  getCheckDelArray,
  getDelRows,
  getUpdateActive,
  getAddRowActive,
  changeSelectValue2Key,
  customRenderData,
  getArrayObjByKey,
  array2Obj,
  arrayFindObj,
  colFindSelectValue, // 插入select 类型，将key 转换成value
  getBetweenNum, // 生成指定区间整数
  arrayObjctClone, // 数组深度copy
  compareObj,
} from './utils';

import 'handsontable/languages/zh-CN';
import 'handsontable/languages/en-US';
import 'handsontable/languages/zh-TW';
import 'handsontable/dist/handsontable.full.css';
import './index.less';

class AcHandTable extends React.Component {

  state = {

    data: this.props.data,
    delDataList: [], // 删除数据
    refConfig: {}, // 参照配置
    refOnChange: null, // 缓存参照选中数据的回调方法
    autoCache: null, // 缓存自动下拉框值
    rowDataCache: null, // 缓存选中行 checkbox
    currentRow: 0, // 选中当前行
    currentCol: 0, // 选中当前例
    currentKey: '', // 选中当前key
    currentValue: '', // 选中当前value
    currentRefType: '', // 获取当前参照类型

    selectRowDataNum: [], // 选中行数据下标 select
    eventCode: '', // 当前事件code

  };


  hot = null;
  cacheData = null;

  componentDidMount() {
    const { id } = this.props;
    // 在父组件上绑定子组件方法
    if (this.props.onRef) {
      this.props.onRef(this);
    }

    this.init();

    // 点击空白出 清空选中的行
    window.addEventListener('click', e => {
      const { selectRowDataNum } = this.state;
      // 防止最后一行选中
      const select = this.hot.getSelected();
      if (selectRowDataNum.length > 0 && !Array.isArray(select)) {
        this.setState({ selectRowDataNum: [] });
      }
    });

    // 模态框弹出 选中行不清空bug
    const modalEle = document.getElementById(id);
    if (modalEle) {
      modalEle.addEventListener('click', e => {
        if (e.target.className && e.target.className === 'wtHolder') {
          this.setState({ selectRowDataNum: [] });
        }
        e.stopPropagation();
      });
    }
  }


  componentWillReceiveProps(nextProps) {

    const { columns } = nextProps;// 表体数据
    // 处理下拉值 将[{key:'',value:''}] 转换成 [""], dealSelectData
    if (nextProps.data !== this.props.data) {
      let { data } = customRenderData(nextProps.data, columns, this.coverRenderer);
      this.setState({ data });
      // 缓存 data 排序用
      this.cacheData = data;
      // 更新数据
      this.hot.loadData(data);

    }

  }


  // 更新设置
  updateSettings = (param) => {
    this.hot.updateSettings({
      ...param,
    });
  };

  // 重新刷新
  onRender = () => {
    this.hot.render();
  };


  setCellMeta = (row, col, key, val) => {
    this.hot.setCellMeta(row, col, key, val);
  };

  getSourceData = () => {
    return this.hot.getSourceData();
  };

  getDataAtCell = (row, column) => {
    return this.hot.getDataAtCell(row, column);
  };


  init = () => {

    // 对 this.props 处理，添加默认值、checkbox等
    const _this = this;
    const tempObj = this.dealData();
    let { id, colHeaders, nestedHeaders } = tempObj;

    // 将 信息交有 handsontable 组件处理
    const container = document.getElementById(id);
    this.onHandsonTable(container, tempObj);


    // 添加 mousedown
    Handsontable.dom.addEvent(container, 'mousedown', (event) => {
      if (event.target.nodeName === 'INPUT' && event.target.className === 'multiSelectChecker') {
        event.stopPropagation();
      }
    });

    // 添加 mouseup 全选
    Handsontable.dom.addEvent(container, 'mouseup', (event) => {
      // 多选操作
      if (event.target.nodeName === 'INPUT' && event.target.className === 'multiSelectChecker') {
        let checked = !event.target.checked;
        event.target.checked = checked;
        event.stopPropagation();
        if (checked) {
          colHeaders[0] = `<input type='checkbox' class='multiSelectChecker' checked />`;
          this.state.data.map(item => item.checkbox_status = true);
        } else {
          colHeaders[0] = `<input type='checkbox' class='multiSelectChecker' />`;
          this.state.data.map(item => item.checkbox_status = false);
        }
        // 更新多表头设置
        if (nestedHeaders) {
          nestedHeaders[nestedHeaders.length - 1] = colHeaders;
          this.hot.updateSettings({ nestedHeaders });
        }

        this.hot.render();
      }
    });


    // 添加双击 dblclick
    Handsontable.dom.addEvent(container, 'dblclick', (event) => {

      const { rowDataCache, currentRow, currentValue, currentCol } = _this.state;
      const { columns } = _this.props;

      if (columns[currentCol]) {
        const { dblClick } = columns[currentCol];
        const td = event.target;
        // 判断是否有双击方法
        if (dblClick) {
          dblClick(rowDataCache, currentRow, currentValue, td, event);
        }
      }
    });


  };


  // 初始化tabel
  onHandsonTable = (container, data) => {
    const _this = this;
    this.hot = new Handsontable(container, {
      ...data,


      afterChange(changes, source) { // 表格被修改后执行


        if (source === 'edit' || source === 'CopyPaste.paste' || source === 'Autofill.fill') { // 表格被修改
          const [rowNum, name, oldValue, newValue] = changes[0];

          const { data } = _this.state;
          const { columns } = _this.props;


          // 是否有回调
          let { onChangeCell, onChange, type, refSource, cacheAutoData, refConfig, refOnChange, data: currentKey } = getArrayObjByKey(columns, name);

          // 添加修改标记
          if (oldValue !== newValue) {
            data[rowNum].update_status = true;
          }

          // 判断类型
          if (type === 'numeric' && typeof (newValue) !== 'number') {
            data[rowNum][name] = null;
          }

          // 下拉自动补全改变值
          if (type === 'autocomplete' && refSource && source !== 'Autofill.fill') {

            let { columnsKey = [], rowKey, refValue } = refConfig;
            if (!refValue && columnsKey.length > 0) { // 获取显示值
              refValue = columnsKey[0];
            }


            const currentAutoRow = arrayFindObj(cacheAutoData, refValue, newValue) || {};
            data[rowNum][currentKey] = newValue;
            if (rowKey) { // 自定义列名
              for (let i = 1; i < rowKey.length; i++) {
                const key = columnsKey[i];
                data[rowNum][rowKey[i]] = currentAutoRow[key];
              }
            }
            // 下拉回调change
            if (refOnChange) {
              refOnChange(currentAutoRow, data[rowNum], rowNum);
            }
          }


          // todo 方法将被弃用
          if (onChangeCell) {
            const rowData = { ...data[rowNum] };
            onChangeCell(rowData, rowNum, newValue, oldValue);
          }
          // 表格内容改变回调
          if (onChange) {
            // 获取行列表
            let newValueList = []; // 新值
            let oldValueList = []; // 旧值
            let rowNumList = []; // 行号
            for (const item of changes) {
              rowNumList.push(item[0]);
              oldValueList.push(item[2]);
              newValueList.push(item[3]);
            }

            // 获取行数据
            const rowDataList = rowNumList.map(item => data[item]);
            onChange(rowNumList, rowDataList, newValueList, oldValueList);
          }

          // 是否自定义 col 显示值
          for (const columnItem of columns) {
            const { customValue, data: colName } = columnItem;
            if (customValue) {
              data[rowNum][colName] = customValue(data[rowNum]);
              _this.onUpdateRowData(rowNum, data[rowNum]);
            }
          }
          _this.setState({ data }); // 更新state

        }
      },

      afterOnCellMouseDown(event, coords, td) {
        const { row, col } = coords;
        const { data } = _this.state;
        const { columns } = _this.props;
        const { onClick, data: columnKey } = columns[col] || {};

        if (data[row]) {
          _this.setState({
            rowDataCache: data[row], // 缓存行选中数据
            currentRow: row, // 选中当前行
            currentCol: col, // 选中当前例
            currentValue: data[row][columnKey], // 当前值
            currentKey: [columnKey], // 当前key
          });
        }
        if (onClick && data[row]) {
          onClick(data[row], row, data[row][columnKey], td, event);
        }
      },

      // 用于拖拽 解决参照
      beforeAutofill(start, end, text) {
        const { columns } = _this.props;
        let { data, rowDataCache } = _this.state;

        const { row, col } = start; // 开始行
        const { row: endRow } = end; // 最后行

        const column = columns[col];

        const { data: currentKey, refConfig } = column;


        if (refConfig && refConfig.rowKey && refConfig.rowKey.length > 1) {
          const { rowKey } = refConfig;
          // 参照返回字段
          for (let i = row; i <= endRow; i++) {
            for (let j = 0; j < rowKey.length; j++) {
              let key = rowKey[j]; // 系统默认key
              if (rowDataCache[key]) { // 如果没有找到key 不更新
                data[i][key] = rowDataCache[key];
              } else { // 清空参照code id
                delete data[i][key];
              }
            }
          }

        }

        // 添加修改标记
        for (let i = row; i <= endRow; i++) {
          data[i].update_status = true;
        }

        _this.setState({ data });

        // // 是否自定义 col 显示值
        for (const columnItem of columns) {
          const { customValue, data: colName } = columnItem;
          if (customValue) {
            for (let i = row; i <= endRow; i++) {
              data[i][currentKey] = rowDataCache[currentKey]; // 修改默认 auto值
              data[i][colName] = customValue(data[i]); //  计算自定义规则
              _this.onUpdateRowData(i, data[i]); // 更新
            }
          }
        }

      },

      // afterCreateRow: function (index, amount) {  // 添加行后执行
      //     console.log("index, amount", index, amount)
      //     const {data} = _this.state;
      //     data[index].add_status = true;
      //     _this.setState({data});
      // },


      afterColumnSort(column, orders) {

        // 获取原始数据
        if (orders.length > 0) {
          const newData = arrayObjctClone(_this.hot.getSourceData());
          const { column: cIndex, sortOrder } = orders[orders.length - 1];
          const { columns } = _this.props;
          const type = columns[cIndex].data;
          // 排序算法
          const sortData = newData.sort(compareObj(type, sortOrder));
          // 更新数据
          _this.setState({ data: sortData });
        } else {
          _this.setState({ data: _this.cacheData });
        }

        // 排序事件
        const { afterColumnSort } = _this.props;
        if (afterColumnSort) {
          afterColumnSort(column, orders);
        }

      },

      // 行移动事件
      afterRowMove(rows, target) {
        const { data } = _this.state;
        const checkArray = data.filter((ele, index) => rows.includes(index));
        const filterArray = data.filter((ele, index) => !rows.includes(index));
        const startArray = filterArray.slice(0, target); // 开始时间
        const endArray = filterArray.slice(target, filterArray.length); //  结束时间
        const newArray = [...startArray, ...checkArray, ...endArray];
        _this.setState({ data: newArray });

        // 行移动事件
        const { afterRowMove } = _this.props;
        if (afterRowMove) {
          afterRowMove(rows, target, newArray);
        }
      },


      // 选中行
      afterSelection(startRow, startCol, endRow, endCol, preventScrolling, selectionLayerLevel, event) {
        let { selectRowDataNum } = _this.state;
        if (startRow > endRow) {
          [startRow, endRow] = [endRow, startRow];
        }

        const selectNum = getBetweenNum(startRow, endRow);
        if (selectionLayerLevel) { // 是否ctr
          selectRowDataNum.push(...selectNum);
        } else {
          selectRowDataNum = selectNum;
        }
        // 去重
        const set = new Set(selectRowDataNum);
        const selectRowIndex = Array.from(set);
        _this.setState({ selectRowDataNum: selectRowIndex });
        // 选中行回调
        const { afterSelection } = _this.props;
        if (afterSelection) {
          afterSelection(startRow, startCol, endRow, endCol, selectRowIndex);
        }
      },


      // todo 页面render 依旧保留上一次的数据
      beforeRemoveRow(index, amount, physicalRows, source) {
        const { rowKey } = _this.props;
        const delDataList = getDelRows(_this.state, physicalRows, rowKey);
        _this.setState({ delDataList });
      },


      afterOnCellMouseOut(event, coords, td) {

        const tooltipValue = td.getAttribute('tooltip');
        const clientWidth = td.clientWidth;
        const scrollWidth = td.scrollWidth;
        if (tooltipValue && (scrollWidth > clientWidth)) { // 判断是否关闭 tooltip
          td.innerHTML = tooltipValue || '\&nbsp;\&nbsp';
        }

      },

      beforeOnCellMouseOver(event, coords, td) {
        // 鼠标移动上去 省略部分展示
        const { offsetWidth } = td;
        const tooltipValue = td.getAttribute('tooltip');
        const clientWidth = td.clientWidth;
        const scrollWidth = td.scrollWidth;
        // 判断是否省略 ...
        if (tooltipValue && (scrollWidth > clientWidth)) {
          let createDiv = document.createElement('div');
          createDiv.innerHTML = tooltipValue || '\&nbsp;\&nbsp';
          createDiv.style.width = offsetWidth;
          createDiv.setAttribute('class', 'ac-hand-tooltip');
          td.appendChild(createDiv);
        }
      },


      // 粘贴后操作
      afterPaste(values, coords) {
        const { startRow, endRow } = coords[0];
        let { data } = _this.state;
        for (let i = startRow; i <= endRow; i++) {
          data[i].update_status = true;
        }
        _this.setState({ data }); // 更新state
      },


    });
  };


  // 参照自定义表格
  coverRenderer = (instance, td, row, col, prop, value, cellProperties) => {

    const _this = this;

    const { columns, rowStyle } = _this.props;
    Handsontable.dom.empty(td); // 清空td

    let createDiv = document.createElement('div');
    createDiv.innerHTML = value || '\&nbsp;\&nbsp';
    createDiv.style.width = '100%';

    // 添加 mousedown 事件
    Handsontable.dom.addEvent(createDiv, 'mousedown', (e) => {
      e.preventDefault(); // prevent selection quirk
    });

    // 添加 mouseup 事件
    Handsontable.dom.addEvent(createDiv, 'dblclick', (e) => {
      e.preventDefault(); // prevent selection quirk
      let { refConfig, refType, refSource, refOnChange } = columns[col];
      refConfig.showModal = true;
      refConfig.currentRefType = refType;

      // 获取参照数据
      refSource('', '', (data) => {
        // 更新当前参照信息
        const newConfig = { ...refConfig, ...data };
        _this.setState({
          refConfig: newConfig,
          refSource,
          refOnChange,
          currentRow: row,
          currentCol: col,
          currentKey: prop,
        });
      });

    });

    td.innerHTML = '<div class="three-bar">≡</div>';
    td.appendChild(createDiv);

    // 添加样式
    const styles = rowStyle && rowStyle(row, col, prop, value);
    if (styles) {
      for (const style in styles) { // 修改行样式
        td.style[style] = styles[style];
      }
    }
    return td;
  };


  // 数据转换
  dealData = () => {

    let {
      colHeaders,
      rowStyle,
      multiSelect = true, // 行多选框
      dropdownMenu = true, // 表头下拉
      nestedHeaders, // 多表头
      csvConfig = {},
    } = this.props;

    // 1.处理下拉值 将[{key:'',value:''}] 转换成 [""],
    // 2.处理表格参照,

    let { data, columns } = customRenderData(this.state.data, this.props.columns, this.coverRenderer);
    // 是否自定义 col 显示值
    for (const columnItem of columns) {
      const { customValue, data: colName } = columnItem;
      if (customValue) {
        for (const [index, ele] of data.entries()) {
          data[index][colName] = customValue(data[index]);
        }
      }

    }

    // 缓存 data 排序用
    this.cacheData = data;

    // 添加 多选框
    if (multiSelect && colHeaders && Array.isArray(colHeaders) && colHeaders.length > 0) {

      const checkedHeader = `<input type='checkbox' class='multiSelectChecker' />`;
      let className = 'htCenter htMiddle ';
      if (dropdownMenu) {
        className += 'menuCheckbox';
      }
      const checkboxCell = {
        data: 'checkbox_status',
        type: 'checkbox',
        className,
      };

      colHeaders.unshift(checkedHeader);
      if (columns[0].data !== 'checkbox_status') {
        columns.unshift(checkboxCell);
      }

      // 多表头处理
      if (nestedHeaders) {
        for (const index in nestedHeaders) {
          nestedHeaders[index].unshift('');
        }
        nestedHeaders.push(colHeaders);
      }
    }

    // 多表头无checkbox
    if (!multiSelect && nestedHeaders) {
      nestedHeaders.push(colHeaders);
    }

    // 添加行样式
    if (columns && columns.length > 0) {
      for (const column of columns) {
        const { renderer, type, textTooltip, refConfig } = column;
        // 添加样式
        if (!renderer) {

          column.renderer = function (instance, td, row, col, prop, value) {
            switch (type) {
              case 'date':
                Handsontable.renderers.DateRenderer.apply(this, arguments);
                break;
              case 'numeric':
                Handsontable.renderers.NumericRenderer.apply(this, arguments);
                break;
              case 'checkbox':
                Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
                break;
              case 'time':
                Handsontable.renderers.TimeRenderer.apply(this, arguments);
                break;
              case 'base':
                Handsontable.renderers.BaseRenderer.apply(this, arguments);
                break;
              case 'autocomplete':
                Handsontable.renderers.AutocompleteRenderer.apply(this, arguments);
                break;
              case 'password':
                Handsontable.renderers.PasswordRenderer.apply(this, arguments);
                break;
              case 'dropdown':
                Handsontable.renderers.DropdownRenderer.apply(this, arguments);
                break;
              default:
                Handsontable.renderers.TextRenderer.apply(this, arguments);
            }

            // 添加样式 超出部分...
            if (textTooltip) {
              td.style.textOverflow = 'ellipsis';
              td.style.whiteSpace = 'nowrap';
              td.style.wordBreak = 'keep-all';
              td.setAttribute('tooltip', value);
            }

            // 如果是参照 三道杠
            if (refConfig && refConfig.isThreeBar) {
              const text = value || '';
              td.innerHTML = '<div class="three-bar">≡</div>' + text;
            }

            // 添加自定义行样式
            const styles = rowStyle ? rowStyle(row, col, prop, value) : '';
            if (styles) {
              // 修改行样式
              for (const style in styles) {
                td.style[style] = styles[style];
              }
            }
          };
        }
      }
    }

    // csv 导出配置

    const csvDefault = {
      columnDelimiter: ',',
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: 'csv',
      filename: 'CSV_[YYYY]-[MM]-[DD]',
      mimeType: 'text/csv',
      rowDelimiter: '\r\n',
      rowHeaders: true,
    };


    return {

      licenseKey: 'non-commercial-and-evaluation', // 添加 License key
      manualColumnResize: true, // 添加列拖拽
      multiColumnSorting: true, // 表头排序，升或降序
      rowHeaders: true, // 显示行头序号,
      language: 'zh-CN', // 表格语言
      stretchH: 'last', // 最后列宽
      contextMenu: true, // 行表头上下文菜单
      manualColumnFreeze: true, // 是否开启固定列
      copyPaste: true, // 是否可以复制粘贴
      customBorders: true, // 是否开启边框设置
      copyable: true, // 是否开启键盘复制
      allowInsertColumn: false, // 是否开启插入列
      allowInsertRow: true, // 是否开启插入行
      allowEmpty: false,
      multiSelect, // 行多选框
      dropdownMenu: true, // 表头下拉
      mergeCells: false, // 表格合并
      fillHandle: 'vertical', // 默认只能横向 为了解决参照问题

      ...this.props,

      columns,
      data,
      nestedHeaders,

      csvConfig: { ...csvDefault, ...csvConfig }, // 导出csv 配置

    };
  };


  // 将修改后的数据返回
  getData = (callback) => {
    this.hot.validateCells((valid) => {
      let result = null;
      if (valid) {
        const { columns } = this.props;
        result = changeSelectValue2Key(this.state.data, columns); // 回写下拉框值
      }
      callback(result);
    });
  };


  // 插入行数据
  onInsertRowData = (number = 0, source) => {
    const { data } = this.state;
    const { columns } = this.props;
    let placeIndex = 0;
    if (number === -1) {
      placeIndex = data.length;
    }
    this.hot.alter('insert_row', placeIndex);
    if (source && Object.prototype.toString.call(source === '[Object Object]')) {
      // 对下拉数据进行转换
      data[placeIndex] = colFindSelectValue(columns, source);
      this.setState({ data });
      this.hot.render();
    }
  };

  // 修改行数据
  onUpdateRowData = (number = 0, source) => {
    if (source && Object.prototype.toString.call(source === '[Object Object]')) {
      const { data } = this.state;
      source.update_status = true; // 设置为更新状态

      data[number] = source;
      this.setState({
        data,
        rowDataCache: source
      });
      this.hot.render();
    }
  };

  // 获取多选选中的数据
  getCheckbox = () => {
    // 获取选中的数据
    const result = getCheckboxActive(this.state.data);
    const { columns } = this.props;
    return changeSelectValue2Key(result, columns); // 回写下拉框值
  };

  // 返回格式化后数据
  getFormatData = () => {
    const { columns } = this.props;
    return changeSelectValue2Key(this.state.data, columns); // 回写下拉框值
  };

  // 返回被修改过的数据
  getUpdateData = () => {
    const { columns, rowKey } = this.props;
    const result = getUpdateActive(this.state.data, rowKey);
    return changeSelectValue2Key(result, columns); // 回写下拉框值
  };


  // 返回被删除的数据
  getDelRowData = () => {
    const { delDataList } = this.state;
    const { columns } = this.props;
    return changeSelectValue2Key(delDataList, columns); // 回写下拉框值
  };


  // 添加行数据方法
  getAddRowData = () => {
    const { columns, rowKey } = this.props;
    const result = getAddRowActive(this.state.data, rowKey);
    return changeSelectValue2Key(result, columns); // 回写下拉框值
  };

  // 删除选中行方法 checkbox
  onDelRowCheck = () => {
    const result = getCheckDelArray(this.state.data);
    this.hot.alter('remove_row', result);
  };


  // 删除选中行 selected
  onDelRowSelect = () => {
    const { selectRowDataNum } = this.state;
    const result = selectRowDataNum.map(item => [item, 1]);
    this.hot.alter('remove_row', [...result]);
    return this.getSelectData();
  };


  // 删除选中行方法 checkbox
  onDelRowNum = (selectRowDataNum) => {
    const result = selectRowDataNum.map(item => [item, 1]);
    this.hot.alter('remove_row', result);
  };


  // 清空选中
  onClearSelectData = () => {
    this.setState({ selectRowDataNum: [] });
  };

  // 获取选中行数据 通过多选框
  getSelectData = () => {

    const { selectRowDataNum, data } = this.state;
    const { columns } = this.props;

    const selectRowData = selectRowDataNum.map(item => data[item]);
    const selectResult = changeSelectValue2Key(selectRowData, columns); // 回写下拉框值
    // this.setState({ selectRowDataNum: [] });
    // 清空选中数据
    return {
      rowList: selectResult,
      indexList: selectRowDataNum,
    };

  };


  // 参照保存
  onSaveRef = (params) => {

    const _this = this;

    let { currentRow, currentKey, data, refConfig, refOnChange } = _this.state;

    // 往行数据中添加参照的其他信息
    if (params && Array.isArray(params) && params.length > 0) {
      const { columnsKey, rowKey } = refConfig;
      // 参照返回字段
      const keyArray = columnsKey && columnsKey.length > 1 ? columnsKey : ['refname', 'refpk'];
      // 将多个对象的值用,链接
      const paramObj = array2Obj(params, keyArray);
      data[currentRow][currentKey] = paramObj[keyArray[0]];
      // 返回参照多余字段用_链接
      for (let i = 1; i < keyArray.length; i++) {
        const key = keyArray[i];
        if (rowKey && Array.isArray(rowKey) && rowKey[i]) {

          data[currentRow][rowKey[i]] = paramObj[key];
        } else {
          data[currentRow][currentKey + '_' + key] = paramObj[key];
        }
      }
    }


    // 参照选中值回调
    if (refOnChange) {
      refOnChange(params, data[currentRow], currentRow); // 参照选中数据,表格行数据,表格行下标
    }

    // 更新值
    _this.setState({
      data,
      refConfig: {}, // 重置缓存参照配置
      refOnChange: null, // 重置缓存参照 onChange 事件
    });

    // 重新加载数据
    this.hot.loadData(data);
  };


  // 参照取消
  onCancelRef = () => {
    this.setState({
      refConfig: {}, // 重置缓存参照配置¬
      refOnChange: null, // 重置缓存参照 onChange 事件
    });
  };


  // 表格简单搜索
  onSearchRef = (value, type) => {
    const _this = this;
    let { refConfig, refSource } = _this.state;
    // 获取参照数据
    refSource(value, type, (data) => {
      // 更新当前参照信息
      const newConfig = { ...refConfig, ...data };
      _this.setState({
        refConfig: newConfig,
      });
    });
  };

  // 穿梭框参照-设置目标key
  setTargetKeys = (targetKeys) => {
    let { refConfig } = this.state;
    refConfig.targetKeys = targetKeys;
    this.setState({ refConfig });
  };

  // 导出
  onExportCSV = () => {
    const { csvConfig } = this.props;
    const exportPlugin = this.hot.getPlugin('exportFile');
    exportPlugin.downloadFile('csv', csvConfig);
  };


  // 导出
  onExportHeader = () => {
    const { csvConfig, colHeaders, multiSelect } = this.props;
    const { filename } = csvConfig;
    let copyColHeaders = [...colHeaders];

    // 判断是否有 dom 节点
    if (Array.isArray(copyColHeaders) && copyColHeaders.length > 0) {
      let reg = /<[^>]+>/g;
      if (reg.test(copyColHeaders[0])) {
        copyColHeaders.shift();
      }
    }

    // BOM的方式解决EXCEL乱码问题
    const BOM = '\uFEFF';
    let csvString = BOM + copyColHeaders.join(',');
    // 创建a标签
    const eleLink = document.createElement('a');
    eleLink.href = 'data:attachment/csv,' + encodeURI(csvString);
    eleLink.target = '_blank';
    eleLink.download = `${filename}.csv`;
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);

  };


  // auto 值处理
  autoDataConversion = (data, key = 'name') => {
    this.setState({ autoCache: data });
    return data.map(item => item[key]);
  };

  render() {
    const { id, dropdownMenu, fixedShadow, spanClass, spanStyle } = this.props;
    const { refConfig } = this.state;

    let tableClass = dropdownMenu !== false ? 'hand-table-drop-down-menu' : '';
    if (fixedShadow) { // 固定阴影
      tableClass += ' fixedShadow';
    }


    return (
      <span className={spanClass} style={spanStyle}>
        {/* 多选通过 css 去掉表头下拉 */}
        <div id={id} className={tableClass}/>
        {/* 表格 */}
        <RefMultipleTable
          {...refConfig}
          onSave={this.onSaveRef}
          onCancel={this.onCancelRef}
          miniSearchFunc={this.onSearchRef}
        />
        {/* 树 */}
        <RefTreeWithInput
          {...refConfig}
          onSave={this.onSaveRef}
          onCancel={this.onCancelRef}
          getRefTreeData={this.onSearchRef}
        />
        {/* 树表 */}
        <RefTreeTableWithInput
          {...refConfig}
          onSave={this.onSaveRef}
          onCancel={this.onCancelRef}
          onTreeSearch={value => this.onSearchRef(value, 'tree')}
          onTableSearch={value => this.onSearchRef(value, 'table')}
        />
        {/* 树穿梭 */}
        <RefTreeTransferWithInput
          {...refConfig}
          onSave={this.onSaveRef}
          onCancel={this.onCancelRef}
          setTargetKeys={this.setTargetKeys}
          handleTreeSelect={this.onSearchRef}
        />

      </span>
    );
  }
}

export default AcHandTable;
