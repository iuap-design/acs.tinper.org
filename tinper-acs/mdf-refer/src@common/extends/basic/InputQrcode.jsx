import React from 'react';
import Label from '@mdf/metaui-web/lib/components/basic/label';
import QRCode from 'qrcode.react';
import {Input,Popover} from 'antd'
export default class InputQrcode extends React.Component {
  constructor(props) {
    super(props);
    const { cStyle, cFormatData } = props;
    let config = null, format = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    if (cFormatData) {
      try {
        format = JSON.parse(cFormatData);
      } catch (e) {

      }
    }
    this.state = Object.assign({
      visible: !props.bHidden,
      size: props.size || 110,
      value: props.defaultValue
    }, config);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  //render前
  componentWillUpdate(nextProps, nextState) { }
  //render后
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  baseControl(){
    const {value,size} = this.state;
    let content = (<QRCode value={value} size={size}/>)
    if(value){
      return <Popover placement="right" title={''} content={content} trigger="hover" overlayClassName='input-qrcode-img'>
          <a className='input-qrcode-name'>查看二维码</a>
      </Popover>
    }else{
      return <Input disabled="disabled" placeholder="未生成"/>
    }
  }
  render() {
    const {cShowCaption } = this.props;
    const {size} = this.state;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={<label>{cShowCaption}</label>}/> : this.baseControl());
    let style = this.state.visible ? {} : { display: "none" };
    return (
      <div style={style} className='basic-input-qrcode'>
        {control}
      </div>
    );
  }
}
