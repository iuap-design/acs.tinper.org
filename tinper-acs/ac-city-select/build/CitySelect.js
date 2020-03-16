'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _beeSelect = require('bee-select');

var _beeSelect2 = _interopRequireDefault(_beeSelect);

var _lodash = require('lodash.findindex');

var _lodash2 = _interopRequireDefault(_lodash);

var _provinceData = require('./provinceData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Option = _beeSelect2["default"].Option;

var propTypes = {
    defaultValue: _propTypes2["default"].object,
    value: _propTypes2["default"].object,
    onChange: _propTypes2["default"].func,
    provinceData: _propTypes2["default"].array,
    lang: _propTypes2["default"].string,
    disabled: _propTypes2["default"].bool, //设置组件是否被禁用；
    disabledProvinceArr: _propTypes2["default"].array, //设置禁用的省份
    disabledCityArr: _propTypes2["default"].array, //设置禁用的地级市
    disabledAreaObj: _propTypes2["default"].object, //设置不可用的区域；
    allowClear: _propTypes2["default"].bool //设置城市选择框是否可以被清除；
};
var defaultProps = {
    defaultValue: _provinceData.zh.defaultValue,
    value: _provinceData.zh.defaultValue,
    onChange: function onChange() {},
    provinceData: _provinceData.zh.provinceData,
    lang: 'zh_CN',
    disabled: false,
    allowClear: false,
    disabledProvinceArr: [],
    disabledCityArr: [],
    disabledAreaObj: null
};

var CitySelect = function (_Component) {
    _inherits(CitySelect, _Component);

    function CitySelect(props) {
        _classCallCheck(this, CitySelect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _initialiseProps.call(_this);

        var provinceData = props.provinceData,
            disabledProvinceArr = props.disabledProvinceArr,
            disabledCityArr = props.disabledCityArr,
            disabledAreaObj = props.disabledAreaObj,
            lang = props.lang;

        if (props.lang === 'zh_TW') {
            provinceData = _provinceData.tw.provinceData;
        } else if (props.lang === 'en_US') {
            provinceData = _provinceData.en.provinceData;
        }
        _this.state = {
            provinceIndex: 0,
            cityIndex: 0,
            province: '北京',
            secondCity: provinceData[0].city[0].name,
            secondArea: provinceData[0].city[0].area[0],
            provinceData: _this.buildInitDataArr(provinceData, disabledProvinceArr, lang),
            cities: _this.buildInitDataArr(provinceData[0].city, disabledCityArr, lang),
            areas: _this.buildAreaInitData(provinceData[0].city[0].area, provinceData[0].name, disabledAreaObj, lang)
        };
        return _this;
    }

    CitySelect.prototype.componentDidMount = function componentDidMount() {
        var _props = this.props,
            _defaultValue = _props.defaultValue,
            value = _props.value,
            lang = _props.lang,
            disabledProvinceArr = _props.disabledProvinceArr,
            disabledCityArr = _props.disabledCityArr,
            disabledAreaObj = _props.disabledAreaObj;

        var provinceData = this.state.provinceData;
        if (lang === 'zh_TW') {
            provinceData = _provinceData.tw.provinceData;
            _defaultValue = _provinceData.tw.defaultValue;
        } else if (lang === 'en_US') {
            provinceData = _provinceData.en.provinceData;
            _defaultValue = _provinceData.en.defaultValue;
        }
        var defaultValue = value ? value : _defaultValue;
        var province = defaultValue.province;
        var provinceIndex = this.getIndex('province', defaultValue.province);
        var cityIndex = this.getIndex('city', defaultValue.city, provinceIndex);

        provinceIndex = provinceIndex < 0 ? 0 : provinceIndex;
        cityIndex = cityIndex < 0 ? 0 : cityIndex;

        var secondCity = defaultValue.city;
        var secondArea = defaultValue.area;
        var provinceInitData = this.buildInitDataArr(provinceData, disabledProvinceArr, lang);
        var citiesInitData = this.buildInitDataArr(provinceInitData[provinceIndex].city, disabledCityArr, lang);
        var areasInitData = this.buildAreaInitData(citiesInitData[cityIndex].area, citiesInitData[cityIndex].name, disabledAreaObj, lang);

        this.setState({
            province: province,
            provinceIndex: provinceIndex, //被选中省的下标
            cityIndex: cityIndex, //被选中市的下标
            cities: citiesInitData,
            secondCity: secondCity,
            areas: areasInitData,
            secondArea: secondArea,
            provinceData: provinceInitData
        });
    };

    CitySelect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!nextProps.value) return;
        var _props$value = this.props.value,
            oldProvince = _props$value.province,
            oldCity = _props$value.city,
            oldArea = _props$value.area;
        var _nextProps$value = nextProps.value,
            province = _nextProps$value.province,
            city = _nextProps$value.city,
            area = _nextProps$value.area;
        // if(province !== oldProvince || city !== oldCity || area !== oldArea) {
        //     this.setState({
        //         province,
        //         secondCity: city,
        //         secondArea: area
        //     });
        //     this.handleProvinceChange(province, city, area);
        // }

        if (province !== oldProvince) {
            this.setState({
                province: province
            });
            return this.handleProvinceChange(province, city, area);
        }
        if (city !== oldCity) {
            this.setState({
                secondCity: city
            });
            return this.handleCityChange(city);
        }
        if (area !== oldArea) {
            this.setState({
                secondArea: area
            });
            this.onSecondAreaChange(area);
        }
    };

    /**
     * 函数功能：重新构建 省市和区域的初始值；
     * @param originalArr  原始数据；
     * @param disabledCityArr  对应禁用的数据；
     * @param lang 获取语言类型；
     *  */


    /**
     * 构建区域所在的基本数据；
     * @param areaArr 当前区域原始数据；
     * @param cityName  当前区域所在的城市；
     * @param disabledAreaObj 设置的不可选中的地域数据；
     * @param lang 获取语言类型；
     * */


    CitySelect.prototype.render = function render() {
        var _this2 = this;

        var _state = this.state,
            provinceData = _state.provinceData,
            cities = _state.cities,
            areas = _state.areas;


        var provinceOptions = provinceData.map(function (province, index) {
            if (province.disabled) {
                return _react2["default"].createElement(
                    Option,
                    { key: province.name, disabled: true },
                    province.name
                );
            } else {
                return _react2["default"].createElement(
                    Option,
                    { key: province.name },
                    province.name
                );
            }
        });
        var cityOptions = cities.map(function (city, index) {
            if (city.disabled) {
                return _react2["default"].createElement(
                    Option,
                    { key: city.name, disabled: true },
                    city.name
                );
            } else {
                return _react2["default"].createElement(
                    Option,
                    { key: city.name },
                    city.name
                );
            }
        });

        var areaOptions = areas.map(function (area, index) {
            if (area.disabled) {
                return _react2["default"].createElement(
                    Option,
                    { key: area.name, disabled: true },
                    area.name
                );
            } else {
                return _react2["default"].createElement(
                    Option,
                    { key: area.name },
                    area.name
                );
            }
        });
        return _react2["default"].createElement(
            'div',
            { className: (0, _classnames2["default"])("u-city-select", this.props.className) },
            _react2["default"].createElement(
                _beeSelect2["default"],
                {
                    value: this.state.province,
                    className: 'province',
                    disabled: this.props.disabled,
                    allowClear: this.state.province && this.props.allowClear,
                    onChange: function onChange(value) {
                        return _this2.handleProvinceChange(value);
                    } },
                provinceOptions
            ),
            _react2["default"].createElement(
                _beeSelect2["default"],
                {
                    value: this.state.secondCity,
                    disabled: this.props.disabled,
                    allowClear: this.state.secondCity && this.props.allowClear,
                    className: 'city',
                    onChange: function onChange(value) {
                        return _this2.handleCityChange(value);
                    } },
                cityOptions
            ),
            _react2["default"].createElement(
                _beeSelect2["default"],
                {
                    value: this.state.secondArea,
                    className: 'area',
                    allowClear: this.state.secondArea && this.props.allowClear,
                    disabled: this.props.disabled,
                    onChange: function onChange(value) {
                        return _this2.onSecondAreaChange(value);
                    } },
                areaOptions
            )
        );
    };

    return CitySelect;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.buildInitDataArr = function (originalArr, disabledCityArr, lang) {
        var newDataArr = JSON.parse(JSON.stringify(originalArr));
        disabledCityArr = JSON.parse(JSON.stringify(disabledCityArr));
        newDataArr.forEach(function (newDataArr, index, obj) {
            newDataArr.disabled = false;
            var provinceName = newDataArr.name;
            if (disabledCityArr.length > 0) {
                for (var i = 0; i < disabledCityArr.length; i++) {
                    if (lang === "en_US") {
                        if (provinceName.toLowerCase() === disabledCityArr[i].toLowerCase()) {
                            newDataArr.disabled = true;
                        }
                    } else {
                        if (provinceName === disabledCityArr[i]) {
                            newDataArr.disabled = true;
                        }
                    }
                }
            }
        });
        return newDataArr;
    };

    this.buildAreaInitData = function (areaArr, cityName, disabledAreaObj, lang) {
        var newArr = [];
        for (var i = 0; i < areaArr.length; i++) {
            var jsonItem = {};
            jsonItem.name = areaArr[i];
            jsonItem.disabled = false;
            if (disabledAreaObj != undefined && disabledAreaObj[cityName] != undefined) {
                var disabledAreaArr = disabledAreaObj[cityName];
                for (var j = 0; j < disabledAreaArr.length; j++) {
                    if (lang === "en_US") {
                        if (areaArr[i].toLowerCase() === disabledAreaArr[j].toLowerCase()) {
                            jsonItem.disabled = true;
                        }
                    } else {
                        if (areaArr[i] === disabledAreaArr[j]) {
                            jsonItem.disabled = true;
                        }
                    }
                }
            }
            newArr.push(jsonItem);
        }
        return newArr;
    };

    this.getIndex = function (type, name, provinceIndex) {
        var provinceData = _this3.state.provinceData;
        var provinceI = provinceIndex || _this3.state.provinceIndex;
        provinceI = provinceI < 0 ? 0 : provinceI;
        switch (type) {
            case 'province':
                return (0, _lodash2["default"])(provinceData, function (province) {
                    return province.name === name;
                });
            case 'city':
                return (0, _lodash2["default"])(provinceData[provinceI].city, function (city) {
                    return city.name === name;
                });
        }
    };

    this.handleProvinceChange = function (value, cityValue, areaValue) {
        value = value ? value : '';
        var city = '',
            area = '',
            index = 0,
            citesInitArr = [],
            areasInitData = [];
        if (value !== '') {
            var provinceData = _this3.state.provinceData;
            var _props2 = _this3.props,
                disabledCityArr = _props2.disabledCityArr,
                disabledAreaObj = _props2.disabledAreaObj,
                lang = _props2.lang;

            index = _this3.getIndex('province', value);
            if (index > -1) {
                citesInitArr = _this3.buildInitDataArr(provinceData[index].city, disabledCityArr, lang);
                areasInitData = _this3.buildAreaInitData(citesInitArr[0].area, citesInitArr[0].name, disabledAreaObj, lang);
                city = cityValue ? cityValue : citesInitArr[0].name;
                area = areaValue ? areaValue : areasInitData[0].name;
            }
        }
        _this3.setState({
            province: value,
            cities: citesInitArr,
            secondCity: city,
            provinceIndex: index,
            areas: areasInitData,
            secondArea: area
        });
        _this3.onChange(value, city, area);
    };

    this.handleCityChange = function (value) {
        value = value ? value : '';
        var index = '',
            area = '',
            areasInitData = [];
        var _state2 = _this3.state,
            province = _state2.province,
            cities = _state2.cities;
        var _props3 = _this3.props,
            disabledAreaObj = _props3.disabledAreaObj,
            lang = _props3.lang;

        if (value !== '') {
            index = _this3.getIndex('city', value);
            if (index > -1) {
                areasInitData = _this3.buildAreaInitData(cities[index].area, cities[index].name, disabledAreaObj, lang);
                area = areasInitData[0].name;
            }
        }
        _this3.setState({
            secondCity: value,
            areas: areasInitData,
            secondArea: area,
            cityIndex: value
        });
        _this3.onChange(province, value, area);
    };

    this.onSecondAreaChange = function (value) {
        value = value ? value : '';
        var _state3 = _this3.state,
            province = _state3.province,
            secondCity = _state3.secondCity;

        _this3.setState({
            secondArea: value
        });
        _this3.onChange(province, secondCity, value);
    };

    this.onChange = function (province, city, area) {
        _this3.props.onChange({
            province: province,
            city: city,
            area: area
        });
    };
};

CitySelect.propTypes = propTypes;
CitySelect.defaultProps = defaultProps;
exports["default"] = CitySelect;
module.exports = exports['default'];