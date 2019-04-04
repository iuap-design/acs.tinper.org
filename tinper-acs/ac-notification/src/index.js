import NotificationMess from './Notification';

let _notification;
function openMess(options){
  _notification = null;
  if (!_notification) {
    _notification = new NotificationMess(options);
  }
  _notification.open(options);
}

export default NotificationMess;
export {
  openMess,
  close,
};