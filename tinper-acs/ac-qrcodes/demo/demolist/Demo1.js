/**
 *
 * @title 二维码组件示例1
 * @description 可以生成符合行业规格的二维码，支持不同格式
 *
 */

import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';
import AcQrcode from '../../src/index';
class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="demoPadding">
                <AcQrcode
                    value={"http://tinper.org/"}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                    renderAs={"svg"}
                />
            </div>
        )
    }
}

export default Demo1;
