import CONFIG from './config';
import cloneDeep from 'clone-deep';
/***
 * 获取当前浏览器类型
 */
export default function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf('Opera') > -1;
    if (isOpera) {
      //判断是否Opera浏览器
      return 'Opera';
    }
    if (userAgent.indexOf('Firefox') > -1) {
      //判断是否Firefox浏览器
      return 'Firefox';
    }
    if (userAgent.indexOf('Chrome') > -1) {
      return 'Chrome';
    }
    if (userAgent.indexOf('Safari') > -1) {
      //判断是否Safari浏览器
      return 'Safari';
    }
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return 'IE';
    }
}

/*
 * @method   测试 不存在或者值为false 同等效力
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     one     {any}
 * @return   {boolean}       返回ture/false
 * @demo     undefinedOrfalse('')
 */
export function undefinedOrfalse(one) {
  return typeof one === 'undefined' || one === false;
}

// 处理多头排序标识
export function getSortColums({ colums, sortObj }) {
  colums.forEach(eve => {
    //获取合计行的列配置
    const { children } = eve;
    if (!isUndefined(children)) {
      //判断和并列的情况
      getSortColums({ colums: children, sortObj });
    } else {
      colums.forEach(item => {
        //保存返回的column状态，没有则终止order状态
        if (sortObj[item.attrcode]) {
          item.order = sortObj[item.attrcode].order;
          item.orderNum = sortObj[item.attrcode].orderNum;
        } else {
          item.order = 'flatscend';
          item.orderNum = '';
        }
      });
    }
  });
}
  
/* 检测类型是否为数组 */
export function isArray(param) {
  return Object.prototype.toString.call(param).slice(8, -1) === 'Array';
}

/* 检测类型是否为字符串 */
export function isString(param) {
  return Object.prototype.toString.call(param).slice(8, -1) === 'String';
}

/* 检测类型是否为函数 */
export function isFunction(param) {
  return Object.prototype.toString.call(param).slice(8, -1) === 'Function';
}

/*
 * 检测是否是常规的 Object  {} 这种形式
 */
export function isObj(param) {
  return Object.prototype.toString.call(param).slice(8, -1) === 'Object';
}

/*
 * @method   检测是否是需要是boolean类型
 * @author   add by yangguoqiang @18/04/11
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isBoolean(param) {
  return CONFIG.boolean.includes(param);
}

/*
 * @method   if条件下为false   除去NaN、0、-0、false   剩余undefined、null、""
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     condition     {any}         
 * @return   {boolean}       返回ture/false
 * @demo     isWrong('')    因为后台返回数据不规范
 */
export function isWrong(param) {
  return typeof param === 'undefined' || param === null || param === '';
}

export function isNullOrVoid(param) {
  return typeof param === 'undefined' || param === null;
}

/*
 * @method   根据不同类型初始化 null 输出后台可用的数据格式。
 * @author   add by yangguoqiang @18/03/19
 * @params 
 *     origin    {any}      数据来源
 *     type      {string}   数据类型
 * @return   {any}          返回
 * @demo     typeFormat('', 'string')
 */
export function typeFormat(origin, type) {
  let isVoid = isWrong.call(null, origin);
  switch (true) {
      // 'input', 'textarea', 'datepicker', 'select', 'checkbox', 'radio', 'refer', 'label' 和 number的空value处理
      case [...CONFIG.string, ...CONFIG.number].includes(type) && isVoid:
          return '';
      // switch 的空value处理为boolean值
      case CONFIG.boolean.includes(type) && isVoid:
          return !!origin;
      default:
          return origin;
  }
}

//获得数据类型
export function testType(origin) {
  return Object.prototype.toString.call(origin).slice(8, -1);
}

// 检测是否有一个含有numberindex
export function checkHasIndex(arr) {
  return arr.some(item => {
    return item.attrcode == 'numberindex';
  });
}

/**
 * 控制主表的收起展开
 * @param  tableId   meta的id号
 * @param  flag      flag:true/false 是否显示
 */
export function toggleCardTable(tableId, flag = false) {
  const isArr = Array.isArray(tableId);
  if (typeof tableId == 'string' || isArr) {
    tableId = isArr ? tableId : [tableId];
    tableId.forEach(item => {
      if (this.myTable[item]) {
        this.myTable[item].state.table.showMore = flag;
        this.myTable[item].setState({
          table: this.myTable[item].state.table
        });
      }
    });
    return false;
  }
  return false;
}

// 检测是否有一个含有key
export function checkHasKey(arr, key) {
  return arr.some(item => {
    return item.dataIndex === key;
  });
}

// 将科学计数法转成数字字符串
export function convertNum(num_str) {
  //参数必须为 字符串
  //科学计数法字符 转换 为数字字符， 突破正数21位和负数7位的Number自动转换
  // 兼容 小数点左边有多位数的情况，即 a×10^b（aEb），a非标准范围（1≤|a|<10）下的情况。如 3453.54E-6 or 3453.54E6
  let resValue = '',
    power = '',
    result = null,
    dotIndex = 0,
    resArr = [],
    sym = '';
  let numStr = String(num_str);
  if(!/e/i.test(numStr)) {
    return numStr;
  }
  if (numStr[0] == '-') {
    // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
    numStr = numStr.substr(1);
    sym = '-';
  }
  let regExp = new RegExp('^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$', 'ig');
  result = regExp.exec(numStr);
  if (result != null) {
    resValue = result[2];
    power = result[5];
    result = null;
  }
  if (!resValue && !power) {
    return false;
  }
  dotIndex = resValue.indexOf('.');
  resValue = resValue.replace('.', '');
  resArr = resValue.split('');
  if (Number(power) >= 0) {
    let subres = resValue.substr(dotIndex);
    power = Number(power);
    //幂数大于小数点后面的数字位数时，后面加0
    for (let i = 0; i < power - subres.length; i++) {
        resArr.push('0');
    }
    if (power - subres.length < 0) {
        resArr.splice(dotIndex + power, 0, '.');
    }
  } else {
    power = power.replace('-', '');
    power = Number(power);
    //幂数大于等于 小数点的index位置, 前面加0
    for (let i = 0; i <= power - 1; i++) {
        resArr.unshift('0');
    }
    let n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
    resArr.splice(n, 0, '.');
  }
  resValue = resArr.join('');
  return sym + resValue;
}

//精度 + 补0 + 千分位综合处理
export function formatAcuracy(value, len = 0) {
  if (value === null || value === undefined || String(value).endsWith('必输项')) {
      return value;
  }
  // 将科学计数法转成数字字符串
  value = convertNum(value);
  return commafy(addZero(formatDot(value, len), len));
}

// 精度处理
export function formatDot(value, len = 8) {
  let formatVal, dotSplit, val;

  val = (value || 0).toString();

  dotSplit = val.split('.');

  if (dotSplit.length > 2 || !value) {
      return value;
  }

  if (val.indexOf('.') > -1) {
      if (len == 0) {
          formatVal = dotSplit[0];
      } else {
          formatVal = val.substring(0, val.indexOf('.') + len + 1);
      }
  } else {
      formatVal = val;
  }

  return formatVal;
}

//数字转换成千分位 格式
export function commafy(num) {
  let pointIndex, intPart, pointPart;
  if (num === '-') {
      return '-';
  }

  if (Number.isNaN(+(num + '').split(',').join(''))) {
      //这里暂时就处理一下千分位的逗号
      return '';
  }

  num = num + '';
  if (/^.*\..*$/.test(num)) {
      pointIndex = num.lastIndexOf('.');
      intPart = num.substring(0, pointIndex);
      pointPart = num.substring(pointIndex + 1, num.length);
      intPart = intPart + '';
      let re = /(-?\d+)(\d{3})/;
      while (re.test(intPart)) {
          intPart = intPart.replace(re, '$1,$2');
      }
      num = intPart + '.' + pointPart;
  } else {
      num = num + '';
      let re = /(-?\d+)(\d{3})/;
      while (re.test(num)) {
          num = num.replace(re, '$1,$2');
      }
  }
  return num;
}

// 补0
export const addZero = (num, scale) => {
  if (num === '' || num === undefined || num === null) {
      return '';
  }

  if (scale > 0) {
      let start = String(num).split('.')[0];
      let end = String(num).split('.')[1];
      if (!end) {
          end = '';
      }
      let len = end.length;
      if (len < scale) {
          end = end.padEnd(scale, '0');
      }
      return start + '.' + end;
  } else {
      return num;
  }
};

// 四舍五入 by wangyang
export function ncRounding(value, scale) {
  // 如果没有精度，不需要处理四舍五入
  if (!scale) return value;

  let [_value, _scale] = [value, scale];

  if (
    !Object.prototype.toString.call(scale) !== "[object Number]" &&
    !isNaN(Number(scale))
  )
    _scale = Number(scale);

  // 校验参数
  if (Object.prototype.toString.call(value) !== "[object String]")
    _value = String(value);

  const re = /^(\-|\+)?(\d+)?\.?(\d+)?$/;

  if (!re.test(_value)) {
    console.warn("处理参数异常");
    return value;
  }

  // 分割value
  let [beforePoint, afterPoint] = _value.split(".");

  // 有小数位数
  if (afterPoint && afterPoint !== "") {
    // 判断小数位数与精度的关系
    if (afterPoint.length > _scale) {
      _value = Number(_value);
      // 进行四舍五入操作
      _value = Number(_value.toFixed(_scale + 1));

      _value = _value * Math.pow(10, _scale);

      _value = Math.round(_value);

      _value = _value / Math.pow(10, _scale);
    }
  }

  return _value;
}

// 深度拷贝
export function deepClone(data) {
  return cloneDeep(data);
}

export function getDisplayByValue(value, item) {
  //新加个value !== undefined的容错  当清除select的时候防止报错
  if (CONFIG.getDisplay.includes(item.itemtype) && Array.isArray(item.options) && value !== undefined) {
    let { display } = item.options.filter(item => item.value == value)[0];
    return display;
  }
  return undefined;
}

//判断数组,对象,字符串是否为空
export function isEmpty(param) {
  let result = false;

  if (typeof param === 'object') {
      let hasvalue = false;
      if (Array.isArray(param)) {
          hasvalue = param.length !== 0;
      } else {
          for (var pro in param) {
              hasvalue = true;
              break;
          }
      }

      result = !hasvalue;
  } else if (typeof param === 'string') {
      if (param === '') result = true;
  } else if (param === undefined) {
      result = true;
  }
  return result;
}

// // 处理旧值函数
// export function saveChangedRowsOldValue(moduleId, index, attrcode, value) {
//   !Array.isArray(this.tableChangedRowsOldValue[moduleId]) && (this.tableChangedRowsOldValue[moduleId] = []);
//   !isObj(this.tableChangedRowsOldValue[moduleId][index]) && (this.tableChangedRowsOldValue[moduleId][index] = {});
//   this.tableChangedRowsOldValue[moduleId][index][attrcode] = value;
// }

// // 获取旧值函数
// export function getChangedRowsOldValue(moduleId, index, attrcode) {
//   let isArr = Array.isArray(this.tableChangedRowsOldValue[moduleId]);
//   if (!isArr || (isArr && !isObj(this.tableChangedRowsOldValue[moduleId][index]))) {
//     return null;
//   }
//   return this.tableChangedRowsOldValue[moduleId][index][attrcode] || null;
// }

// // 删除旧值函数
// export function delChangedRowsOldValue(moduleId, index, attrcode) {
//   let isArr = Array.isArray(this.tableChangedRowsOldValue[moduleId]);
//   if (!isArr || (isArr && !isObj(this.tableChangedRowsOldValue[moduleId][index]))) {
//     return;
//   }
//   if (attrcode) {
//     this.tableChangedRowsOldValue[moduleId][index][attrcode] = null;
//   } else {
//     this.tableChangedRowsOldValue[moduleId][index] = {};
//   }
// }