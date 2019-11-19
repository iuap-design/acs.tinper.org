/*! ac-attachment v__VERSION__ */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import zh_CN from './locale/zh_CN.js';
import en_US from './locale/en_US.js';
import zh_TW from './locale/zh_TW.js'; 
import {IntlProvider,addLocaleData,FormattedMessage,injectIntl} from 'react-intl';
import cookie from 'react-cookies';
import AcAttachment from './acAttachment';

//加载国际化文件
addLocaleData([...en,...zh]);

let messages = {};
messages['en'] = en_US;
messages['en-US'] = en_US;
messages['en_US'] = en_US;
messages['zh'] = zh_CN;
messages['zh-CN'] = zh_CN;
messages['zh_CN'] = zh_CN;
messages['zh-TW'] = zh_TW;
messages['zh_TW'] = zh_TW;

let localeMap = {
    'en-US': 'en',
    'en_US': 'en',
    'zh-CN': 'zh',
    'zh_CN': 'zh',
    'zh-TW': 'zh',
    'zh_TW': 'zh'
}

class AcAttachmentIntl extends Component{
    constructor(props){
		super(props);
		this.state = {
          
        }
    }
	render(){
        let localeSrc = this.props.locale || cookie.load('u_locale') || 'zh'; 
        let locale = localeMap[localeSrc] || localeSrc;

		return (
            <IntlProvider locale={locale} messages={messages[localeSrc]}>
                <AcAttachment {...this.props} locale={localeSrc} ref={(ref) => this.attach = ref && ref._wrappedInstance} />
            </IntlProvider>
		)
	}
}

AcAttachmentIntl.version = '__VERSION__';

export default AcAttachmentIntl;
 