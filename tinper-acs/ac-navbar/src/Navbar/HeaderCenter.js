import React,{Component} from "react";
// import cookie from "react-cookie";
// import {FormattedMessage, FormattedDate, FormattedNumber} from 'react-intl';

class HeaderCenter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header-center">
              <a href="javascript:;">
                <div className={"portal-logo " + 'zh_CN'} style={{backgroundImage: `url(${require("../assets/images/logo.svg")})`}}></div>
                {/* <img src={a } className="portal-logo" /> */}
              </a>
            </div>
        );
    }
}
export default HeaderCenter;
