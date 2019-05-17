import React, { Component } from 'react';
import Tree from 'bee-tree';
import RefCoreSearch from 'ref-core/lib/refs/RefCoreSearch';
const TreeNode = Tree.TreeNode;
export default class leftTree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expandedKeys: [],//记录展开节点
			searchValue: '',//记录搜索内容
			autoExpandParent: true,
			dataList: [],
		}
		this.onTreeSelect = this.onTreeSelect.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		let { valueField } = this.props;
		const dataList = [];
		const generateList = (data) => {
			for (let i = 0; i < data.length; i++) {
				const node = data[i];
				const key = node[valueField];
				const title = node.refname;
				dataList.push({
					key,
					title
				});
				if (node.children) {
					generateList(node.children, node.key);
				}
			}
		};
		generateList(nextProps.data);
		this.setState({
			dataList
		})
	}


	onExpand = (expandedKeys) => {
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
	}
	onTreeSelect(selectedKeys, e) {
		let { valueField } = this.props;
		if (selectedKeys.length === 0) {
			return
		}
		///if(e.node.props.isLeaf){
		var fullInfo = {};
		var { data } = this.props
		const loopSearch = (arr, key) => {
			if (!arr) { return }
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][valueField] == key) {
					fullInfo = arr[i];
				} else {
					loopSearch(arr[i].children, key)
				}
			}
		}
		loopSearch(data, selectedKeys[0])
		this.props.handleTreeSelect(fullInfo)
		// }
	}
	onChange = (value) => {
		const expandedKeys = [];
		var { dataList } = this.state
		var { data } = this.props
		dataList.forEach((item) => {
			if (item.title.indexOf(value) > -1) {
				expandedKeys.push(this.getParentKey(item.key, data));
			}
		});
		const uniqueExpandedKeys = [];
		expandedKeys.forEach((item) => {
			if (item && uniqueExpandedKeys.indexOf(item) === -1) {
				uniqueExpandedKeys.push(item);
			}
		});
		this.setState({
			expandedKeys: uniqueExpandedKeys,
			searchValue: value,
			autoExpandParent: true,
		});
		if (!value) {
			this.setState({
				expandedKeys: [],
				autoExpandParent: false,
			});
		}

	}
	getParentKey = (key, tree) => {
		
		let { valueField } = this.props;
		let parentKey;
		for (let i = 0; i < tree.length; i++) {
			const node = tree[i];
			if (node.children) {
				if (node.children.some(item => item[valueField] === key)) {
					parentKey = node[valueField];
				} else if (this.getParentKey(key, node.children)) {
					parentKey = this.getParentKey(key, node.children);
				}
			}
		}
		return parentKey;
	};
	render() {
		const {
			searchValue,
			expandedKeys,
			autoExpandParent
		} = this.state;
		
		var { data = [], valueField,lang,nodeDisplay = `{refname}`,defaultExpandAll} = this.props;
		const loop = data => data.map((item) => {
			let text = '';
			if (typeof nodeDisplay === 'function') {
				text = nodeDisplay(item);
			  } else {
				text = nodeDisplay.format(item);
			  }
			// if(Object.prototype.toString.call(item.refname) !== "[object String]") item.refname = '';//refname不存在
			const index =text.search(searchValue);
			const beforeStr =text.substr(0, index);
			const afterStr =text.substr(index + searchValue.length);
			const title = index > -1 ? (
				<span>
					{beforeStr}
					<span className={'uTreeSearchableFilter'}>{searchValue}</span>
					{afterStr}
				</span>
			) : <span>{text}</span>;
			if (item.children && item.children.length > 0) {
				return (
					<TreeNode key={item[valueField]} title={title}>
						{loop(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode key={item[valueField]} title={title} isLeaf={true} />;
		});
		return (
			<div className={'leftTreeWrap'}>
				<RefCoreSearch
					show={true}
					onChange={this.onChange}
					language={lang}
				/>
				<div className={'leftTreeStyle'}>
					<Tree
						checkStrictly={true}
						multiple={false}
						onExpand={this.onExpand}
						defaultExpandAll={defaultExpandAll}
						expandedKeys={expandedKeys}
						autoExpandParent={autoExpandParent}
						onSelect={this.onTreeSelect}
					>
						{loop(data)}
					</Tree>
				</div>
			</div>
		);
	}
}
