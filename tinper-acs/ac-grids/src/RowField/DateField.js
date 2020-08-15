/**
 * DateField (日期选择框)
 */

//React导入
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
//类型校验
import PropTypes from 'prop-types';
//日期处理
import moment from 'moment';
//验证组件 https://www.npmjs.com/package/async-validator
import schema from 'async-validator';

//日期组件
import DatePicker from "bee-datepicker";
//本地化日期
import zhCN from 'bee-datepicker/build/locale/zh_CN'

import FieldWrap from './FieldWrap'
import cb from '../utils';


//类型校验
const propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    field: PropTypes.string,
    index: PropTypes.number,
    message: PropTypes.string,
    data: PropTypes.array,
    required: PropTypes.bool,
    onValidate: PropTypes.func,
    isFlag: PropTypes.bool,
    validate: PropTypes.bool,
};

//默认参数值
const defaultProps = {
    field: '',
    index: '',
    message: '请输入此字段',
    data: [],
    required: false,
    isFlag: false,
    validate: false
}

class DateField extends Component {
    /**
     * Creates an instance of YearField.
     * @param {*} props
     * @memberof YearField
     */
    constructor(props) {
        super(props);
        this.state = {
            value: moment(props.value),//组件的值
            flag: false,//是否编辑过
            error: false//校验是否有错误

        }
        this.handleBodyClick = this.handleBodyClick.bind(this);
    }
    /**
     *  参数发生变化回调
     *
     * @param {object} nextProps 即将更新Props
     * @param {object} nextState 即将更新State
     * @memberof NumberField
     */
    componentWillReceiveProps(nextProps) {
        //当校验外部发生变化，主动校验函数
        if (nextProps.validate == true) {
            this.validate();
        }
    }

    handleBodyClick (e) {
        document.body.removeEventListener('click', this.handleBodyClick);
        const { onBlur } = this.props;
        const refs = this.refs.div;
        if (this.contains(refs, e.target)) return;
        const targetClass = 'div.rc-calendar';
        if (e.target && cb.dom(findDOMNode(e.target)).parents(targetClass).length) return;
        onBlur && onBlur();
    }

    contains=(elem, target) => {
        if (elem === target)
          return true;
        if (!elem || !elem.children || !elem.children.length)
          return false;
        for (let i = 0, len = elem.children.length; i < len; i++) {
          if (this.contains(elem.children[i], target))
            return true;
        }
        return false;
    }

    /**
     * 有输入值改变的回调
     *
     * @param {string} value
     */
    handlerChange = (value) => {
        let { onChange, field, index, status } = this.props;
        //处理是否有修改状态改变、状态同步之后校验输入是否正确
        this.setState({ value, flag: status == 'edit' }, () => {
            this.validate();
        });
        //回调外部函数
        onChange && onChange(field, value, index);
    }
    /**
     * 校验
     *
     */
    validate = () => {
        let { required, field, index, onValidate } = this.props;
        let { value } = this.state;
        //设置校验规则
        let descriptor = {
            [field]: { type: "object", required }
        }
        let validator = new schema(descriptor);
        validator.validate({ [field]: value }, (errors, fields) => {
            if (errors) {
                this.setState({
                    error: true
                });
            } else {
                this.setState({
                    error: false
                });
            }
            onValidate && onValidate(errors,field, fields, index);
        });
    }
    render() {
        document.body.addEventListener('click', this.handleBodyClick);
        let { value, error, flag } = this.state;

        let { className, message, required,disabledDate,disabled } = this.props;

        return (
            <FieldWrap
                required={required}
                error={error}
                message={message}
                flag={flag}
            >
                <div ref='div'>
                    <DatePicker
                        className={className}
                        value={value}
                        onChange={this.handlerChange}
                        format={'YYYY-MM-DD'}
                        locale={zhCN}
                        placeholder={"选择年"}
                        disabledDate={disabledDate}
                        disabled={disabled}
                    />
                </div>
            </FieldWrap>
        );
    }
}

DateField.propTypes = propTypes;
DateField.defaultProps = defaultProps;
export default DateField;