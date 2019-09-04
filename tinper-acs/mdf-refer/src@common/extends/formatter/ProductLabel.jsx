import React, { Component } from 'react';
import { Popover } from 'antd';

export default class ProductLabel extends Component {
  constructor(props) {
    super(props);
  }
  getlen=(tagname)=>{// 计算字符串的长度
    return tagname.replace(/[\u0391-\uFFE5]/g,"aa").length*6+15;
  }
  getControl(){
    const {width} = this.props.rowInfo;
    const moreWidth = 27; // 三个点宽度
    const propsPaddingWidth = 24; // 容器padding
    const tags = this.props.rowData.tags || [];
    let showTags=[];// 外显标签
    let moreTags=[];// 三个点里面的标签
    let firstTags=[];// 第一行标签
    let morefirstTags=[];// 超过第一行的标签
    let secondTags=[];// 第二行标签
    let firstCountLength=0; // tags width
    let liControl = [];
    tags.forEach((value,index,list)=>{
      firstCountLength+=this.getlen(value.tagId_name);
      if(firstCountLength>width-propsPaddingWidth){
        morefirstTags.push(value);
      }else{
        firstTags.push(value);
      }
    })
    let secondCountLength=0; // tags width
    morefirstTags.length && morefirstTags.forEach((value,index,list)=>{
      secondCountLength+=this.getlen(value.tagId_name);
      if(secondCountLength+moreWidth>width-propsPaddingWidth){
        moreTags.push(value);
      }else{
        secondTags.push(value)
      }
    })
    showTags = [].concat(firstTags,secondTags);
    liControl = showTags.map((val,index)=>{
      return <li style={{background:val.tagId_tag_bgcolor,color:val.tagId_tag_fgcolor}} title={val.tagId_name}>
       {val.tagId_name}
      </li>
    })
    let content; let contentInner=[];
    if(moreTags.length){
      contentInner = moreTags.map((val,index)=>{
        return <p>
          {val.tagId_name}
        </p>
      })
      content = (
        <div className='product-tag-popover'>
          {contentInner}
        </div>
      );      
      liControl.push(<Popover placement="bottom" content={content} trigger="click">
        <li>
          <i className="anticon anticon-ellipsis"></i>
        </li>
      </Popover>)
    }
    return liControl;
  }
  render() {
    const tags = this.props.rowData.tags || [];
    const {width} = this.props.rowInfo;
    let Tags = this.getControl();
    return (
      <ul className="product-tag" title='标签'>
        {Tags}
      </ul>
    );
  }
}
