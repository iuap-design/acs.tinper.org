/* eslint-disable react/prop-types,operator-linebreak,react/jsx-filename-extension */
/**
 *
 * @title 基础示例1
 * @description 表格参照，使用RefMultipleTableBaseUI,不带有input
 *
 */
import React, { Component } from 'react';
import RefMultipleTableBaseUI from 'ref-multiple-table';

import 'ref-multiple-table/lib/index.css';

class RefMultipleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { showModal, currentRefType } = this.props;
    return (currentRefType === 'refMultipleTable' && showModal ?
        <RefMultipleTableBaseUI
          {...this.props}
        /> : null
    );
  }
}

export default RefMultipleTable;
