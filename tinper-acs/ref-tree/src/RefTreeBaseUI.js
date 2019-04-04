import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { refValParse } from './utils';
import RefCoreError from 'ref-core/lib/refs/RefCoreError';
import RefCoreTree from 'ref-core/lib/refs/RefCoreTree';
import RefCoreSearch from 'ref-core/lib/refs/RefCoreSearch';
import RefCoreButton from 'ref-core/lib/refs/RefCoreButton';
import  'ref-core/lib/refs/refcoreerror.css';
import  'ref-core/lib/refs/refcoretree.css';
import  'ref-core/lib/refs/refcoresearch.css';
import  'ref-core/lib/refs/refcorebutton.css';
import { Loading,Modal } from 'tinper-bee'
import './index.less';
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
  checkedArray: PropTypes.array,
  treeData: PropTypes.array,//接收树的数据
};
const defaultProps = {
  title: '弹窗标题',
	searchable: false, //  是否应用搜索 默认 false,
	multiple: false, //  默认单选
	showLine: false, //  默认单选
	defaultExpandAll: true,  // 数默认展开
	checkStrictly: false,
	checkedArray: [], //  指定已选择数据id
	lazyModal: false,
	emptyBut: false,
	onCancel: noop,
	onSave: noop,
  lang: 'zh_CN',
  nodeDisplay:'{refname}',
  treeData:[],
}
class RefTreeBaseUI extends Component {
  constructor(props) {
    super(props);
    const { checkedArray, valueField,showLoading} = props;
    this.state = {
      selectedArray: checkedArray || [], //  记录保存的选择项
      checkedKeys: checkedArray.map(item => {
        return item[valueField];
      }),
      onSaveCheckItems:[],
      showLoading: showLoading
    };

    this.treeData = props.treeData;
  }
  // shouldComponentUpdate(nextProps, nextState){
	// 	return !is(nextState, this.state) || nextProps.showModal !== this.props.showModal;
	// }
  componentWillReceiveProps(nextProps) {
		let { strictMode,checkedArray,valueField } = nextProps;
		//严格模式下每次打开必须重置数据
		if( nextProps.showModal && !this.props.showModal ){ //正在打开弹窗
			if( strictMode || !this.treeData.length ) {
				//开启严格模式 
				// this.setState({
				// 	showLoading: true
				// },() => {
				// 	this.initComponent();
        // });
        this.initComponent();
			}
			//20190124因為不再走constructor，导致checkedKeys和selectedArray不一致
			if(checkedArray.length>0){
				this.setState({
					selectedArray: checkedArray || [], //  记录保存的选择项
					checkedKeys: checkedArray.map(item=>{
						return item[valueField];
					}),
				})
			}
		}
  }

  initComponent = () => {
    let {matchData=[],checkedArray,value,treeData} = this.props;
    //当有已选值，不做校验，即二次打开弹出层不做校验
    let valueMap = refValParse(value)
		if(checkedArray.length != 0 || !valueMap.refpk) return;
    if(matchData.length>0){
			this.setState({
        checkedArray: matchData,
        selectedArray: matchData,
        showLoading: false,
        checkedKeys: matchData.map(item=>{
          return item.refpk;
        })
      });
		}else{
			//当时不使用 matchUrl 做校验时，直接使用默认数护具标记选项，但数据完整性会变弱。
			this.setState({
				checkedArray: [valueMap],
				selectedArray: [valueMap],
				showLoading: false,
				checkedKeys: valueMap.refpk.split(',')
			});
		}
  }
  
  //  tree EventHandler
	onCheck(selectedKeys, event) {
		const { multiple } = this.props;
		if(!multiple){
			//单选
			this.setState({
				selectedArray: [event.node.props.attr],
				checkedKeys: [event.node.props.eventKey],
				onSaveCheckItems: [event.node.props.attr]
			});
		}else{
			let { valueField } = this.props;
			let allProcessCheckedArray = [].concat(this.state.selectedArray);
			let key = event.node.props.attr[valueField];
			let currentNode = event.node.props.attr;
			if (event.checked) {
				//新增操作
				allProcessCheckedArray.push(currentNode)
			} else {
				//删除操作
				allProcessCheckedArray = allProcessCheckedArray.filter(item=>{
				  return item[valueField] !== key
				})
			}
			this.setState({
				selectedArray: allProcessCheckedArray,
				checkedKeys: selectedKeys,
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
  onSearchClick = (value) => {
		this.props.getRefTreeData(value);
	};
	onSearchChange = (value) => {
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
    } = this.props;
    this.treeData = treeData;
    const { checkedKeys } = this.state;
    if(checkedKeys.length === 0) emptyBut = false; //20190226没有选中数据清空按钮不展示
    return (
      <Modal
        show={showModal}
        size="sm"
        className={`${className} ref-core  ref-core-modal ref-tree`}
        backdrop={backdrop}
        onHide={() => this.onClickBtn('cancel')}
      >
        <Loading show={showLoading} showBackDrop={true} loadingType="line" displayType={"block"} />
          <Modal.Header closeButton>
            <Modal.Title > {title} </Modal.Title>
          </Modal.Header >

          <Modal.Body>
            <RefCoreSearch
              show={searchable}
              onSearch={this.onSearchClick}
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
                  checkable={multiple}
                  multiple={multiple}
                  onCheck={this.onCheck.bind(this)}
                  onSelect={this.onSelect.bind(this)}
                  onDoubleClick={this.onDoubleClick.bind(this)}
                  checkedKeys={checkedKeys}
                  selectedKeys={checkedKeys}
                  checkStrictly={checkStrictly}
                  showLine={showLine}
                  loadData={lazyModal ? this.onLoadData.bind(this) : null}
                /> :
                <RefCoreError show={!Boolean(this.treeData.length)} language={lang} />
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
