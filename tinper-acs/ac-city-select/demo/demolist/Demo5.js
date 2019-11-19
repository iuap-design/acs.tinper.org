/**
*
* @title 设置城市选择可以清空；
* @description 设置属性allowClear为布尔值，默认为false，设置allowClear: true时城市可以被清空；
*
*/
import React, { Component } from 'react';
import CitySelect from '../../src';

class Demo5 extends Component {
	constructor() {
		super();
		this.state = {
			defaultValue: { province: '北京', city: '北京', area: '东城区' },
			value: null,
			disabled: true
		}
	}
	onChange = (obj) => {
		console.log(obj);
	}
	render() {
		return (
			<div>
				<CitySelect lang='zh_TW' allowClear={true}  onChange={this.onChange} />
			</div>
		)
	}
}
export default Demo5;