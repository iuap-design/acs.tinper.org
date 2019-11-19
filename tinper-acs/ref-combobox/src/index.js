import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is, fromJS } from 'immutable';
import Select from 'menu-selector';
import SliderPanel, { ComboItem } from './components/SliderPanel';
import ComboStore from './components/ComboStore';
import './utils/polyfill';

const propTypes = {
  className: PropTypes.string,
  defaultValue : PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  displayField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  valueField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  sliderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClickItemInner: PropTypes.func,//[Deprecated]
  onSelectorChange:   PropTypes.func,
  style: PropTypes.object,
  comboboxStoreData: PropTypes.array,//[Deprecated]
  storeData: PropTypes.array,
  onChangeFormControl: PropTypes.func, //[Deprecated]
  onFocusFormControl: PropTypes.func,//[Deprecated]
  onSearch :  PropTypes.func,
  onSelect: PropTypes.func, //[Deprecated]
  onPaginationSelect:  PropTypes.func,
};

const defaultProps = {
  className: '',
  children: null,
  default:'',
  value: '',
  displayField: '{refname}',
  valueField: 'refpk',
  style: {},
  comboboxStoreData: [],//[Deprecated]
  storeData: [],
  onChangeFormControl: () => { },//[Deprecated]
  onFocusFormControl: () => { },//[Deprecated]
  onSearch:() =>{},
  onSelect: () => { },//[Deprecated]
  onPaginationSelect:() =>{},
  onClickItemInner: () => { },//[Deprecated]
  onSelectorChange:()=>{},
  showMenuIcon:false,
  showArrow:true,//不展示navmenu展示箭头
};

class RefComboBoxBaseUI extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  /**
   * @msg: 下拉展开或者关闭
   * @param {type} 
   * @return: 
   */
  onDropdownVisibleChange = (open) =>{
    const {onPopupVisibleChange=()=>{}} = this.props;
    onPopupVisibleChange(open)

  }
  /**
   * @msg: selector的值改变
   * @param {type} 
   * @return: 
   */
  selectorChange = (status, id, item, selectedArray) => {
    const { onClickItemInner,onSelectorChange } = this.props;
    onClickItemInner(selectedArray,item,status);//[Deprecated]
    onSelectorChange(selectedArray,item,status);
  }
  /**
   * @msg: 分页跳转
   * @param {type} 
   * @return: 
   */
  paginationSelect = (index) =>{
    const {onSelect,onPaginationSelect} = this.props;
    onSelect(index);//[Deprecated]
    onPaginationSelect(index);
  }
  /**
   * @msg: 搜索
   * @param {type} 
   * @return: 
   */
  onSearch = (value) =>{
    const {onChangeFormControl,onSearch } =  this.props;
    onChangeFormControl(value);//[Deprecated]
    onSearch(value);
  }
  render() {
    const {
      className,
      children,
      style,
      theme = 'ref-red',
      pageCount = 1,
      currPageIndex = 0,
      totalElements = 0,
      storeData,
      multiple = false,
      displayField,
      inputDisplay,
      value,
      defaultValue,
      searchValue,
      defaultopen,
      disabled,
      dropdownStyle,
      notFoundContent,
      placeholder,
      searchPlaceholder,
      maxTagCount,
      maxTagPlaceholder,
      loading,
      valueField,
      showMenuIcon,
      showArrow
    } = this.props;
    let {topPagination, dropdownClassName,} = this.props;//兼容之前版本topPagination放在childrencomboStore上了
    if (children && children.props.topPagination) topPagination = children.props.topPagination;
    dropdownClassName =  dropdownClassName?  dropdownClassName+' ref-red' : 'ref-red'
    return (
      <div className={`${theme} ${className} ref-combobox`}>
        <Select
        {...this.props}
         style={{
            ...style,
            width: style.width || 300
          }}
          transitionName="rc-tree-select-dropdown-slide-up"
          choiceTransitionName="rc-tree-select-selection__choice-zoom"
          showSearch
          allowClear
          showMenuIcon //固定参数带有搜索，清空，menuIcon
          disabled={disabled}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          maxTagCount={maxTagCount}
          maxTagPlaceholder={maxTagPlaceholder}
          value={value}
          defaultValue={defaultValue}
          defaultopen={defaultopen}
          searchValue={searchValue}
          valueList={storeData}
          valueField={valueField}
          inputDisplay={inputDisplay}

          dropdownClassName={dropdownClassName}
          dropdownStyle={dropdownStyle}
          loading={loading}
          notFoundContent={notFoundContent}
          topPagination={topPagination}
          pageCount={pageCount}
          currPageIndex={currPageIndex}
          totalElements={totalElements}
          multiple={multiple}
          displayField={displayField}
          onPaginationSelect={this.paginationSelect}
          onSelectorChange={this.selectorChange}//为了配合ref-combobox的之前发版的操作
          onSearch={this.onSearch}
          onDropdownVisibleChange={this.onDropdownVisibleChange}
          showMenuIcon={showMenuIcon}
          showArrow={showArrow}
        >
        </Select>
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
