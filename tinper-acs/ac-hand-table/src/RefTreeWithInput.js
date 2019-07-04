/* eslint-disable react/prop-types,operator-linebreak,react/jsx-filename-extension */
/**
 *
 * @title 基础示例1
 * @description 表格参照，使用RefMultipleTableBaseUI,不带有input
 *
 */
import React, { Component } from 'react';
import RefTreeBaseUI from 'ref-tree';

import 'ref-tree/lib/index.css';


class RefTreeWithInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { showModal, currentRefType } = this.props;

    return (currentRefType === 'refTreeWithInput' && showModal ?
        <RefTreeBaseUI
          {...this.props}
        /> : null
    );
  }
}

export default RefTreeWithInput;
