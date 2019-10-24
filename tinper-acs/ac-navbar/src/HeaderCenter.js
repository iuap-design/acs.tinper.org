import React,{Component} from "react";
import PropTypes from 'prop-types';

const propTypes = {
    logo: PropTypes.func, //自定义Logo
};

const defaultProps = {};

class HeaderCenter extends Component {
    constructor(props) {
        super(props);
    }
    renderLogo = () => {
        return <img src={'//design.yonyoucloud.com/static/tinper-acs/ac-navbar/logo.svg'} className="portal-logo" />
    }
    render() {
        let {logo} = this.props;
        return (
            <div className="header-center">
              <a href="javascript:;">
                <div className="portal-logo-container">
                    {
                        logo ? logo(): this.renderLogo()
                    }
                </div>
              </a>
            </div>
        );
    }
}

HeaderCenter.propTypes = propTypes;
HeaderCenter.defaultProps = defaultProps;
export default HeaderCenter;
