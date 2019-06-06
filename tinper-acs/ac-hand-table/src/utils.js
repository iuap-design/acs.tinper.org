/* eslint-disable no-restricted-syntax,no-use-before-define,no-param-reassign */

// 数组深克隆
// export function deepClone(source) {
//     let sourceCopy = source instanceof Array ? [] : {};
//     for (let item in source) {
//         sourceCopy[item] = typeof source[item] === 'object' ? deepClone(source[item]) : source[item];
//     }
//     return sourceCopy;
//
// }

// 数组深克隆
export function deepClone(data) {
  return JSON.parse(JSON.stringify(data));
}


// select 下拉key 转换 value
export function changeSelectKey2Value(key, array) {
  if (key === 0 || key) {
    for (const item of array) {
      if ((item.key === 0 || item.key) && item.key === key) {
        return item.value;
      }
    }
  }
  return key;
}

// select 下拉 value 转换 key
export function getSelectValue2Key(value, array) {
  if (value === 0 || value) {
    for (const item of array) {
      if ((item.value === 0 || item.value) && item.value === value) {
        return item.key;
      }
    }
  }
  return value;
}


// 处理下拉值 将[{key:'',value:''}] 转换成 [""]
export function customRenderData(data, columns, coverRenderer) {
  // 处理下拉值 将[{key:'',value:''}] 转换成 [""],
  if (columns && columns.length > 0) {
    for (const [index, column] of columns.entries()) {
      const {
        type, source, data: columnData, editor,
      } = column;

      let sourceArray = [];

      if ((type === 'select' || editor === 'select') && Array.isArray(source) && source.length > 0 && (typeof source[0]) === 'object') {
        // 更新source 数据
        sourceArray = source.map(item => item.value);
        // 更新data 数据
        data.map((item) => {
          item[columnData] = (item[columnData] === 0 || item[columnData]) ? changeSelectKey2Value(item[columnData], source) : item[columnData];
          return item;
        });
      }
      // 修改select 属性
      if (type === 'select') {
        columns[index].selectOptions = sourceArray.length > 0 ? sourceArray : source;
        delete columns[index].type;
        // delete columns[index].source;
        columns[index].editor = 'select';
      }

      // 修改参照属性
      if (['refMultipleTable', 'refTreeWithInput', 'refTreeTableWithInput', 'refTreeTransferWithInput'].includes(type)) {
        delete columns[index].type;
        columns[index].renderer = coverRenderer; // 自定义参照
        columns[index].isRef = true; // 参照标识
        columns[index].editor = false; // 禁止编辑
        columns[index].refType = type; // 参照类型
      }
    }
  }
  return {
    data,
    columns,
  };
}


export function changeSelectValue2Key(data, columns) {
  // 处理下拉值 将[{key:'',value:''}] 转换成 [""],
  // 深度拷贝数组对象
  const result = arrayObjctClone(data); // 深度拷贝

  if (columns && columns.length > 0) {
    for (const [index, column] of columns.entries()) {
      const {
        type, source, data: columnData, editor,
      } = column;

      let sourceArray = [];

      if ((type === 'select' || editor === 'select') && Array.isArray(source) && source.length > 0 && (typeof source[0]) === 'object') {
        // 更新source 数据
        sourceArray = source.map(item => item.value);
        // 更新data 数据
        result.map((item) => {
          item[columnData] = (item[columnData] === 0 || item[columnData]) ? getSelectValue2Key(item[columnData], source) : item[columnData];
          return item;
        });
      }
    }
  }
  return result.map((item) => {
    delete item.checkbox_status; // 取掉选中数据下标
    delete item.update_status; // 取掉选中数据下标
    return item;
  });
}


// 获取多选框选中的
export function getCheckboxActive(data) {
  const result = [];
  if (data && Array.isArray(data)) {
    for (const item of data) {
      if (item.checkbox_status) {
        result.push(item);
      }
    }
  }
  return result;
}


// 获取被修改后的数据
export function getUpdateActive(data, key = 'id') {
  const result = [];
  if (data && Array.isArray(data)) {
    for (const item of data) {
      if (item.update_status && item[key]) { // 必须要有id
        result.push(item);
      }
    }
  }
  return result;
}


// 获取新添加的数据
export function getAddRowActive(data, key = 'id') {
  const result = [];
  if (data && Array.isArray(data)) {
    for (const item of data) {
      if (!item[key]) {
        result.push(item);
      }
    }
  }
  return result;
}


// 获取多选框选中的
export function getCheckDelArray(data) {
  const result = [];
  if (data && Array.isArray(data)) {
    for (const [index, item] of data.entries()) {
      if (item.checkbox_status) {
        result.push([index, 1]);
      }
    }
  }
  return result;
}

// 获取被删除的行
// todo 数组去重
export function getDelRows(state, physicalRows, rowKey) {
  const { data, delDataList } = state;
  for (const rowIndex of physicalRows) {
    if (data[rowIndex][rowKey]) {
      delDataList.push(data[rowIndex]);
    }
  }
  return delDataList;
}

// 数组对象深度copy
export function arrayObjctClone(array) {
  return array.map(item => ({ ...item }));
}

// 根据对象key 找数组中对象
export function getArrayObjByKey(array, key) {
  for (const obj of array) {
    if (obj.data === key) {
      return obj;
    }
  }
  return null;
}


// 根据数组合成对象
export function array2Obj(array, keyArray) {
  const result = {};
  const temp = {};

  // 生成数组
  for (const key of keyArray) {
    temp[key] = [];
  }

  for (const obj of array) {
    for (const key in obj) {
      if (keyArray.includes(key)) {
        temp[key].push(obj[key]);
      }
    }
  }
  for (const item in temp) {
    result[item] = temp[item].join(',');
  }
  debugger
  return result;
}
