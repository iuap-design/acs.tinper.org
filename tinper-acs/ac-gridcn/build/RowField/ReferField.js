// /**
//  * Text (文本输入框)
//  */

// //React导入
// import React, { Component } from 'react';
// //类型校验
// import PropTypes from 'prop-types';
// //验证组件 https://www.npmjs.com/package/async-validator
// import schema from 'async-validator';

// import MdfRefer,{ cb } from '@yonyou/mdf-refer/lib/index'

// import FieldWrap from './FieldWrap'


// //类型校验
// const propTypes = {
//     value: PropTypes.any,
//     onChange: PropTypes.func,
//     className: PropTypes.string,
//     field: PropTypes.string,
//     index: PropTypes.number,
//     message: PropTypes.string,
//     data: PropTypes.array,
//     required: PropTypes.bool,
//     onValidate: PropTypes.func,
//     isFlag: PropTypes.bool,
//     validate: PropTypes.bool,
// };

// //默认参数值
// const defaultProps = {
//     field: '',
//     index: '',
//     message: '请输入此字段',
//     data: [],
//     required: false,
//     isFlag: false,
//     validate: false,
//     className: ''
// }

// class ReferField extends Component {
//     /**
//      * Creates an instance of ReferField.
//      * @param {*} props
//      * @memberof ReferField
//      */
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: props.value,
//             flag: false,
//             error: false
//         }
//         this.modelOrg = new cb.models.MdfReferModel({
//             cRefType: props.cRefType,
//             displayname: displayname.displayname,
//             valueField: props.valueField,
//         });
//         this.config = {
//             modelconfig: {
//                 afterValueChange: this.afterValueChange,
//             }
//         }
//     }
//     /**
//      *  参数发生变化回调
//      *
//      * @param {object} nextProps 即将更新Props
//      * @param {object} nextState 即将更新State
//      * @memberof NumberField
//      */
//     componentWillReceiveProps(nextProps) {
//         if (nextProps.validate == true) {
//             this.validate();
//         }
//     }
//     afterValueChange = (data) => {
//         if(Array.isArray(data.value) && data.value.length === 0) return;//解决问题树参照根节点问题
//     }

//     /**
//      * 有输入值改变的回调
//      *
//      * @param {string} value
//      */
//     handlerChange = (value) => {
//         let { onChange, field, index, status } = this.props;
//         //处理是否有修改状态改变、状态同步之后校验输入是否正确
//         this.setState({ value, flag: status == 'edit' }, () => {
//             this.validate();
//         });
//         //回调外部函数
//         onChange && onChange(field, value, index);
//     }
//     /**
//      * 校验方法
//      *
//      */
//     validate = () => {
//         let { required, field, index, onValidate,message,pattern } = this.props;
//         let { value } = this.state;
//         //设置校验规则
//         let descriptor = {
//             [field]: { type: "string", required }
//         }
//         if(pattern){
//             descriptor[field].push({
//                 pattern:pattern,message:message
//             })
//         }
//         let validator = new schema(descriptor);
//         validator.validate({ [field]: value }, (errors, fields) => {
//             if (errors) {
//                 this.setState({
//                     error: true
//                 });
//             } else {
//                 this.setState({
//                     error: false
//                 });
//             }
//             onValidate && onValidate(field, fields, index);
//         });
//     }
//     render() {
//         let { value, error, flag } = this.state;

//         let { className, message, required,fieldProps } = this.props;

//         return (
//             <FieldWrap
//                 required={required}
//                 error={error}
//                 message={message}
//                 flag={flag}
//             >
//                 <MdfRefer 
//                     {...fieldProps}
//                     className={`${className} triangle-element`}
//                     modelName={'refer'} 
//                     model={this.modelOrg} 
//                     config={this.config}
//                     value={value}
//                     />
//             </FieldWrap>
//         );
//     }
// }

// ReferField.propTypes = propTypes;
// ReferField.defaultProps = defaultProps;
// export default ReferField;
"use strict";