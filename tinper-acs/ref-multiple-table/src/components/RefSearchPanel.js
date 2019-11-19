import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Form from "bee-form";
import Label from 'bee-label';
import { Col, Row } from 'bee-layout';
import SearchPanel from 'bee-search-panel';
const { FormItem } = Form;
const AdvancedContainer = SearchPanel.AdvancedContainer;
/**
 * 部分不能通过this.props.form.resetFields()清空的组件，需要传reset方法，在reset方法中自行清空
 */
const propTypes = {
  searchOpen: PropTypes.bool,//是否默认展开，false默认关闭
  title: PropTypes.string,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  show: PropTypes.bool,
  searchPanelLocale: PropTypes.object,
};

const defaultProps = {
  searchOpen: false,
  title: "查询与筛选",
  onSearch: () => { },
  onClear: () => { },
  show: true,
  searchPanelLocale:{
    'title': '查询与筛选',
    'resetName': '重置',
    'searchName': '查询',
    'down':'打开',
    'up':'关闭',
  }
};
const SearchPanelItem = (props) => {
  const { form, ...others } = props;
  let { getFieldProps } = form;
  return (
    <Col md={4} xs={12} sm={12}>
      <div className="formItemCustomed">
        <Label>{others.text}</Label>
        <div className="ref-search-panel-search-item">
          {
            React.cloneElement(others.children, {
              ...getFieldProps(others.name, {
                initialValue: '',
              })
            })
          }
        </div>
      </div>
    </Col>
  )
}

class RefSearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOpen: this.props.searchOpen,
      searchPanelExpand:true,
    };
  }
  onSearchClearClick = () => {
    let { onClear } = this.props;
    this.props.form.resetFields();
    onClear()
  }
  onSearchClick = () => {
    let { onSearch } = this.props;
    this.props.form.validateFields((err, values) => {
      onSearch(values);
    });
  }
  searchPanelExpand = () =>{
    this.setState({
      searchPanelExpand:!this.state.searchPanelExpand
    })
  }
  render() {
    const { form, title, show,searchPanelLocale } = this.props;
    return (
      <SearchPanel
        locale={searchPanelLocale}
        className={`ref-search-panel${show ? '' : '-hide'}`}
        clsPrefix='u-search'
        showIcon={true}
        onReset={this.onSearchClearClick}
        onSearch={this.onSearchClick}
        expanded={this.state.searchPanelExpand}
        showOperation={true}
        onChange={this.searchPanelExpand}

      >
      <AdvancedContainer>
          <Form>
            <Row>
              {
                React.Children.map(this.props.children, (item) => {
                  return React.cloneElement(item, {
                    form
                  });
                })
              }
            </Row>
          </Form>
        </AdvancedContainer>
      </SearchPanel>
    )
  }
}
RefSearchPanel.propTypes = propTypes;
RefSearchPanel.defaultProps = defaultProps;
export {
  SearchPanelItem
}
export default Form.createForm()(RefSearchPanel);
