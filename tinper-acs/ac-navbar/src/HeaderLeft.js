import React,{Component} from "react";
import classnames from 'classnames';
import FormControl from 'bee-form-control';

class HeaderLeft extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
          value: ""
        }
    }
    svgClick = () => {
      const {svgClick} = this.props;
      svgClick && svgClick();
    }
    onInputChange = (value) => {
      this.setState({
        value: value
      })
    }
    onSearch = () => {
      let {onInputSearch} = this.props;
      let {value} = this.state;
      onInputSearch && onInputSearch(value);
    }
    render() {
        let {sideBarShow,sideShowPosition,searchInputProps} = this.props;
        let classes = classnames({
          'header-svg': true,
          'header-svg-red': sideBarShow,
          'header-svg-show': sideShowPosition
        })
        return (
            <div className="header-left">
              <div className={classes} onClick={this.svgClick}>
                {sideBarShow?
                <img src='//design.yonyoucloud.com/static/tinper-acs/ac-navbar/icon_menu_white.svg'  />
                :<img src='//design.yonyoucloud.com/static/tinper-acs/ac-navbar/icon_menu.svg'  />
                }
              </div>
              <div className="header-search">
                <FormControl
                  className="header-search-input"
                  value={this.state.value}
                  onSearch={this.onSearch}
                  onChange={this.onInputChange}
                  type="search"
                  {...searchInputProps}
                />
              </div>
            </div>
        );
    }
}
export default HeaderLeft;
