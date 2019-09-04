import React from 'react';
import { Row, Col } from '@mdf/metaui-web/lib/components/basic';
import HomeTitle from './HomeTitle';
import SaleRank from './SaleRank';
import MyToDo from './MyToDo';
import SaleTrend from './SaleTrend';
import TaskList from './TaskList';
import Card from './Card';
import CommonFunctions from './CommonFunctions';
import * as homeActions from '../../redux/modules/home'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HomeControl extends React.Component {
  constructor(props) {
    super(props);
    this.rowKey = 0;
    this.colKey = 0;
  }
  getControlByType(ele) {
    let cControlType = ele.cControlType;
    let control;
    switch (cControlType) {
      case 'SaleRank':
        control = (<SaleRank title={ele.title} type={ele.type} />);
        break;
      case 'MyToDo':
        control = (<MyToDo />);
        break;
      case 'SaleTrend':
        let clientWidth = document.documentElement.clientWidth;
        let width = (clientWidth - 150 - 20) * (2 / 3) * (0.5);
        width = width - 40;
        control = (<SaleTrend width={width} />);
        break;
      case 'TaskList':
        control = (<TaskList />);
        break;
      case 'Card':
        control = (<Card title={ele.title} type={ele.type} />);
        break;
      case 'CommonFunctions':
        control = (<CommonFunctions title={ele.title} />);
        break;
      // case 'DistributionMap':
      //     control = (<DistributionMap title={ele.title} />);
      //     break;
    }
    return control;
  }
  getRowControl(row) {
    let rowControl = [];
    row.forEach(function (ele) {
      let colControl = this.getColControl(ele.col);
      rowControl.push(<Row colCount={12}>{colControl}</Row>);
    }, this)
    return rowControl;
  }
  getColControl(col) {
    let colControl = [];
    col.forEach(function (ele) {
      const colKey = `col${this.colKey++}`;
      if (ele.row) {
        let row = this.getRowControl(ele.row);
        colControl.push(<Col span={ele.span}>{row}</Col>);
      } else {
        let control = this.getControlByType(ele);
        colControl.push(<Col span={ele.span}>{control}</Col>);
      }
    }, this);
    return colControl;
  }
  getControlByLayout(layoutJson) {
    let row = layoutJson.row;
    let rowControl = this.getRowControl(row);
    return rowControl;
  }
  render() {
    let { layOut } = this.props.home;
    if (!layOut)
      return null;
    const control = this.getControlByLayout(layOut);
    return (<div className='home-1'>{control}</div>);
  }
}

function mapStateToProps(state) {
  return {
    home: state.home.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: bindActionCreators(homeActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeControl);
