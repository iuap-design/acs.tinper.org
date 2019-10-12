import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { refValParse,deepTraversal } from './utils';
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
  onTreeSelecting:PropTypes.func,
  isLocalSearch: PropTypes.bool, //  默搜索是否是本地
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
  getRefTreeData:()=>{},
  onTreeSelecting:()=>{},
  isLocalSearch:false,//默认是true
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
      showLoading: showLoading,
      searchValue:'',//20190527新增搜索
    };
    this.flatTreeData = new Map();
    this.currentParentChildrenArr = new Set();
  }
 
  componentWillReceiveProps(nextProps) {
    //重新渲染数据获取selectedArray,因为取消操作重置了selectedArray，需要初始化
    if(!shallowEqual(nextProps.treeData,this.props.treeData) && !nextProps.checkStrictly){
      //非严格模式需要平铺数据
      this.flatTreeData = new Map();
      this.deepTraversal(nextProps.treeData,null,nextProps.valueField)
    }
    
    if(nextProps.showModal)this.initComponent(nextProps);
    
  }

  deepTraversal = (treeData,parentKey=null,valueField) => {
    let dataCopy = [].concat(treeData);
    if(Array.isArray(dataCopy)){
      for (let i=0, l=dataCopy.length; i<l; i++) {
            let { refname, children,...props} = dataCopy[i];
            let key = dataCopy[i][valueField];
            let dataCopyI = new Object(),
            isLeaf = children ? false : true;
            dataCopyI = Object.assign(dataCopyI,{
              key,
              refname,
              parentKey : parentKey || null,
              isLeaf
          },props);
        this.flatTreeData.set(key,dataCopyI); // 取每项数据放入一个新数组
        if (Array.isArray(children) && children.length > 0){
          // 若存在children则递归调用，把数据拼接到新数组中，并且删除该children
          this.deepTraversal(children, key,valueField);
        }
      }
    }
  }

  getParentKeys = (key) =>{
    let data = this.flatTreeData.get(key);
    if(data.parentKey){
      this.currentParentChildrenArr.add(data.parentKey);//加入当前节点的父节点
      let parentData = this.flatTreeData.get(data.parentKey) 
      if(parentData){
        this.getParentKeys(data.parentKey);//去找父节点的父级
      }
    }
  }
  
  initComponent = (props) => {
    let {matchData=[],value,valueField,checkStrictly} = props;
    this.setState({
      searchValue:'',//清空搜索
      selectedArray: matchData,
      showLoading: false,
      checkedKeys: matchData.map(item=>{
        return item[valueField];
      })
    });
  }
  
  //  tree EventHandler
	//  多选才走这里
  onCheck(selectedKeys, event) {
    const { multiple } = this.props;
    if (!multiple) {
      //单选
      this.setState({
        selectedArray: [event.node.props.attr],
        checkedKeys: [event.node.props.eventKey],
        onSaveCheckItems: [event.node.props.attr]
      },()=>{
        this.props.onTreeSelecting([event.node.props.attr],[event.node.props.eventKey])
      });
    } else {
      //多选
      let { valueField, checkStrictly } = this.props;
      let allProcessCheckedArray = [].concat(this.state.selectedArray);
      let newCheckedKeys = this.state.checkedKeys
      let key = event.node.props.attr[valueField];
      let currentNode = event.node.props.attr;
      
      if (!checkStrictly) {
        //下面涉及到checkStricly=false/true，涉及删除会多个删除，新增会新增多个
        if (event.checked) {
          //新增操作，checkNodes会平铺所有的，没问题
          event.checkedNodes.forEach(item => {
            let curKey = item.props.attr[valueField];
            if (newCheckedKeys.indexOf(curKey) < 0) {
              allProcessCheckedArray.push(item.props.attr);
              newCheckedKeys.push(item.props.attr[valueField])
            }
          });
        } else {
          //删除操作，父节点，删除当前，并且删除children；叶子节点，只删除当前就好
          //往上找父节点删除
          this.currentParentChildrenArr = new Set();
          this.currentParentChildrenArr.add(key);//节点本身
          this.getParentKeys(key);
          //往下找子节点删除
          if(event.node.props.attr.children && event.node.props.attr.children.length){
              function loop(data,arr){
                data.forEach(item=>{
                  arr.add(item[valueField])
                  if(item.children && item.children.length){
                    loop(item.children,arr);
                  }
                })
              }
              loop(event.node.props.attr.children,this.currentParentChildrenArr);
          }
          this.currentParentChildrenArr.forEach(key=>{
            allProcessCheckedArray = allProcessCheckedArray.filter(item => {
              return item[valueField] !== key
            });
            if (newCheckedKeys.indexOf(key) > -1) newCheckedKeys.splice(newCheckedKeys.indexOf(key), 1);
          })
        }
        
      } else {
        //这里是checkStrictly为true的时候，增删都是一个
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
      },()=>{
        this.props.onTreeSelecting(allProcessCheckedArray,newCheckedKeys)
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
			},()=>{
        this.props.onTreeSelecting([event.node.props.attr],selectedKeys)
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
			},()=>{
        this.props.onTreeSelecting(arr,selectedKeys)
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
			},()=>{
        this.props.onTreeSelecting(onSaveCheckItems,selectedKeys)
      });
		}
	}
	onSearch = (searchValue) => {
    if(this.props.isLocalSearch){
      this.setState({
        searchValue
      })
    }else{
      this.props.getRefTreeData(searchValue.trim());
    }
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
      isLocalSearch,
      treeNodeDisabledKey,
      treeProps={},
      footerBtnDom='',
    } = this.props;
    const { checkedKeys,searchValue } = this.state;
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
                  {...treeProps}
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
                  searchValue={isLocalSearch?searchValue:''}
                  treeNodeDisabledKey={treeNodeDisabledKey}
                /> :
                <RefCoreError show={!Boolean(treeData.length)} language={lang} />
            }
          </Modal.Body>
          <Modal.Footer className={'ref-core-modal-footer'}>
            <RefCoreButton language={lang} onClickBtn={this.onClickBtn} buttons={buttons} emptyBut={emptyBut} footerBtnDom={footerBtnDom}/>
          </Modal.Footer>
      </Modal>
    );
  }
}
RefTreeBaseUI.propTypes = propTypes;
RefTreeBaseUI.defaultProps = defaultProps;
export default RefTreeBaseUI;
