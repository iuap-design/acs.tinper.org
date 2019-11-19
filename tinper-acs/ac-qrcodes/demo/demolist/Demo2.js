/**
 *
 * @title 二维码组件示例2
 * @description 设置不同的二维码参数，显示不同规格的格式等
 *
 */

import React, { Component } from 'react';
import { FormControl, Col, Row, Select, InputNumber, Checkbox } from 'tinper-bee';
import AcQrcode from '../../src/index';
class Demo2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "http://tinper.org/",
            size: 128,
            bgColor: "#FFFFFF",
            fgColor: "#000000",
            level: "L",
            includeMargin: false,
            renderAs: "svg"
        }
    }

    handlerChange = (key, val) => {
        this.setState({
            [key]: val
        });
    }
    handlerChangeSize = (val) => {
        this.setState({
            size: Number(val)
        });
    }

    render() {
        let { value, size, bgColor, fgColor, level, includeMargin, renderAs } = this.state;
        return (
            <div className="demoPadding">
                <AcQrcode
                    value={value}
                    size={size}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    level={level}
                    includeMargin={includeMargin}
                    renderAs={renderAs}
                />
                <Row>
                    <Col md={3}>
                        <label>Value:</label>
                        <FormControl value={this.state.value} onChange={(v) => this.handlerChange('value', v)} />
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <label>Size:</label>
                        <InputNumber
                            iconStyle="one"
                            max={1024}
                            min={64}
                            step={1}
                            value={this.state.size}
                            onChange={(v) => this.handlerChange('size', v)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <label>Background Color:</label>
                        <Select
                            defaultValue="#FFFFFF"
                            onChange={(v) => this.handlerChange('bgColor', v)}
                        >
                            <Option value="#FFFFFF">White</Option>
                            <Option value="#fa8c16">Yellow</Option>
                            <Option value="#f5222d">Red</Option>
                            <Option value="#52c41a">Green</Option>
                            <Option value="#1890ff">Blue</Option>
                            <Option value="#13c2c2">Cyan</Option>
                            <Option value="#eb2f96">Magenta</Option>
                            <Option value="#fa541c">Volcano</Option>

                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <label>Foreground Color:</label>
                        <Select
                            defaultValue="#000000"
                            onChange={(v) => this.handlerChange('fgColor', v)}
                        >
                            <Option value="#000000">Black</Option>
                            <Option value="#fa8c16">Yellow</Option>
                            <Option value="#f5222d">Red</Option>
                            <Option value="#52c41a">Green</Option>
                            <Option value="#1890ff">Blue</Option>
                            <Option value="#13c2c2">Cyan</Option>
                            <Option value="#eb2f96">Magenta</Option>
                            <Option value="#fa541c">Volcano</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <label>Error Level:</label>
                        <Select
                            defaultValue="L"
                            onChange={(v) => this.handlerChange('level', v)}
                        >
                            <Option value="L">L</Option>
                            <Option value="M">M</Option>
                            <Option value="Q">Q</Option>
                            <Option value="H">H</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <label>Include Margin:</label>
                        <Checkbox
                            checked={this.state.includeMargin}
                            onChange={this.onChange}
                            onChange={(v) => this.handlerChange('includeMargin', v)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <label>Render As:</label>
                        <Select
                            defaultValue="svg"
                            onChange={(v) => this.handlerChange('renderAs', v)}
                        >
                            <Option value="svg">Svg</Option>
                            <Option value="canvas">Canvas</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo2;
