/**
 *
 * @title 条形码组件示例2
 * @description 设置相关参数，可使用微信扫一扫来查看
 *
 */

import React, { Component } from 'react';
import { Col, Row, FormControl, Select } from 'tinper-bee';
import AcBarcode from '../../src/index';

class Demo2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "9787121315169",
            format: "EAN13",
            renderer:"svg"
        }
    }

    handlerChange = (value) => {
        this.setState({ value });
    }

    handleChangeFormat = (value) => {
        this.setState({
            format : value
        });
    }
    handleChangeRenderer = (value) => {
        this.setState({
            renderer : value
        });
    }

    render() {
        return (
            <div className="demoPadding">
                <Row>
                    <Col md={3}>
                        <AcBarcode
                            value={this.state.value}
                            format={this.state.format}
                            renderer={this.state.renderer}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <FormControl value={this.state.value} onChange={this.handlerChange} />
                    </Col>
                </Row>
                <Row>
                    <Col md={3} style={{ "margin": "10px 0" }}>
                        <Select
                            defaultValue="EAN13"
                            onChange={this.handleChangeFormat}
                        >
                            <Option value="CODE128">CODE128 auto</Option>
                            <Option value="CODE128A">CODE128 A</Option>
                            <Option value="CODE128B">CODE128 B</Option>
                            <Option value="CODE128C">CODE128 C</Option>
                            <Option value="EAN13">EAN13</Option>
                            <Option value="EAN8">EAN8</Option>
                            <Option value="UPC">UPC</Option>
                            <Option value="CODE39">CODE39</Option>
                            <Option value="ITF14">ITF14</Option>
                            <Option value="ITF">ITF</Option>
                            <Option value="MSI">MSI</Option>
                            <Option value="MSI10">MSI10</Option>
                            <Option value="MSI11">MSI11</Option>
                            <Option value="MSI1010">MSI1010</Option>
                            <Option value="MSI1110">MSI1110</Option>
                            <Option value="pharmacode">Pharmacode</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} style={{ "margin": "10px 0" }}>
                    <Select
                            defaultValue="svg"
                            onChange={this.handleChangeRenderer}
                        >
                            <Option value="svg">svg</Option>
                            <Option value="canvas">canvas</Option>
                            <Option value="img">img</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo2;
