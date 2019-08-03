import React, { Component } from 'react';
import FormControl from 'bee-form-control';

export default class NCFormControl extends Component {
	constructor(props) {
		super(props);
	}

	/**
	 * @author bbqin
	 */
	componentDidUpdate() {
		// TODO  目前逻辑在 setstate后
		// TODO 做一些事件绑定的工作
		// typeof Message ? Message.listen('', this.)
	}
	/**
	 * @author bbqin
	 */
	handleFocus = (value, e) => {
		const { onFocus, itemtype } = this.props;
		onFocus && onFocus(e, value);

		//this.mouseDown 表示用户用鼠标点击此组件
		this.mouseDown !== true
		&& itemtype === 'input'
		&& this.executeSelection(e);
	};

	executeSelection(e) {
		let length = e.target.value.length;
		e.target.setSelectionRange(0, length);
	}

	handleBlur = (value, e) => {
		//let value = typeof e === 'object' ? e.target.value : e;
		const { onBlur } = this.props;
		onBlur && onBlur(value, e);
	};
	// icon clock event
	closeClick = () => {
		this.i.clearValue();
		if (
			this.i.props.clearSearch &&
			Object.prototype.toString.call(this.i.props.clearSearch).slice(8, 16) === 'Function'
		) {
			this.i.props.clearSearch();
		}
	};
	searchClick = () => {
		this.i.props.onSearch && this.i.props.onSearch(this.i.props.value);
	};
	mySearch = (e) => {
		if (e.keyCode === 13) {
			this.i.props.onSearch && this.i.props.onSearch(this.i.props.value);
		}
	};

	render() {
		let { isViewMode, className, onBlur, showStar, value, type, disabled, ...others } = this.props;
		let flag = false;
		if (type === 'search') {
			flag = true;
			type = 'text';
		}else if(type === 'password'){
			let {title, ...otherss} = others 
			others = otherss
		}
		if (value === undefined || value === null) {
			value = '';
		}
		if (others.hasOwnProperty('maxlength') && others.maxlength > 0) {
			value = String(value).slice(0, others.maxlength);
		}

		return isViewMode ? (
			<span>{value}</span>
		) : (
			<div className={`u-form-control-wrapper`}>
				{showStar ? <span className="form-control-required-tag">*</span> : ''}
				<FormControl
					ref={(i) => (this.i = i)}
					className={`nc-input ${className}`}
					onBlur={this.handleBlur}
					value={value}
					type={type}
					onKeyUp={this.mySearch}
					disabled = {disabled}
					{...others}
					onFocus={this.handleFocus}
					onMouseDown={() => { this.mouseDown = true; }}
					onMouseUp={() => { this.mouseDown = false; }}
				/>
				{flag ? (
					<div className="u-form-control-search-text">
						{' '}
						{value.length && !disabled ? <i onClick={this.closeClick} className="iconfont icon-qingkong " /> : null}{' '}
						<i onClick={this.searchClick} className="iconfont icon-sousuo" />
					</div>
				) : null}
			</div>
		);
	}
}
