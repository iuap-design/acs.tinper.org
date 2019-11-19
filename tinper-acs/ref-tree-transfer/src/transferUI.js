import React, { Component } from 'react';
import Transfer from 'bee-transfer';
import Icon from 'bee-icon'
export default class TransferDiv extends Component {
	constructor(props) {
		super(props)
		this.state = {
			transferData: [],//全部
			targetKeys: props.targetKeys,//右边框
			selectedKeys: [],//标记选中
			sourceDesc: {},//记录左边信息
			targetDesc: {},//记录右边信息
			buttons: this.props.buttons
		}
		this.allTransferSave = this.allTransferSave.bind(this)
		this.allTransferCancel = this.allTransferCancel.bind(this)
		this.TransferSelectUp = this.TransferSelectUp.bind(this)
		this.TransferSelectDown = this.TransferSelectDown.bind(this)
		this.downTransferSelectDown = this.downTransferSelectDown.bind(this)
		this.upTransferSelectUp = this.upTransferSelectUp.bind(this)
	}
	componentDidMount() {
		var { transferData, targetKeys } = this.props
		this.setState({ transferData, targetKeys });
	}
	componentWillReceiveProps(nextProps) {
		var { transferData,targetKeys } = nextProps
		this.setState({ transferData,targetKeys });
	}

	filterOption = (inputValue, option) => {
		return option.title.indexOf(inputValue) > -1;
	}
	handleChange = (targetKeys) => {
		this.setState({ targetKeys });
		this.props.setTargetKeys(targetKeys)
	}
	allTransferSave() {
		var { transferData } = this.state
		var tempKey = transferData.map(v => v.key)
		this.setState({
			targetKeys: tempKey,
		});
		this.props.setTargetKeys(tempKey)
	}
	allTransferCancel() {
		this.setState({
			targetKeys: []
		});
		this.props.setTargetKeys([])
	}
	TransferSelectUp() {
		let { targetKeys, selectedKeys } = this.state
		let selectedTargetKeys = []
		targetKeys.forEach((v, i) => {
			selectedKeys.forEach((v2, i2) => {
				if (v2 == v) {
					selectedTargetKeys.push({ key: v, index: i })
				}
			})
		})
		if (selectedTargetKeys.length == 1) {
			this.scopeupRecord(targetKeys, selectedTargetKeys[0].index)
			this.setState({
				targetKeys
			});
		}
	}
	upTransferSelectUp() {
		let { targetKeys, selectedKeys } = this.state
		let selectedTargetKeys = []
		targetKeys.forEach((v, i) => {
			selectedKeys.forEach((v2, i2) => {
				if (v2 == v) {
					selectedTargetKeys.push({ key: v, index: i })
				}
			})
		})
		// console.log(targetKeys, selectedKeys, selectedTargetKeys)
		if (selectedTargetKeys.length == 1) {
			this.scopeupupRecord(targetKeys, selectedTargetKeys[0].index)
			this.setState({
				targetKeys
			});
		}
	}
	swapItems(arr, index1, index2) {
		arr[index1] = arr.splice(index2, 1, arr[index1])[0];
		return arr;
	};
	scopeupRecord(arr, $index) {
		if ($index == 0) {
			return;
		}
		this.swapItems(arr, $index, $index - 1);
	};
	// 下移
	scopedownRecord(arr, $index) {
		if ($index == arr.length - 1) {
			return;
		}
		this.swapItems(arr, $index, $index + 1);
	};
	scopedowndownRecord(arr, $index) {
		if ($index == arr.length - 1) {
			return;
		}
		this.swapItems(arr, $index, arr.length - 1);
	};
	scopeupupRecord(arr, $index) {
		if ($index == 0) {
			return;
		}
		this.swapItems(arr, $index, 0);
	};
	TransferSelectDown() {
		let { targetKeys, selectedKeys } = this.state
		let selectedTargetKeys = []
		targetKeys.forEach((v, i) => {
			selectedKeys.forEach((v2, i2) => {
				if (v2 == v) {
					selectedTargetKeys.push({ key: v, index: i })
				}
			})
		})
		// console.log(targetKeys, selectedKeys, selectedTargetKeys)
		if (selectedTargetKeys.length == 1) {
			this.scopedownRecord(targetKeys, selectedTargetKeys[0].index)
			this.setState({
				targetKeys
			});
		}
	}
	downTransferSelectDown() {
		let { targetKeys, selectedKeys } = this.state
		let selectedTargetKeys = []
		targetKeys.forEach((v, i) => {
			selectedKeys.forEach((v2, i2) => {
				if (v2 == v) {
					selectedTargetKeys.push({ key: v, index: i })
				}
			})
		})
		// console.log(targetKeys, selectedKeys, selectedTargetKeys)
		if (selectedTargetKeys.length == 1) {
			this.scopedowndownRecord(targetKeys, selectedTargetKeys[0].index)
			this.setState({
				targetKeys
			});
		}
	}
	onSelectChange(sourceSelectedKeys, targetSelectedKeys) {
		let { valueField } = this.props;
		var tempSourceKey = '', tempTargetKey = ''
		if (sourceSelectedKeys.length > 0) {
			var tempSourceKey = sourceSelectedKeys[sourceSelectedKeys.length - 1];
		}
		if (targetSelectedKeys.length > 0) {
			var tempTargetKey = targetSelectedKeys[targetSelectedKeys.length - 1];
		}
		var { transferData } = this.state
		var sourceDesc = transferData.filter((v, k) => v[valueField] === tempSourceKey)
		var targetDesc = transferData.filter((v, k) => v[valueField] === tempTargetKey)
		this.setState({
			sourceDesc: sourceDesc[0] || {},
			targetDesc: targetDesc[0] || {},
			selectedKeys: sourceSelectedKeys.concat(targetSelectedKeys)
		})
	}
	render() {
		const noDataDisplay = (<div>无数据</div>);
		var { transferData, sourceDesc, targetDesc, selectedKeys, targetKeys } = this.state;
		var { displayField, valueField, isHasSearch, searchPlaceholder="搜索",
			notFoundContent= noDataDisplay,transferProps
	    } = this.props
		var tempTransferData = transferData.filter(v => typeof (v) == 'object').map((v, k) => {
			v.key = v[valueField]
			if (typeof displayField === 'function') {
				v.title = displayField(v);
			} else {
				v.title = displayField.format(v);
			}
			return v
		})

		var { textOption = {} } = this.props
		var { leftTransferText = '', rightTransferText = '', } = textOption
		var { leftInfo = [], rightInfo = [] } = textOption

		var leftInfoList = leftInfo.map((v, k) => {
			if (v.text.length == 0) { return }
			return (<div key={k}>{v.text}:{sourceDesc[v.key]}</div>)
		})
		var rightInfoList = rightInfo.map((v, k) => {
			if (v.text.length == 0) { return }
			return (<div key={k}>{v.text}:{targetDesc[v.key]}</div>)
		})

		return (
			<div className={'transferDivWrap'}>
				{
					(!!leftTransferText || !!rightTransferText) &&(
						<div className={'topInfo'}>
							<div className={'topLeftInfo'} >{leftTransferText}</div>
							<div className={'topRightInfo'}>{rightTransferText}</div>
						</div>
					)
				}
				
				<div className={'transferWrap'} style={!leftTransferText&&!rightTransferText?{marginTop:15}:{}}>
					<Transfer
						showSearch={isHasSearch ? false : true}
						dataSource={tempTransferData}
						onSelectChange={this.onSelectChange.bind(this)}
						selectedKeys={selectedKeys}
						filterOption={this.filterOption}
						targetKeys={targetKeys}
						onChange={this.handleChange}
						render={item => item.title}
						searchPlaceholder={searchPlaceholder}
						notFoundContent={notFoundContent}
						{...transferProps}
					/>


					<button onClick={this.allTransferCancel} className={'allTransferLeftBtnStyle'}><Icon type="uf-2arrow-left" /></button>
					<button onClick={this.allTransferSave} className={'allTransferRightBtnStyle'}><Icon type="uf-2arrow-right" /></button>
				</div>
				{
					(leftInfoList.length>0|| rightInfoList>0) &&(
						<div className={'buttomInfoWrap'}>
							<div className={'leftInfoStyle'}>
								{leftInfoList}
							</div>
							<div className={'rightInfoStyle'}>
								{rightInfoList}
							</div>
						</div>
					)
				}
				
				<button onClick={this.upTransferSelectUp} className={'allTransferTopUpBtnStyle'}><Icon type="uf-2arrow-up" /></button>
				<button onClick={this.downTransferSelectDown} className={'allTransferBottomDownBtnStyle'}><Icon type="uf-2arrow-down" /></button>
				<button onClick={this.TransferSelectUp} className={'allTransferTopBtnStyle'}><Icon type="uf-arrow-up" /></button>
				<button onClick={this.TransferSelectDown} className={'allTransferBottomBtnStyle'}><Icon type="uf-arrow-down" /></button>
			</div>
		);
	}
}