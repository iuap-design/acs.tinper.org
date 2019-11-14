'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCookie = exports.getFileNames = exports.getExtImg = exports.getSize = undefined;
exports.dateFormate = dateFormate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 计算文件大小
 * @param {number} size  文件大小 kb
 */
var getSize = exports.getSize = function getSize(size) {
    var unit = 'KB';
    size = Math.ceil(size / 1024);
    if (size >= 1024) {
        unit = 'MB';
        size = Math.ceil(size / 1024);
    }
    return size + unit;
}; /**文件类型图标 */
// import ai from './fileType/ai.svg';
// import audio from './fileType/audio.svg';
// import box_notes from './fileType/box_notes.svg';
// import csv from './fileType/csv.svg';
// import eps from './fileType/eps.svg';
// import excel from './fileType/excel.svg';
// import exe from './fileType/exe.svg';
// import flash from './fileType/flash.svg';
// import gdoc from './fileType/gdoc.svg';
// import gdocs from './fileType/gdocs.svg';
// import gform from './fileType/gform.svg';
// import gpres from './fileType/gpres.svg';
// import gsheet from './fileType/gsheet.svg';
// import html from './fileType/html.svg';
// import image from './fileType/image.svg';
// import keynote from './fileType/keynote.svg';
// import pack from './fileType/pack.svg';
// import pages from './fileType/pages.svg';
// import pdf from './fileType/pdf.svg';
// import ppt from './fileType/ppt.svg';
// import psd from './fileType/psd.svg';
// import rtf from './fileType/rtf.svg';
// import slide from './fileType/slide.svg';
// import stypi from './fileType/stypi.svg';
// import txt from './fileType/txt.svg';
// import unknown from './fileType/unknown.svg';
// import video from './fileType/video.svg';
// import visio from './fileType/visio.svg';
// import webex from './fileType/webex.svg';
// import word from './fileType/word.svg';
// import xml from './fileType/xml.svg';
// import zip from './fileType/zip.svg';
var getExtImg = exports.getExtImg = function getExtImg(ext) {
    //所有图片
    var imgExts = ['jpg', 'webp', 'bmp', 'pcx', 'tif', 'gif', 'jpeg', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'png', 'hdri', 'raw', 'wmf', 'flic', 'emf', 'ico'];
    //所有音频
    var audioExts = ['mp3', 'aac', 'wav', 'wma', 'cda', 'flac', 'm4a', 'mid', 'mka', 'mp2', 'mpa', 'mpc', 'ape', 'ofr', 'ogg', 'ra', 'wv', 'tta', 'ac3', 'dts'];
    //所有视频
    var videoExts = ['avi', 'asf', 'wmv', 'avs', 'flv', 'mkv', 'mov', '3gp', 'mp4', 'mpg', 'mpeg', 'dat', 'ogm', 'vob', 'rm', 'rmvb', 'ts', 'tp', 'ifo', 'nsv'];
    //所有压缩
    var zipExts = ['rar', 'zip', 'arj', 'z', 'cab', 'lzh', 'ace', 'tar', 'gz', 'uue', 'bz2', 'jar', 'iso', '7z'];

    if (imgExts.indexOf(ext) != -1) return image;
    if (audioExts.indexOf(ext) != -1) return audio;
    if (videoExts.indexOf(ext) != -1) return video;
    if (zipExts.indexOf(ext) != -1) return zip;

    switch (ext) {
        case 'ai':
            return ai;
            break;
        case 'box':
            return box_notes;
            break;
        case 'csv':
            return csv;
            break;
        case 'eps':
            return eps;
            break;
        case 'xls':
            return excel;
            break;
        case 'xlsx':
            return excel;
            break;
        case 'exe':
            return exe;
            break;
        case 'swf':
            return flash;
            break;
        case 'gdoc':
            return gdoc;
            break;
        case 'gdocs':
            return gdocs;
            break;
        case 'gform':
            return gform;
            break;
        case 'gpres':
            return gpres;
            break;
        case 'gsheet':
            return gsheet;
            break;
        case 'html':
            return html;
            break;
        // case 'image':
        //     return image;
        //     break;
        case 'keynote':
            return keynote;
            break;
        case 'pack':
            return pack;
            break;
        case 'pages':
            return pages;
            break;
        case 'pdf':
            return pdf;
            break;
        case 'ppt':
            return ppt;
            break;
        case 'psd':
            return psd;
            break;
        case 'rtf':
            return rtf;
            break;
        case 'slide':
            return slide;
            break;
        case 'stypi':
            return stypi;
            break;
        case 'txt':
            return txt;
            break;
        case 'video':
            return video;
            break;
        case 'vsd':
            //流程图
            return visio;
            break;
        case 'arf':
            return webex;
            break;
        case 'doc':
            return word;
            break;
        case 'docx':
            return word;
            break;
        case 'xml':
            return xml;
            break;
        // case 'zip':
        //     return zip;
        //     break;
        default:
            return unknown;
            break;
    }
};

/**
 * 文件类型图标+拼接文件名
 * @param {string} ext 扩展名
 */
var getFileNames = exports.getFileNames = function getFileNames(name, ext) {
    ext = ext.split('.')[1];
    return _react2["default"].createElement(
        'span',
        { className: 'name-space', title: name + ext },
        _react2["default"].createElement(
            'span',
            null,
            ' ',
            name,
            ' '
        )
    );
};

/**
 * 时间戳格式化
 * @param {*} long 
 * @param {*} fmt 
 */
function dateFormate(long) {
    var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd';

    var date = new Date(long);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }

    return fmt;
}

/**
 * 获得cookie
 * @param {*} name 
 */
var getCookie = exports.getCookie = function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};