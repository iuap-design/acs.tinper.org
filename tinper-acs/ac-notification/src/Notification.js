import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'bee-button';
import Notification from 'bee-notification';


class NotificationMess extends Component {

  constructor(props) {
    super(props);
    this.notification = null;
    Notification.newInstance({
      position: 'bottomRight',
      className:this.getTypeNotifica()+ " " + "notification_mess"
    }, n => this.notification = n);
  }

  getTypeNotifica=()=>{
    const {type} = this.props;
    switch(type){
      case "warning":
        return "warning_cont";
      case "success":
        return "success_cont";
      case "info":
        return "info_cont";
      case "error":
        return "error_cont";
    }
  }

  getTypeIcon=()=>{
    const {type} = this.props;
    switch(type){
      case "warning":
        return "notice";
      case "success":
        return "succeed";
      case "info":
        return "help-information";
      case "error":
        return "error4";
    }
  }

  open=(options)=>{
    const { title, content, duration, closable } = this.props;
    const key = Date.now();
    this.notification.notice({
      content:(<div className="page">
        <div className="_title">
          {/* <Icon type={this.getTypeIcon()} /> */}
          <span className="title_cont">{title}</span>
          {/* <Icon type="error3" className={"_close"} onClick={this.close(this, key)} /> */}
        </div>
        <div className={"notification_cont"}>{content}</div>
        {/* <Button onClick={this.close(this, key)} size="sm" style={{ position: 'absolute', right: 15, bottom: 15}}>知道了</Button> */}
      </div>),
      key,
      duration: typeof duration === 'undefined' ? null : duration,
      closable: typeof closable === 'undefined' ? false : closable,
    });
  }

  close = () => {
  
  }
}

export default NotificationMess


/**
组件使用方式
import NotificationMess,{openMess} from 'components/notification';
type 类型[warning,success,info,error]
openMess({
  title:"234",
  type:"error",
  content:"你所提交的信息已经审核失败，可以进入个人信箱查看原因， 如有疑问，请联系客服人员。"
});
**/
