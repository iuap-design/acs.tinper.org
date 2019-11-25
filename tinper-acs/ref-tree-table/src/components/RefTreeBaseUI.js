import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import Loading from 'bee-loading';
import RefCoreError from 'ref-core/lib/refs/RefCoreError';
import RefCoreTree from 'ref-core/lib/refs/RefCoreTree';
import RefCoreSearch from 'ref-core/lib/refs/RefCoreSearch';
const noop = () => {
};
const propTypes = {
  title: PropTypes.string,
  multiple: PropTypes.bool, //  默认单选
  showLine: PropTypes.bool,
  defaultExpandAll: PropTypes.bool,  // 数默认展开
  checkStrictly: PropTypes.bool,
  checkedArray: PropTypes.array, //  指定已选择数据id
  checkedTreeArray: PropTypes.array, //  指定已选树择数据id
  treeData: PropTypes.array, //  指定已选择数据id
  lazyModal: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  lang: PropTypes.string,
  //重命名属性
  searchable: PropTypes.bool, //  是否应用搜索 默认 false,
  onTreeChangeFromBaseUI: PropTypes.func,//树操作的时候节点选中返回
  onTreeSearch:PropTypes.func, //搜索
};
const defaultProps = {
  title: '弹窗标题',
  searchable: false, //  是否应用搜索 默认 false,
  multiple: false, //  默认单选
  showLine: false, //  默认单选
  defaultExpandAll: true,  // 数默认展开
  checkStrictly: false,
  checkedArray: [], //  指定已选择数据id
  checkedTreeArray:[],
  treeData:[],
  lazyModal: false,
  onCancel: noop,
  onSave: noop,
  lang: 'zh_CN',
  onTreeChangeFromBaseUI: ()=>{},
  onTreeSearch: () =>{},
}

class RefTreeBaseUI extends Component {
  constructor(props) {
    super(props);
    const { checkedTreeArray, multiple, checkStrictly, 
      defaultExpandAll, valueField } = props;
    this.state = {
      selectedArray: checkedTreeArray || [], //  记录保存的选择项
      defaultExpandAll,
      multiple,
      checkStrictly,
      checkedKeys: checkedTreeArray.map(item => {
        return item[valueField];
      }),
      onSaveCheckItems: [],
      searchValue:'',//搜索
    };
    this.treeData = props.treeData || [];
    this.treeDataCache = {};
  }

  // shouldComponentUpdate(nextProps, nextState){
	// 	return !is(nextState, this.state) || nextProps.showModal !== this.props.showModal;
	// }
	componentWillReceiveProps(nextProps,nextState) {
    if(!is(nextState, this.state)){
      this.treeData = nextProps.treeData;
      this.setState({mustRender: Math.random()})
    }
	}

  onSearchChange = (value) => {
    if(this.props.isLocalSearch){
      this.setState({
        searchValue:value
      })
    }else{
      this.props.onTreeSearch(value);
    }
  };

  onSelectNode = (checkedArray) => {
    let { onTreeChangeFromBaseUI } = this.props;
    onTreeChangeFromBaseUI(checkedArray)
  }
  
  onCheck(selectedKeys, event) {
    const { multiple } = this.props;
    if (!multiple) {
      //单选
      this.setState({
        selectedArray: [event.node.props.attr],
        checkedKeys: [event.node.props.eventKey],
        onSaveCheckItems: [event.node.props.attr]
      }, () => {
        this.onSelectNode([event.node.props.attr]);
      });
    } else {
      this.setState({
        selectedArray: event.checkedNodes.map(item => {
          return item.props.attr;
        }),
        checkedKeys: selectedKeys,
        onSaveCheckItems: event.checkedNodes.map(item => {
          return item.props.attr;
        })
      }, () => {
        this.onSelectNode([event.node.props.attr]);
      });
    }
  }

  onDoubleClick(selectedKeys, event) {
    let item = event.node.props;
    let arr = [{ ...item.attr, refpk: item.eventKey, id: item.eventKey }]
    this.setState({
      selectedArray: arr,
      checkedKeys: [item.eventKey]
    }, () => {
      this.onSelectNode(arr)
    });
  }

  onSelect(selectedKeys, event) {
    const { checkAllChildren, multiple } = this.props;
    const eventKey = event.node.props.eventKey
    let { onSaveCheckItems } = this.state
    let ishaskey = false
    let keyIndex;
    // if (multiple) return;
    onSaveCheckItems.forEach((v, i) => {
      if (v.id == eventKey) {
        keyIndex = i
      }
      if (v.id == eventKey && v.checkAllchildren) {
        ishaskey = true
        return false
      }
    })
    if (ishaskey) {
      this.setState({
        checkedKeys: selectedKeys,
      });
      this.onSelectNode(this.state.selectedArray)
      return false
    }
    if (!checkAllChildren) {
      const arr = event.selectedNodes.map((item) => {
        return { ...item.props.attr, refpk: item.key, id: item.key }
      })
      this.setState({
        selectedArray: arr,
        checkedKeys: selectedKeys,
      });
      this.onSelectNode(arr);
    } else {
      let arr = {}
      event.selectedNodes.forEach((item) => {
        if (item.key == eventKey) {
          arr = { ...item.props.attr, refname: item.props.title, refpk: item.key, id: item.key }
        }
      })
      if (selectedKeys.indexOf(eventKey) > -1) {
        onSaveCheckItems.push(arr)
      } else {

        onSaveCheckItems.splice(keyIndex, 1)
      }

      this.setState({
        selectedArray: onSaveCheckItems,
        checkedKeys: selectedKeys,
        onSaveCheckItems: onSaveCheckItems
      });
      this.onSelectNode(onSaveCheckItems);
    }
  }

  render() {
    let {
      className,
      searchable,
      valueField,
      showLine,
      lazyModal,
      showLoading,
      lang,
      defaultExpandAll,
      nodeDisplay = "{refname}",
      treeNodeDisabledKey,
      treeNodeDisabledFunc,
      isLocalSearch,//从RefTreeTableBaseUI传入
    } = this.props;
    const { checkedKeys,  checkStrictly,searchValue} = this.state;
    return (
      
      <div
        className={`${className} ref-core ref-tree-table-base `}
      >
       	{/* <Loading show={showLoading} type={'fence'} displayType={"block"} ></Loading> */}
        <RefCoreSearch
            show={searchable}
            onSearch={this.onSearchChange}
            onChange={this.onSearchChange}
            language={lang}
          />
          {
            this.treeData.length ?
              <RefCoreTree
                show={Boolean(this.treeData.length)}
                nodeKeys={(item) => item[valueField]}
                displayField={nodeDisplay}
                data={this.treeData}
                defaultExpandAll={lazyModal ? false : defaultExpandAll}
                checkable={false}
                multiple={false}
                onCheck={this.onCheck.bind(this)}
                onSelect={this.onSelect.bind(this)}
                onDoubleClick={this.onDoubleClick.bind(this)}
                checkedKeys={checkedKeys}
                selectedKeys={checkedKeys}
                checkStrictly={checkStrictly}
                showLine={showLine}
                loadData={lazyModal ? this.props.onLoadData:null}
                searchValue={isLocalSearch?searchValue:null}
                treeNodeDisabledFunc={treeNodeDisabledFunc}
                treeNodeDisabledKey={treeNodeDisabledKey}
              /> :
              <RefCoreError show={!Boolean(this.treeData.length)} language={lang} />
          }
      </div>
    );
  }
}
RefTreeBaseUI.propTypes = propTypes;
RefTreeBaseUI.defaultProps = defaultProps;
export default RefTreeBaseUI;
