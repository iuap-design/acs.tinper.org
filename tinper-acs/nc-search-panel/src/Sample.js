import React from 'react';

class Sample extends React.Component {
  static displayName = 'Sample';
  render(){
    return this.props.children;
  }
}
export default Sample;
