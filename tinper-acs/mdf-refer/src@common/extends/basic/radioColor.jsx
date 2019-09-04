import React from 'react';
import Label from '@mdf/metaui-web/lib/components/basic/label';
process.env.__CLIENT__ && require('./radiocolor.less');
export default class radioColor extends React.Component {
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
      } catch (e) {}
    }
    let value = {font:'#fff',bg:'#007CEF'}
    this.state = Object.assign({
      visible: !props.bHidden,
      value:value,
    }, config);
    this.props.model.setValue(value, true);
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
  handelClick(value,e){
    if (this.props.model) {
        this.props.model.setValue(value, true);
    }
    this.setState({value:value})
  }
  baseControl(){
    const {value,size} = this.state;
    const _color = [
        {font:'#fff',bg:'#FF7301'},
        {font:'#fff',bg:'#FF404C'},
        {font:'#fff',bg:'#EE4D9F'},
        {font:'#fff',bg:'#007CEF'},
        {font:'#fff',bg:'#2DBC68'},
        {font:'#FF404C',bg:'#FFDCDC'},
        {font:'#EE4D9F',bg:'#FFDEF3'},
        {font:'#FF7301',bg:'#FFE6C9'},
        {font:'#286CED',bg:'#D9ECFF'},
        {font:'#22A85A',bg:'#C0F8D5'}
    ]
    let _index;
    if(value){
      _color.forEach((v,index)=>{
          if(v.font==value.font && v.bg==value.bg){
              _index = index
          }
      })
    }
    const _li = _color.map((v,index)=>{
        return (
            <li style={{color:v.font,backgroundColor:v.bg}} className={_index==index ? 'on':null} onClick={this.handelClick.bind(this,v)}>
                标签{index+1}
                <div><i></i></div>
            </li>
        )
    })
    const content = (
        <ul>{_li}</ul>
    )
    return content
  }
  render() {
    const {cShowCaption } = this.props;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={<label>{cShowCaption}</label>}/> : this.baseControl());
    let style = this.state.visible ? {}: {display: "none" };
    return (
        <div style={style} className='basic-input-radiocolor'>
            {control}
        </div>
    );
  }
}
