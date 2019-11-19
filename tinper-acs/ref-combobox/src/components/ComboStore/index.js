import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'bee-loading';
import Pagination from '../Pagination';


const propTypes = {
  ajax: PropTypes.object,
  displayField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  valueField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  afterLoad: PropTypes.func,
  // reload: PropTypes.bool,
  strictMode: PropTypes.bool //严格模式
};
const defaultProps = {
  ajax: {},
  displayField: '{refname}',
  valueField: 'refcode',
  afterLoad: () => { },
  // reload: true,
  strictMode: false
};

class ComboStore extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  

  render() {
    let {
      lang = 'zh_CN',
      topPagination = false,
      comboboxStoreData,
      pageCount = 10,
      currPageIndex = 0,
      totalElements,
      onSelect,
      loading } = this.props;
    return (
      <div>
        <Loading container={this} show={loading} />

        {!topPagination && comboboxStoreData.map((item, i) => {
          return <div key={`combox-store-${i}`}>{item}</div>
        })}
        <Pagination
          show={pageCount <= 0 ? false : true}
          currPageIndex={++currPageIndex}
          pageCount={pageCount}
          totalElements={totalElements}
          lang={lang}
          onSelect={onSelect}
        />

        {topPagination && comboboxStoreData.map((item) => {
          return item;
        })}
      </div>)
  }
}
ComboStore.propTypes = propTypes;
ComboStore.defaultProps = defaultProps;
export default ComboStore;