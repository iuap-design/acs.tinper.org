import React from 'react';

class Complex extends React.Component {
  static displayName = 'Complex';
  render(){
    return this.props.children;
  }
}

export default Complex;
