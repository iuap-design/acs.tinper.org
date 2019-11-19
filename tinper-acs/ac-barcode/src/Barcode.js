/**
 * 条形码组件
 */
import React, { Component } from 'react';
import JsBarcode from 'jsbarcode';
import PropTypes from 'prop-types';

let getDOMNode = (ref) => ref;
class AcBarcode extends Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return Object.keys(AcBarcode.propTypes).some((k) => this.props[k] !== nextProps[k]);
  };

  componentDidMount() {
    this.update();
  };

  componentDidUpdate() {
    this.update();
  };
  
  update = () => {
    var renderElement = getDOMNode(this.refs.renderElement);
    try {
      new JsBarcode(renderElement, this.props.value, Object.assign({}, this.props));
    } catch (e) {
      // prevent stop the parent process
      window.console.error(e);
    }
  };
  render() {
    if (this.props.renderer === 'svg') {
      return (
        <svg ref="renderElement" />
      );
    } else if (this.props.renderer === 'canvas') {
      return (
        <canvas ref="renderElement" />
      );
    } else if (this.props.renderer === 'img') {
      return (
        <img ref="renderElement" />
      );
    }
  }
}

AcBarcode.propTypes = {
  value: PropTypes.string.isRequired,
  renderer: PropTypes.string,
  format: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  displayValue: PropTypes.bool,
  fontOptions: PropTypes.string,
  font: PropTypes.string,
  textAlign: PropTypes.string,
  textPosition: PropTypes.string,
  textMargin: PropTypes.number,
  fontSize: PropTypes.number,
  background: PropTypes.string,
  lineColor: PropTypes.string,
  margin: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
};

AcBarcode.defaultProps = {
  format: 'CODE128',
  renderer: 'svg',
  width: 2,
  height: 100,
  displayValue: true,
  fontOptions: '',
  font: 'monospace',
  textAlign: 'center',
  textPosition: 'bottom',
  textMargin: 2,
  fontSize: 20,
  background: '#ffffff',
  lineColor: '#000000',
  margin: 10,
};


export default AcBarcode;
