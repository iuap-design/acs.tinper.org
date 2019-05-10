import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable';
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';
import Trigger from 'rc-trigger';
import 'rc-trigger/assets/index.css';
import SliderPanel, { ComboItem } from './components/SliderPanel';
import ComboStore from './components/ComboStore';
import { refValParse } from './utils/utils';
import './utils/polyfill';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  displayField: PropTypes.oneOfType([PropTypes.string ,PropTypes.func]),
  valueField: PropTypes.oneOfType([PropTypes.string ,PropTypes.func]),
  sliderWidth : PropTypes.oneOfType([PropTypes.string ,PropTypes.number]),
  onClickItem: PropTypes.func,
  matchUrl: PropTypes.string,
  filterUrl: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  canClickGoOn: PropTypes.func,
  canInputGoOn: PropTypes.func,
  onSave: PropTypes.func,
  comboboxStoreData:PropTypes.array,
  storeData:PropTypes.array,
  onChangeFormControl: PropTypes.func,
  onFocusFormControl: PropTypes.func,
  onSelect: PropTypes.func,
};

const defaultProps = {
  className: '',
  children: '',
  value: '',
  displayField: '{refname}',
  valueField: 'refcode',
  style: {},
  canClickGoOn: () => { return true; },
  canInputGoOn: () => { return true; },
  onSave: () => { },
  comboboxStoreData:[],
  storeData:[],
  onChangeFormControl:()=>{},
  onFocusFormControl:()=>{},
  onSelect:()=>{},
};

class RefComboBoxBaseUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSlider: false,
      value: '',
      displayValue: props.displayValue?props.displayValue:'',
      activePage: 1,
      dataStore: {}, //缓存的数据
      slider: 'down',
      filterText: '',
      filterItems: [],
      filterDataMap: {},
      filtering: false,
      sliderSearchVal: '',//是input的实时输入值，也是搜索的搜索内容
      value: '',//是最终选择的数据项，必须是接口返回的数据，在进入与保存sliderSearchVal与value同步
      popupVisible: false,
      ...this.checkChildren(props) // {children, useSotre}
    };

  }
  componentDidMount() {
    let { value,storeData } = this.props;
    this.afterLoad(this.fixDataToMap(storeData))
    if (value) {
      let refValue = refValParse(value);
      this.setState({
        displayValue: refValue.refname,
        value: refValue.refpk,
        sliderSearchVal: refValue.refpk,
      });
    }
  }
  componentWillReceiveProps(nextProps){
    if(!is(nextProps.storeData,this.props.storeData)){
      let data = this.fixDataToMap(nextProps.storeData)
      this.afterLoad(data)
    }
    if(this.props.value !== nextProps.value){
      this.matchValues(nextProps);
    }
  }
  matchValues = (props) => {
    let { value } = props;
    if (value) {
      let refValue = refValParse(value);
      this.setState({
        displayValue: refValue.refname,
        value:refValue.refpk,
        sliderSearchVal: refValue.refpk,
      });
    }
    return;
  }
	/**
	 * 检查子节点 返回过滤后的节点列表
	 */
  checkChildren = (props) => {
    let porpsChildren = React.Children.toArray(props.children),
      useStore = false,
      children = [],
      $$children = fromJS([]);
    for (let i = 0; i < porpsChildren.length; i++) {
      let item = porpsChildren[i];
      if (item.type && item.type.name === 'ComboStore' || item.type && item.type.prototype === ComboStore.prototype) {
        useStore = true;
        children = [item];
        break;
      } else if (item.type && item.type.name === 'ComboItem' || item.type &&item.type.prototype === ComboItem.prototype ) {
        children.push(item);
      }
    }
    return { children, useStore }
  }

	/**
	 * 数据选择
	 */
  onClickItem = (item, e) => {
    const _this = this;
    let dataStore = this.state.dataStore;
    let { valueField, displayField, onClickItemInner} = _this.props;
    let value = item.dataset.value,
      displayValue = item.textContent,
      record = dataStore[value];
    if (record) {
      if (typeof valueField === 'string') {
        value = record[valueField];
      } else {
        value = valueField(record)
      }
      if (typeof displayField === 'string') {
        displayValue = displayField.format(record)
      } else {
        displayValue = displayField(record)
      }
    }
    _this.setState({
      displayValue: displayValue,
      filterText: displayValue,
      filtering: false,
      value: value,
      sliderSearchVal:value,
      popupVisible: false,
    }, () => {
      _this.handleChange(value);
      if (onClickItemInner && record) {
        onClickItemInner(record)
      }else{
        onClickItemInner(value,displayValue,e)
      }
    });
  }
  fixDataToMap = (data) => {
    if(!data || !data.length) return {};
    let { valueField = 'refpk' } = this.props;
    let dataMap = {};
    data.forEach(item => {
        dataMap[item[valueField]] = item
    })
    return dataMap;
  }
  afterLoad = (dataMap) => {
    this.setState({
      dataStore: dataMap
    });
  }
  handleChange = (values) => {
    const { onChange } = this.props;
    let { displayValue, value } = this.state;
    if (onChange) {
      onChange(JSON.stringify({
        refpk: value,
        refname: displayValue
      }));
    }
  }
  onChangeFormControl = (value) => {
    let {onChangeFormControl} = this.props;
    onChangeFormControl(value)
    if (this.state.filtering) {
      this.setState({
        filterText: value,
        sliderSearchVal:value,
        popupVisible:true
      });
    } else {
      this.setState({
        filterText: value,
        filtering: true,
        sliderSearchVal:value,
        popupVisible:true
      });
    }
   
  }
  onFocusFormControl = () =>{
    let {onFocusFormControl} = this.props;
    onFocusFormControl(this.state.popupVisible)
  }
  clearAll = (e) => {
    // window.event? window.event.cancelBubble = true : e.stopPropagation();
    this.setState({
      displayValue: '',
      filterText: '',
      value: '',
    },()=>{
      if (this.props.onClickItem) {
        this.props.onClickItem('')
      }
      this.setState({popupVisible:true})
      this.props.onChangeFormControl('');
    });
  }
  onPopupAlign = (e,value) =>{
    this.setState({sliderSearchVal:this.state.value});
  }
  onPopupVisibleChange = () => {
    let {onPopupVisibleChange = () =>{}} = this.props;
    onPopupVisibleChange(this.state.popupVisible,this.state.sliderSearchVal)
    if (this.state.filtering && this.state.popupVisible) {
      //手动输入不算数
      this.setState({
        popupVisible: !this.state.popupVisible,
        displayValue: '',
        filterText: '',
        sliderSearchVal: '',
        value: '',
        filterUrl: false,
      });
      this.props.onClickItemInner({});
    } else {
      this.setState({
        popupVisible: !this.state.popupVisible,
      })
    }

  }
  render() {
    const _this = this;
    let { className, sliderWidth, 
      style,
      theme='ref-red',
      comboboxStoreData=[],
      pageCount=1,
      currPageIndex=0,
      onSelect,
      loading,
      totalElements=0,
    } = this.props;
    let { showSlider, displayValue, children, useStore, slider,
      filtering, filterText
    } = this.state;
    let inputVal = filtering ? filterText.trim() : displayValue.trim();
    const builtinPlacements = {
      bottomLeft: {
        points: ['tl', 'tl'],
      },
    };
    let innerTrigger =
      <SliderPanel
        show={true}
        style={{
          width: sliderWidth || 'auto',
        }}
        slider={slider}
        onClickItem={_this.onClickItem}
      >  
        {useStore ?
          children.map((item) => {
            return React.cloneElement(item, {
              ...item.props,//对于comboboxstore传进来的参数
              reload: showSlider,
              comboboxStoreData,
              pageCount,
              currPageIndex,
              onSelect,
              loading,
              totalElements,
            });
          }) : children.map((item) => {
            return item;
          })}
      </SliderPanel>
    return (
      <div className={`${theme} ${className} ref-combobox`}
        style={{
          ...style,
          width: style.width || 200
        }}>
        <Trigger
          popupPlacement="bottomLeft"
          action={['click']}
          popupAlign={{
            overflow: {
              adjustX: 1,
              adjustY: 1,
            },
          }}
          mouseEnterDelay={0}
          popupClassName={theme}
          builtinPlacements={builtinPlacements}
          popup={innerTrigger}
          // /alignPoint={false}
          onPopupAlign={this.onPopupAlign}
          onPopupVisibleChange={this.onPopupVisibleChange}
          popupVisible={this.state.popupVisible}
        >
          <InputGroup simple style={{ width: '100%' }}>
            <FormControl
              type="text"
              style={{
                width: '100%'
              }}
              {
              ...displayValue.trim() ? { readOnly: "readonly" } : ''
              }
              value={inputVal}
              onChange={this.onChangeFormControl}
              onFocus={this.onFocusFormControl}
            />
            <InputGroup.Button shape="border">
              <span className="uf uf-navmenu" > </span>
            </InputGroup.Button>
            {!!inputVal && <InputGroup.Button className="clearAll" shape="border" style={{
              cursor: 'pointer'
            }}>
              <span className={!inputVal ? '' : "uf uf-close-c"} onClick={e=>this.clearAll(e)} > </span>
            </InputGroup.Button>
            }
          </InputGroup>
        </Trigger>
      </div>
    );
  }
}
RefComboBoxBaseUI.propTypes = propTypes;
RefComboBoxBaseUI.defaultProps = defaultProps;
export default RefComboBoxBaseUI;
export {
  ComboStore,
  ComboItem,
  SliderPanel
}
