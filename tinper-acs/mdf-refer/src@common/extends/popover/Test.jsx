import React, { Component } from 'react';
import { Popover, Button } from 'antd';

export default class Test extends Component {
  render() {
    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    );
    return (
      <Popover content={content} title="Title" trigger="click">
        {this.props.children}
      </Popover>
    );
  }
}
