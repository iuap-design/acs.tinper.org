/* eslint-disable react/prop-types,operator-linebreak,react/jsx-filename-extension */
/**
 *
 * @title 基础示例1
 * @description 表格参照，使用RefMultipleTableBaseUI,不带有input
 *
 */
import React, { Component } from 'react';
import RefTreeTableBaseUI from 'ref-tree-table';

import 'ref-tree-table/lib/index.css';


class RefTreeTableWithInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { showModal, currentRefType } = this.props;

    return (currentRefType === 'refTreeTableWithInput' && showModal ?
        <RefTreeTableBaseUI
          {...this.props}
        /> : null
    );
  }
}

export default RefTreeTableWithInput;
