import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'bee-pagination';
import { paginationLocale } from '../../utils/locale'
const propTypes = {
  onSelect: PropTypes.func,
  pageCount: PropTypes.number,
  currPageIndex: PropTypes.number,
  show: PropTypes.bool
};

const defaultProps = {
  pageCount: 0,
  currPageIndex: 0,
  onSelect: () => { },
  show: true
}

class PaginationWrap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  onSelect = (e) => {
    if (e.target.type === 'button' && e.target.dataset.paginationButton) {
      let { onSelect } = this.props;
      onSelect(e.target.dataset.paginationButton)
    }
  }
  render() {
    let { currPageIndex, pageCount, show, totalElements, lang = 'zh_CN', onSelect } = this.props;
    return (
      <div className="ref-pagination">
        <Pagination
          style={{ display: show ? '' : 'none' }}
          pagecount={pageCount}
          first
          last
          prev
          next
          boundaryLinks
          className={pageCount > 0 ? '' : `  ref-multiple-table-pagination-hide`}
          items={pageCount}
          total={totalElements}
          activePage={currPageIndex}
          onSelect={onSelect}
          locale={paginationLocale(lang)}
          maxButtons={3}
        />
      </div>
    )
  }
}
PaginationWrap.propTypes = propTypes;
PaginationWrap.defaultProps = defaultProps;
export default PaginationWrap;