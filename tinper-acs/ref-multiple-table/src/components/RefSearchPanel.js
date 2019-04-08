import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SearchPanel from 'bee-search-panel';
import 'bee-search-panel/build/SearchPanel.css';
import { Form, Label,Col,Row} from 'tinper-bee';
const { FormItem } = Form;
import './RefSearchPanel.less';
/**
 * 部分不能通过this.props.form.resetFields()清空的组件，需要传reset方法，在reset方法中自行清空
 */
const propTypes = {
  searchOpen: PropTypes.bool,//是否默认展开，false默认关闭
  title: PropTypes.string,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  show: PropTypes.bool
};

const defaultProps = {
  searchOpen: false,
  title: "查询与筛选",
  onSearch: () => { },
  onClear: () => { },
  show: true
};
const SearchPanelItem = (props) => {
  const { form, ...others } = props;
  let { getFieldProps } = form;
  return (
    <Col md={4} xs={12} sm={10}>
      <FormItem>
        <Label>{others.text}:</Label>
        <div className="ref-search-panel-search-item">
          {
            React.cloneElement(others.children, {
              ...getFieldProps(others.name, {
                initialValue: '',
              })
            })
          }
        </div>
      </FormItem>
    </Col>
  )
}

class RefSearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOpen: this.props.searchOpen
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
  render() {
    const { form, title, show } = this.props;
    return (
      <SearchPanel
        className={`ref-search-panel${show ? '' : '-hide'}`}
        clsPrefix='u-search'
        title={title}
        showIcon={true}
        onReset={this.onSearchClearClick}
        onSearch={this.onSearchClick}
        defaultExpanded={true}

      >
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
