
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'bee-select';
import findIndex from 'lodash.findindex';
import { zh, en, tw } from './provinceData';
const Option = Select.Option;

const propTypes = {
    defaultValue: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func,
    provinceData: PropTypes.array,
    lang: PropTypes.string,
    disabled: PropTypes.bool,  //设置组件是否被禁用；
    disabledProvinceArr: PropTypes.array, //设置禁用的省份
    disabledCityArr: PropTypes.array,  //设置禁用的地级市
    disabledAreaObj: PropTypes.object //设置不可用的区域；
}
const defaultProps = {
    defaultValue: zh.defaultValue,
    value: null,
    onChange: () => { },
    provinceData: zh.provinceData,
    lang: 'zh_CN',
    disabled: false,
    disabledProvinceArr: [],
    disabledCityArr: [],
    disabledAreaObj: null
}
class CitySelect extends Component {
    constructor(props) {
        super(props);
        let { provinceData, disabledProvinceArr, disabledCityArr, disabledAreaObj, lang } = props;
        if (props.lang == 'zh_TW') {
            provinceData = tw.provinceData;
        } else if (props.lang == 'en_US') {
            provinceData = en.provinceData
        }
        this.state = {
            provinceIndex: 0,
            cityIndex: 0,
            province: '北京',
            secondCity: provinceData[0].city[0].name,
            secondArea: provinceData[0].city[0].area[0],
            provinceData: this.buildInitDataArr(provinceData, disabledProvinceArr, lang),
            cities: this.buildInitDataArr(provinceData[0].city, disabledCityArr, lang),
            areas: this.buildAreaInitData(provinceData[0].city[0].area, provinceData[0].name, disabledAreaObj, lang),
        }
    }
    componentDidMount() {
        let { defaultValue: _defaultValue, value, lang, disabledProvinceArr, disabledCityArr, disabledAreaObj } = this.props;
        let provinceData = this.state.provinceData;
        if (lang == 'zh_TW') {
            provinceData = tw.provinceData;
            _defaultValue = tw.defaultValue;
        } else if (lang == 'en_US') {
            provinceData = en.provinceData
            _defaultValue = en.defaultValue;
        }
        let defaultValue = value ? value : _defaultValue;
        let province = defaultValue.province;
        let provinceIndex = this.getIndex('province', defaultValue.province);
        let cityIndex = this.getIndex('city', defaultValue.city, provinceIndex);

        provinceIndex = provinceIndex < 0 ? 0 : provinceIndex;
        cityIndex = cityIndex < 0 ? 0 : cityIndex;

        let secondCity = defaultValue.city;
        let secondArea = defaultValue.area;
        let provinceInitData = this.buildInitDataArr(provinceData, disabledProvinceArr, lang);
        let citiesInitData = this.buildInitDataArr(provinceInitData[provinceIndex].city, disabledCityArr, lang);
        let areasInitData = this.buildAreaInitData(citiesInitData[cityIndex].area, citiesInitData[cityIndex].name, disabledAreaObj, lang);

        this.setState({
            province,
            provinceIndex,  //被选中省的下标
            cityIndex,      //被选中市的下标
            cities: citiesInitData,
            secondCity: secondCity,
            areas: areasInitData,
            secondArea,
            provinceData: provinceInitData
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.value) return;
        const { province, city, area } = nextProps.value;
        this.setState({
            province,
            secondCity: city,
            secondArea: area
        })
        this.handleProvinceChange(province);
    }

    /**
     * 函数功能：重新构建 省市和区域的初始值；
     * @param originalArr  原始数据；
     * @param disabledCityArr  对应禁用的数据；
     * @param lang 获取语言类型；
     *  */
    buildInitDataArr = (objoriginalArr, disabledCityArr, lang) => {
        let newDataArr = JSON.parse(JSON.stringify(objoriginalArr));
        disabledCityArr = JSON.parse(JSON.stringify(disabledCityArr))
        newDataArr.forEach(function (newDataArr, index, obj) {
            newDataArr.disabled = false;
            let provinceName = newDataArr.name;
            if (disabledCityArr.length > 0) {
                for (let i = 0; i < disabledCityArr.length; i++) {
                    if (lang == "en_US") {
                        if (provinceName.toLowerCase() == disabledCityArr[i].toLowerCase()) {
                            newDataArr.disabled = true;
                        }
                    } else {
                        if (provinceName === disabledCityArr[i]) {
                            newDataArr.disabled = true;
                        }
                    }
                }
            }
        })
        return newDataArr;
    }

    /**
     * 构建区域所在的基本数据；
     * @param areaArr 当前区域原始数据；
     * @param cityName  当前区域所在的城市；
     * @param disabledAreaObj 设置的不可选中的地域数据；
     * @param lang 获取语言类型；
     * */
    buildAreaInitData = (areaArr, cityName, disabledAreaObj, lang) => {
        let newArr = [];
        for (let i = 0; i < areaArr.length; i++) {
            let jsonItem = {};
            jsonItem.name = areaArr[i];
            jsonItem.disabled = false;
            if (disabledAreaObj != undefined && disabledAreaObj[cityName] != undefined) {
                let disabledAreaArr = disabledAreaObj[cityName];
                for (let j = 0; j < disabledAreaArr.length; j++) {
                    if (lang == "en_US") {
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
    }

    getIndex = (type, name, provinceIndex) => {
        let provinceData = this.state.provinceData;
        let provinceI = provinceIndex || this.state.provinceIndex;
        provinceI = provinceI < 0 ? 0 : provinceI;
        switch (type) {
            case 'province':
                return findIndex(provinceData, function (province) {
                    return province.name === name;
                });
                break;
            case 'city':
                return findIndex(provinceData[provinceI].city, function (city) {
                    return city.name === name;
                });
                break;
        }
    }
    handleProvinceChange = (value) => {
        let { provinceData } = this.state;
        let { disabledCityArr, disabledAreaObj, lang } = this.props;
        let index = this.getIndex('province', value);
        let citesInitArr = this.buildInitDataArr(provinceData[index].city, disabledCityArr, lang);
        let areasInitData = this.buildAreaInitData(citesInitArr[0].area, citesInitArr[0].name, disabledAreaObj, lang);
        let city = citesInitArr[0].name;
        let area = areasInitData[0].name;
        this.setState({
            province: value,
            cities: citesInitArr,
            secondCity: city,
            provinceIndex: index,
            areas: areasInitData,
            secondArea: area,
        });
        this.onChange(value, city, area)
    }
    handleCityChange = (value) => {
        let { cities } = this.state;
        let { disabledAreaObj, lang } = this.props;
        let index = this.getIndex('city', value);
        let areasInitData = this.buildAreaInitData(cities[index].area, cities[index].name, disabledAreaObj, lang);
        let area = areasInitData[0].name;
        this.setState({
            secondCity: value,
            areas: areasInitData,
            secondArea: area,
            cityIndex: value
        });
        this.onChange(undefined, value, area);
    }
    onSecondAreaChange = (value) => {
        this.setState({
            secondArea: value,
        });
        this.onChange(undefined, undefined, value);
    }
    onChange = (province, city, area) => {
        this.props.onChange({
            province: province || this.state.province,
            city: city || this.state.secondCity,
            area: area
        })
    }

    render() {
        let { provinceData, cities, areas } = this.state;
        const provinceOptions = provinceData.map((province, index) => {
            if (province.disabled) {
                return (<Option key={province.name} disabled>{province.name}</Option>);
            } else {
                return (<Option key={province.name} >{province.name}</Option>)
            }
        });
        const cityOptions = cities.map((city, index) => {
            if (city.disabled) {
                return (<Option key={city.name} disabled>{city.name}</Option>);
            } else {
                return (<Option key={city.name} >{city.name}</Option>)
            }
        });

        const areaOptions = areas.map((area, index) => {
            if (area.disabled) {
                return (<Option key={area.name} disabled>{area.name}</Option>);
            } else {
                return (<Option key={area.name} >{area.name}</Option>)
            }
        });

        return (
            <div className={classNames("u-city-select", this.props.className)}>
                <Select
                    value={this.state.province}
                    className="province"
                    disabled={this.props.disabled}
                    onChange={this.handleProvinceChange}>
                    {provinceOptions}
                </Select>
                <Select
                    value={this.state.secondCity}
                    disabled={this.props.disabled}
                    className="city"
                    onChange={this.handleCityChange}>
                    {cityOptions}
                </Select>
                <Select
                    value={this.state.secondArea}
                    className="area"
                    disabled={this.props.disabled}
                    onChange={this.onSecondAreaChange}>
                    {areaOptions}
                </Select>
            </div>
        );
    }
}
CitySelect.propTypes = propTypes;
CitySelect.defaultProps = defaultProps;
export default CitySelect;