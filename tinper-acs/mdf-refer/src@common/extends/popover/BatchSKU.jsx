import React, { Component } from 'react';
import { Popover, Button, InputNumber, Form } from 'antd';

const FormItem = Form.Item;
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class BatchSKU extends Component {
    constructor(props) {
        super(props);
        this.staticSKUData = {
            "productSKUDetail!weight": '重量', //重量
            "productSKUDetail!batchPrice": '批发价', //批发价
            "productSKUDetail!markPrice": '建议零售价', //建议零售价
            "productSKUDetail!salePrice": '线上零售价', //线上零售价
            "productSKUDetail!fMarketPrice": '市场价', //市场价
            "productSKUDetail!fPrimeCosts": '进货价格', //进货价格
            "productSKUDetail!fSettleAccountsRate": '结算费率', //结算费率
            "productSKUDetail!inventoryCount": '库存' //库存
            // SKU 扩展属性
        }
        this.state = {
            "productSKUDetail!weight": null,
            "productSKUDetail!batchPrice": null, //批发价
            "productSKUDetail!markPrice": null,
            "productSKUDetail!salePrice": null,
            "productSKUDetail!fMarketPrice": null, //市场价
            "productSKUDetail!fPrimeCosts": null,
            "productSKUDetail!fSettleAccountsRate": null,
            "productSKUDetail!inventoryCount": null,
            "visible": false
        };
    }
    handleConfirmBlur(val, e) {
        if (e.target.value !== '') {
            this.setState({
                [val]: Number(e.target.value)
            })
        }
    }
    handleSave = () => {
        let isEmpty = false;
        Object.values(this.state).forEach(val => {
            if (val !== null && val !== false && val !== true) {
                isEmpty = true
            }
        })
        if (isEmpty) {
            this.props.model.execute('click', this.state)
            this.setState({ visible: false })
        } else {
            cb.utils.alert('请填写需要更改的值', 'warning');
        }
    }
    handleCancle = () => {
        this.setState({ visible: false })
    }
    showPopover = () => {
        this.setState({ visible: true })
    }
    render() {
        const formItemLayout = {
            wrapperCol: { offset: 1 },
            labelCol: { span: 8 },
            wrapperCol: { span: 14 }
        }
        const SKUlist = Object.keys(this.staticSKUData).map((val, index) => {
            return (
                <FormItem
                  label={this.staticSKUData[val]}
                  {...formItemLayout}
                  key={index}
                >
                  <InputNumber min={0} placeholder="请输入" size={'default'}  onBlur={this.handleConfirmBlur.bind(this,val)}/>
                </FormItem>
            )
        })

        const content = (
            <Form layout='horizontal' style={{width:'300px'}} className='popover-form'>
                <div className="popover-list">{SKUlist}</div>
                <div className="filter-btn-1">
                  <Button type="primary" htmlType="submit" onClick={this.handleSave}>保存</Button>
                  <Button type='default' style={{marginRight:'10px'}} onClick={this.handleCancle}>取消</Button>  
                </div>
            </Form>
        )
        return (
            <Popover content={content} visible={this.state.visible} onClick={this.showPopover} arrowPointAtCenter autoAdjustOverflow={false} trigger='click' placement='left' className='popover-form'>
              {this.props.children}
            </Popover>
        );
    }
}