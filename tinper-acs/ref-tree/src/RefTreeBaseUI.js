import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { refValParse } from './utils';
import RefCoreError from 'ref-core/lib/refs/RefCoreError';
import RefCoreTree from 'ref-core/lib/refs/RefCoreTree';
import RefCoreSearch from 'ref-core/lib/refs/RefCoreSearch';
import RefCoreButton from 'ref-core/lib/refs/RefCoreButton';
import Loading from 'bee-loading';
import Modal from 'bee-modal';
import shallowEqual from "shallowequal";
const noop = () => {
};
const propTypes = {
  title: PropTypes.string,
  backdrop: PropTypes.bool,
  className: PropTypes.string,
  showLoading: PropTypes.bool,
  searchable: PropTypes.bool, //  是否应用搜索 默认 false,
  valueField: PropTypes.string,
  checkStrictly: PropTypes.bool,
  showLine: PropTypes.bool,
  lazyModal: PropTypes.bool,
  showModal:PropTypes.bool,
  lang: PropTypes.string,
  defaultExpandAll: PropTypes.bool,  // 数默认展开
  nodeDisplay:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  buttons:PropTypes.object,
  emptyBut: PropTypes.bool, //清空按钮
  getRefTreeData: PropTypes.func,
  multiple: PropTypes.bool, //  默认单选
  treeData: PropTypes.array,//接收树的数据
  onLoadData:PropTypes.func,
};
const defaultProps = {
  title: '弹窗标题',
	searchable: false, //  是否应用搜索 默认 false,
	multiple: false, //  默认单选
	showLine: false, //  默认单选
	defaultExpandAll: true,  // 数默认展开
	checkStrictly: true,
	lazyModal: false,
	emptyBut: false,
	onCancel: noop,
	onSave: noop,
  lang: 'zh_CN',
  nodeDisplay:'{refname}',
  valueField:'refpk',
  treeData:[],
  onLoadData:()=>{},
  getRefTreeData:()=>{}
}
class RefTreeBaseUI extends Component {
  constructor(props) {
    super(props);
    const { matchData=[], valueField,showLoading} = props;
    this.state = {
      selectedArray: matchData || [], //  记录保存的选择项
      checkedKeys: matchData.map(item => {
        return item[valueField];
      }),
      onSaveCheckItems:[],
      showLoading: showLoading
    };
  }
 
  componentWillReceiveProps(nextProps) {
    //重新渲染数据获取selectedArray
    if(!shallowEqual(nextProps.matchData,this.props.matchData)){
      this.initComponent(nextProps);
    }
    
  }

  initComponent = (props) => {
    let {matchData=[],value,valueField} = props;
    this.setState({
      selectedArray: matchData,
      showLoading: false,
      checkedKeys: matchData.map(item=>{
        return item[valueField];
      })
    });
  }
  
  //  tree EventHandler
	//  tree EventHandler
  onCheck(selectedKeys, event) {
    const { multiple } = this.props;
    if (!multiple) {
      //单选
      this.setState({
        selectedArray: [event.node.props.attr],
        checkedKeys: [event.node.props.eventKey],
        onSaveCheckItems: [event.node.props.attr]
      });
    } else {
      //多选
      //多选
      let { valueField, checkStrictly } = this.props;
      let allProcessCheckedArray = [].concat(this.state.selectedArray);
      let newCheckedKeys = this.state.checkedKeys
      let key = event.node.props.attr[valueField];
      let currentNode = event.node.props.attr;
      if (!checkStrictly) {
        //下面涉及到checkStricly=false/true，涉及删除会多个删除，新增会新增多个
        if (event.checked) {
          //新增操作
          event.checkedNodes.forEach(item => {
            let curKey = item.props.attr[valueField];
            if (newCheckedKeys.indexOf(curKey) < 0) {
              allProcessCheckedArray.push(item.props.attr);
              newCheckedKeys.push(item.props.attr[valueField])
            }
          });
        } else {
          if(!event.node.props.attr.children || event.node.props.attr.children.length === 0){
              //删除子节点操作，涉及删除会多个删除
              allProcessCheckedArray = allProcessCheckedArray.filter(item => {
                return item[valueField] !== key
              });
              if (newCheckedKeys.indexOf(key) > -1) newCheckedKeys.splice(newCheckedKeys.indexOf(key), 1);
              //下面是多个时候
              event.halfCheckedKeys.forEach(parentKeys => {
                allProcessCheckedArray = allProcessCheckedArray.filter(item => {
                  return item[valueField] !== parentKeys
                });
                if (newCheckedKeys.indexOf(parentKeys) > -1) newCheckedKeys.splice(newCheckedKeys.indexOf(parentKeys), 1);
              })
          }else{
            //删除父节点，涉及遍历children节点，这里暂时不添加
            return false;
          }
        }
      } else {
        if (event.checked) {
          //新增操作
          allProcessCheckedArray.push(currentNode);
          if (newCheckedKeys.indexOf(key) < 0) {
            newCheckedKeys.push(key)
          }
        } else {
          //删除操作
          allProcessCheckedArray = allProcessCheckedArray.filter(item => {
            return item[valueField] !== key
          });
          if (newCheckedKeys.indexOf(key) > -1) newCheckedKeys.splice(newCheckedKeys.indexOf(key), 1);

        }
      }
      this.setState({
        selectedArray: allProcessCheckedArray,
        checkedKeys: newCheckedKeys,
        onSaveCheckItems: allProcessCheckedArray,
      });

    }
  }

	onDoubleClick(selectedKeys, event) {
		const item = event.node.props;
		const arr = [{ ...item.attr, refpk: item.eventKey, id: item.eventKey }]
		this.setState({
			selectedArray: arr,
			checkedKeys: [item.eventKey]
		}, () => {
			this.onClickBtn('save')
		})
	}
  //单选
	onSelect(selectedKeys, event) {
		const { checkAllChildren, multiple } = this.props;
		const eventKey = event.node.props.eventKey
		let { onSaveCheckItems } = this.state
		let ishaskey = false
		let keyIndex;
		if(multiple) return;
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
		}
	}
	onSearch = (value) => {
		this.props.getRefTreeData(value);
	};

  onClickBtn = (type) => {
    const { onCancel, onSave } = this.props;
    switch (type) {
      case 'save':
        onSave(this.state.selectedArray);
        break;
      case 'cancel':
        this.setState({
          selectedArray: [],
          checkedKeys: [],
          onSaveCheckItems: [],//20190124不保存那么选中的数据清空
        }, () => {
          onCancel();
        });
        break;
      case 'clear':
        this.setState({
          selectedArray: [],
          checkedKeys: [],
        }, () => {
        });
        break;
      default:
        this.setState({ selectedArray: [] }, () => {
        });
    }
  };
  render() {
    let {
      title,
      backdrop,
      className,
      showLoading,
      searchable,
      valueField,
      checkStrictly,
      showLine,
      lazyModal,
      showModal,
      lang,
      defaultExpandAll,
      nodeDisplay = "{refname}",
      buttons,
      emptyBut,
      multiple,
      treeData,
      theme= 'ref-red',
      modalProps={},
    } = this.props;
    const { checkedKeys } = this.state;
    if(checkedKeys.length === 0) emptyBut = false; //20190226没有选中数据清空按钮不展示
    return (
      <Modal
        show={showModal}
        size="sm"
        className={`${theme} ${className} ref-core  ref-core-modal ref-tree`}
        backdrop={backdrop}
        onHide={() => this.onClickBtn('cancel')}
        autoFocus={false}
        {...modalProps}
      >
          <Modal.Header closeButton>
            <Modal.Title > {title} </Modal.Title>
          </Modal.Header >

          <Modal.Body ref={(ref)=>this.modalRef = ref}>
            <Loading  container={this.modalRef}  show={showLoading} />
            <RefCoreSearch
              show={searchable}
              onSearch={this.onSearch}
              onChange={this.onSearch}
              language={lang}
            />
            {
              treeData.length ?
                <RefCoreTree
                  show={Boolean(treeData.length)}
                  nodeKeys={(item) => item[valueField]}
                  displayField={nodeDisplay}
                  data={treeData}
                  defaultExpandAll={lazyModal ? false : defaultExpandAll}
                  checkable={multiple}
                  multiple={multiple}
                  onCheck={this.onCheck.bind(this)}
                  onSelect={this.onSelect.bind(this)}
                  onDoubleClick={this.onDoubleClick.bind(this)}
                  checkedKeys={checkedKeys}
                  selectedKeys={checkedKeys}
                  checkStrictly={checkStrictly}
                  showLine={showLine}
                  lazyModal={lazyModal}
                  loadData={lazyModal ? this.props.onLoadData: null}
                /> :
                <RefCoreError show={!Boolean(treeData.length)} language={lang} />
            }
          </Modal.Body>
          <Modal.Footer className={'ref-core-modal-footer'}>
            <RefCoreButton language={lang} onClickBtn={this.onClickBtn} buttons={buttons} emptyBut={emptyBut} />
          </Modal.Footer>
      </Modal>
    );
  }
}
RefTreeBaseUI.propTypes = propTypes;
RefTreeBaseUI.defaultProps = defaultProps;
export default RefTreeBaseUI;
