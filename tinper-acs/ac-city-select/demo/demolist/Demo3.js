/**
*
* @title 设置不可用状态
* @description 设置属性disabled为布尔值，默认为false；
*
*/
import React, { Component } from 'react';
import CitySelect from '../../src';

class Demo3 extends Component {
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
		let { disabled } = this.state
		return (
			<div>
				<CitySelect lang='zh_TW' disabled={disabled} onChange={this.onChange} />
			</div>
		)
	}
}
export default Demo3;