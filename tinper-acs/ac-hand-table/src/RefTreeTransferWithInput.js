/* eslint-disable react/prop-types,operator-linebreak,react/jsx-filename-extension */
/**
 *
 * @title 基础示例1
 * @description 表格参照，使用RefMultipleTableBaseUI,不带有input
 *
 */
import React, { Component } from 'react';
import RefTreeTransferBaseUI from 'ref-tree-transfer';
import 'ref-tree-transfer/lib/index.css';


class RefTreeTransferWithInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { showModal, currentRefType } = this.props;

    return (currentRefType === 'refTreeTransferWithInput' && showModal ?
        <RefTreeTransferBaseUI
          {...this.props}
        /> : null
    );
  }
}

export default RefTreeTransferWithInput;
