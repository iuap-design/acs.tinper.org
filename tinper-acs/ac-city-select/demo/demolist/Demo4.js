/**
* @title 设置省市联动部分城市不可选择
* @description 设置属性disabled为布尔值，默认为false；
*/
import React, { Component } from 'react';
import CitySelect from '../../src';

class Demo4 extends Component {
	constructor() {
		super();
		this.state = {
			defaultValue: { province: '北京', city: '北京', area: '东城区' },
			value: null,
			disabledProvinceArr: ['天津', '河北'],
			disabledCityArr: ["天津", "长春", "四平", "大连"],
			disabledAreaObj: {
				"鞍山": ["铁东区", "铁西区", "立山区"],
				"抚顺": ["新抚区", "东洲区", "望花区", "抚顺县"],
				"北京": ["崇文区", "宣武区", "朝阳区"]
			}
		}
	}

	render() {
		let { disabledProvinceArr, disabledCityArr, disabledAreaObj } = this.state;
		return (
			<div>
				<CitySelect
					lang='zh_CN'
					disabledProvinceArr={disabledProvinceArr}
					disabledCityArr={disabledCityArr}
					disabledAreaObj={disabledAreaObj}
					onChange={this.onChange}
				/>
			</div>
		)
	}
}
export default Demo4;