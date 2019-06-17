/* eslint-disable import/first,prefer-const,no-shadow,guard-for-in,no-param-reassign,no-restricted-syntax,prefer-rest-params,no-return-assign,react/prop-types,valid-typeof,quotes,react/destructuring-assignment,padded-blocks,react/no-unused-state,prefer-template,no-underscore-dangle,object-curly-newline,no-unused-vars,prefer-destructuring */
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

} from './utils';

import 'handsontable/languages/zh-CN';
import 'handsontable/languages/en-US';
import 'handsontable/languages/zh-TW';
import 'handsontable/dist/handsontable.full.css';
import './index.less';

class AcHandTable extends React.Component {

  state = {

    data: this.props.data,
    delDataList: [],
    refConfig: {}, // 参照配置
    refOnChange: null, // 缓存参照选中数据的回调方法
    autoCache: null, // 缓存自动下拉框值
    rowDataCache: null, // 缓存选中行
    currentRow: 0, // 选中当前参照行
    currentCol: 0, // 选中当前参照例
    currentKey: '', // 选中当前参照key
    currentRefType: '', // 获取当前参照类型


  };


  hot = null;

  componentDidMount() {
    // 在父组件上绑定子组件方法
    if (this.props.onRef) {
      this.props.onRef(this);
    }
    this.init();
  }

  //
  componentWillReceiveProps(nextProps) {

    const { columns } = nextProps;// 表体数据
    // 处理下拉值 将[{key:'',value:''}] 转换成 [""], dealSelectData
    if (nextProps.data !== this.props.data) {
      let { data } = customRenderData(nextProps.data, columns, this.coverRenderer);
      this.setState({ data });
      // 更新数据
      this.hot.loadData(data);
    }
  }


  init = () => {

    // 对 this.props 处理，添加默认值、checkbox等
    const tempObj = this.dealData();
    let { id, colHeaders } = tempObj;

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
        event.stopPropagation();
        if (checked) {
          colHeaders[0] = `<input type='checkbox' class='multiSelectChecker' checked />`;
          this.state.data.map(item => item.checkbox_status = true);
        } else {
          colHeaders[0] = `<input type='checkbox' class='multiSelectChecker' />`;
          this.state.data.map(item => item.checkbox_status = false);
        }
        this.hot.render();
      }
    });

  };


  // 初始化tabel
  onHandsonTable = (container, data) => {
    const _this = this;
    this.hot = new Handsontable(container, {
      ...data,


      afterChange(changes, source) { // 表格被修改后执行


        if (source === 'edit') { // 表格被修改
          const [rowNum, name, oldValue, newValue] = changes[0];

          const { data } = _this.state;
          const { columns } = _this.props;
          // 添加修改标记
          if (oldValue !== newValue) {
            data[rowNum].update_status = true;
            _this.setState({ data });
          }

          // 是否有回调
          let { onChangeCell, type, refSource, cacheAutoData, refConfig, refOnChange, data: currentKey } = getArrayObjByKey(columns, name);


          // 下拉自动补全
          if (type === 'autocomplete' && refSource) {
            const { columnsKey = [] } = refConfig;

            let refValue = 'refname';
            if (columnsKey.length > 0) {
              refValue = columnsKey[0];
            }

            const currentAutoRow = arrayFindObj(cacheAutoData, refValue, newValue) || {};
            data[rowNum][currentKey] = newValue;
            for (let i = 1; i < columnsKey.length; i++) {
              const key = columnsKey[i];
              data[rowNum][currentKey + '_' + key] = currentAutoRow[key];
            }
            _this.setState({ data });

            // 下拉回调change
            if (refOnChange) {
              refOnChange(currentAutoRow, data[rowNum], rowNum);
            }
          }

          if (onChangeCell) {
            const rowData = { ...data[rowNum] };
            onChangeCell(rowData, rowNum);
          }
        }
      },

      afterOnCellMouseDown(event, coords, td) {
        const { row, col } = coords;
        const { data } = _this.state;
        const { columns } = _this.props;
        const { onClick, data: columnKey } = columns[col] || {};
        // 缓存行选中数据
        _this.setState({ rowDataCache: data[row] });
        if (onClick) {
          onClick(data[row], row, data[row][columnKey]);
        }
      },


      // 用于拖拽 解决参照
      beforeAutofill(start, end, text) {
        const { columns } = _this.props;
        let { data, rowDataCache } = _this.state;

        const { row, col } = start; // 开始行
        const { row: endRow } = end;  // 最后行

        const column = columns[col];

        const { isRef, data: currentKey, refConfig } = column;


        if (isRef) {
          const { columnsKey } = refConfig;
          // 参照返回字段
          const keyArray = columnsKey && columnsKey.length > 1 ? columnsKey : ['refname', 'refpk'];
          for (let i = row; i <= endRow; i++) {
            // 设置展示值
            data[i][currentKey] = rowDataCache[currentKey];
            // 返回参照多余字段用_链接
            for (let j = 1; j < keyArray.length; j++) {
              const key = currentKey + '_' + keyArray[j];
              data[i][key] = rowDataCache[key];
            }
          }
        }
        _this.setState({ data });
      },

      // afterCreateRow: function (index, amount) {  // 添加行后执行
      //     console.log("index, amount", index, amount)
      //     const {data} = _this.state;
      //     data[index].add_status = true;
      //     _this.setState({data});
      // },

      // todo 页面render 依旧保留上一次的数据
      beforeRemoveRow(index, amount, physicalRows, source) {
        const { rowKey } = _this.props;
        const delDataList = getDelRows(_this.state, physicalRows, rowKey);
        _this.setState({ delDataList });
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
    td.appendChild(createDiv);

    // 添加样式
    const styles = rowStyle && rowStyle(row + 1, col, prop);
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
      colHeaders, rowStyle,
      multiSelect = true, // 行多选框
      dropdownMenu = true, // 表头下拉
      csvConfig = {},
    } = this.props;

    // 1.处理下拉值 将[{key:'',value:''}] 转换成 [""],
    // 2.处理表格参照,

    let { data, columns } = customRenderData(this.state.data, this.props.columns, this.coverRenderer);

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
      columns.unshift(checkboxCell);
    }


    // 添加行样式
    if (columns && columns.length > 0 && rowStyle) {
      for (const column of columns) {
        const { renderer, type } = column;
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

            const styles = rowStyle(row + 1, col, prop);
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
      multiSelect: true, // 行多选框
      dropdownMenu: true, // 表头下拉

      ...this.props,

      columns,
      data,
      fillHandle: 'vertical', // 默认只能横向 为了解决参照问题
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
    this.hot.alter('insert_row', number);
    if (source && Object.prototype.toString.call(source === '[Object Object]')) {
      const { data } = this.state;
      data[number] = source;
      this.setState({ data });
      this.hot.render();
    }
  };

  // 修改行数据
  onUpdateRowData = (number = 0, source) => {
    if (source && Object.prototype.toString.call(source === '[Object Object]')) {
      const { data } = this.state;
      data[number] = source;
      this.setState({ data });
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

  // 删除选中行方法
  onDelRowCheck = () => {
    this.hot.alter('remove_row', getCheckDelArray(this.state.data));
  };


  // 参照保存
  onSaveRef = (params) => {

    const _this = this;

    let { currentRow, currentKey, data, refConfig, refOnChange } = _this.state;

    // 往行数据中添加参照的其他信息
    if (params && Array.isArray(params) && params.length > 0) {
      const { columnsKey } = refConfig;
      // 参照返回字段
      const keyArray = columnsKey && columnsKey.length > 1 ? columnsKey : ['refname', 'refpk'];
      // 将多个对象的值用,链接
      const paramObj = array2Obj(params, keyArray);
      data[currentRow][currentKey] = paramObj[keyArray[0]];
      // 返回参照多余字段用_链接
      for (let i = 1; i < keyArray.length; i++) {
        const key = keyArray[i];
        data[currentRow][currentKey + '_' + key] = paramObj[key];
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
      refConfig: {},// 重置缓存参照配置¬
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

  // auto 值处理
  autoDataConversion = (data, key = 'name') => {
    this.setState({ autoCache: data });
    return data.map(item => item[key]);
  };

  render() {
    const { id } = this.props;
    const { refConfig } = this.state;
    return (
      <div>
        <div id={id}/>
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

      </div>
    );
  }
}

export default AcHandTable;
