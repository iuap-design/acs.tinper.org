/**
 *
 * @title 条形码组件示例1
 * @description 条形码组件
 *
 */

import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';
import AcBarcode from '../../src/index';
class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "9787121315169"
        }
    }
    handlerChange = (value) => {
        this.setState({ value });
    }
    render() {
        return (
            <div className="demoPadding">
                <FormControl value={this.state.value} onChange={this.handlerChange} />
                <AcBarcode
                    value={this.state.value}
                />
            </div>
        )
    }
}

export default Demo1;
