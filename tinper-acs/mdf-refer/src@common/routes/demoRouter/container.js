import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataPermission from './component/DataPermission'
import * as demoActions from './reducer';

 class DemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillMount() {
    demoActions.getAllDomainList();
    demoActions.getAuthList();
  }
  componentWillUnmount() {

  }
  render() {
    const { demoState } = this.props;
    const {allDomain=[],authList=[]}=demoState;
    return (
      <div className="data-permission-page um-page" ref={node => this.mainPage = node}>
        <div className="um-page-content data-permission-content">
          <DataPermission tableList={authList}
                          allDomain={allDomain}
          ></DataPermission>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    demoState: state.demo.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    demoActions: bindActionCreators(demoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoPage)
