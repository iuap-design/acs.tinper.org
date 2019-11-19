# ac-city-select

[![npm version](https://img.shields.io/npm/v/ac-city-select.svg)](https://www.npmjs.com/package/ac-city-select)
[![Build Status](https://img.shields.io/travis/tinper-bee/ac-city-select/master.svg)](https://travis-ci.org/tinper-bee/ac-city-select)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/ac-city-select/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/ac-city-select?branch=master)
[![devDependency Status](https://img.shields.io/david/dev/tinper-bee/ac-city-select.svg)](https://david-dm.org/tinper-bee/ac-city-select#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/ac-city-select.svg?style=flat)](https://npmjs.org/package/ac-city-select)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/tinper-bee/ac-city-select.svg)](http://isitmaintained.com/project/tinper-bee/ac-city-select "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/tinper-bee/ac-city-select.svg)](http://isitmaintained.com/project/tinper-bee/ac-city-select "Percentage of issues still open")


react ac-city-select component for tinper-bee

地区级联

## 使用方法

```js

import ReactDom from 'react-dom';
import CitySelect from 'ac-city-select';

ReactDom.render(<CitySelect />,document.getElementById('app'));

```



## API

|参数|说明|类型|默认值|
|:---|:-----|:----|:------|
|className|类名|string|-|
|defaultValue|默认值,格式为`{ province:'北京',city:'北京',area:'东城区'}`|array|{ province:'北京',city:'北京',area:'东城区'}|
|onChange|改变时的回调，参数为当前值，格式为`{ province:'北京',city:'北京',area:'东城区'}`|function|-|
|provinceData|预制地区数据，格式为 `[{ "name": "北京", "city":[{"name":"北京", "area":["东城区","西城区","崇文区","宣武区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","平谷区","怀柔区","密云县","延庆县"]}]}, { "name": "天津", "city":[{"name":"天津", "area":["和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区","大港区","东丽区","西青区","津南区","北辰区","武清区","宝坻区","宁河县","静海县","蓟  县"]}]}]` ，使用此props必须设置 `defaultValue`|array|-|
|lang|组件预制三种语言。zh_CN 中文简体(默认)、zh_TW 中文繁体、en_US 英文|string|zh_CN|
|disabled|组件控制是否被禁用。组件预置默认值为false，设置组件为禁用状态， 设置属性为disabled：true|bool|false|
|disabledProvinceArr|设置不可用省份,格式为`['天津', '河北']`（注意： 设置的不可用字段要和lang设置的语言类型相对应，不然设置了会不生效）|array|-|
|disabledCityArr|设置不可用地级市,格式为`["天津", "长春", "四平", "大连"]`（注意： 设置的不可用字段要和lang设置的语言类型相对应，不然设置了会不生效）|array|-|
|disabledAreaObj|设置不可用区域,格式为`{"鞍山": ["铁东区", "铁西区", "立山区"],"抚顺": ["新抚区", "东洲区", "望花区", "抚顺县"],	"北京": ["崇文区", "宣武区", "朝阳区"]}`（注意： 设置不可用区域的时候要加上区域所在的地级市（父级），地级市作为json的key值， 这样可以避免设置区域被重复禁用）|Object|-|
|allowClear|组件控制是否可以被清空。组件预置默认值为false，设置属性为allowClear：true时，组件设置可以被清空， |bool|false|



#### 开发调试

```sh
$ npm install -g bee-tools
$ git clone https://github.com/tinper-bee/ac-city-select
$ cd ac-city-select
$ npm install
$ npm run dev
```
