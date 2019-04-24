import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ComboItem from '../ComboItem';

const propTypes = {
  show: PropTypes.bool,
  style: PropTypes.object,
  slider: PropTypes.string,
  onClickItem: PropTypes.func
};

const defaultProps = {
  show: true,
  style: {},
  slider: 'up',
  onClickItem: (record) => { }
};


/**
 * 下拉面板
 */
class SliderPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    }
  }
  onClickItem = (e) => {
    e.stopPropagation();
    if (e.target.dataset.type !== 'comboitem') {
      return;
    }
    //来自ui的
    this.props.onClickItem(e.target, e);
  }
  render() {
    const _this = this;
    let { show, style, slider } = this.props;
    return (
      <div className={`ref-slider-panel ${slider == 'up' ? 'ref-slider-slider-up' : 'ref-slider-slider-down'}`} style={{ display: show ? '' : 'none', ...style }}>

        <ul className="ref-slider-panel-ul"
          onClick={_this.onClickItem}
        >
          {this.props.children}
        </ul>
      </div>
    );
  }
}
SliderPanel.propTypes = propTypes;
SliderPanel.defaultProps = defaultProps;
export default SliderPanel;
export { ComboItem }
