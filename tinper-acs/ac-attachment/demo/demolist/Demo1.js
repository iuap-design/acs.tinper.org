/**
 *
 * @title AcAttachment
 * @description AcAttachment基本示例
 *
 */

import React, { Component } from 'react';
import AcAttachment from '../../src/index';

class Demo1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    render () {

        return (
            <div className="demoPadding demo1">
                <AcAttachment recordId='' groupname='yddemo'></AcAttachment>
            </div>
        )
    }
}

export default Demo1;
