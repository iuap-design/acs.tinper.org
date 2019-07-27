import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from 'bee-table';
import bigData from 'bee-table/build/lib/bigData';
//import Nodata from './noData';
import dragColumn from 'bee-table/build/lib/dragColumn.js';
import myBrowser from '../utils';

const DragTable = dragColumn(Table);
const BigDataTable = bigData(DragTable);

export default class NCTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns,
      prevWidth: 0,
      json: {},
      totalColums: props.totalColums || []
    };
    /***获取当前浏览器类型*/
    this.myBrowser = myBrowser();
    this.haveFixedCol = true;
    this.scrollbar = true;
  }

  componentWillMount() {
    let callback = (json, bool) => {
      if (bool) {
        this.setState({ json }, () => {
          //console.log('多语加载完成')
        });
      }
    };
    // getPlatformLang({ moduleId: 'base_table', callback });
  }

  componentDidMount() {
    this.props.fixedHeader && document.addEventListener('scroll', this.handleScroll);
    // this.calcFixed(this.props);
    /*合计行start*/
    const { isTotal, columns } = this.props; //最新优化
    if (isTotal) {
      //最新优化
      let bodyArea = this.table && this.table.querySelector('.u-table-body');
      let headerArea = this.table && this.table.querySelector('.u-table-content .u-table-scroll .u-table-header');
      let totalArea = this.total && this.total.querySelector('.u-table-body');
      headerArea = headerArea || bodyArea;
      // console.log(bodyArea,headerArea,totalArea)
      if (bodyArea) {
        bodyArea.addEventListener('scroll', () => {
          // 表体滚动条事件
          if (totalArea) totalArea.scrollLeft = bodyArea.scrollLeft;
        });
      }
      if (totalArea) {
        totalArea.addEventListener('scroll', () => {
          //合计行滚动条事件
          bodyArea.scrollLeft = totalArea.scrollLeft;
          headerArea.scrollLeft = totalArea.scrollLeft;
          // console.log(bodyArea, headerArea, totalArea)
        });
      }
      if (headerArea) {
        headerArea.addEventListener('scroll', () => {
          //表头滚动条事件
          try {
            if (totalArea) totalArea.scrollLeft = headerArea.scrollLeft;
          } catch (e) {
            console.warn(e);
          }
        });
      }
      //最新优化
    }
    /*合计行end */
  }

  /***判断是否有滚动条***/
  haveScrollbar = () => {
    let outbody = document.querySelector(
      '.total-table-wrapper > .u-table-content > .u-table-scroll > div:not(.u-table-footer) .u-table-body'
    );
    if (outbody) {
      let innerbody = outbody.querySelector('.u-table-tbody');

      if (innerbody.getBoundingClientRect().height > outbody.getBoundingClientRect().height) {
        this.scrollbar = true;
      } else {
        this.scrollbar = false;
      }
    }
  };

  /***判断是否有右侧固定列*/
  fixedCol = columns => {
    this.haveFixedCol = columns.some(item => item.fixed == 'right');
  };

  componentDidUpdate(prevProps, prevState) {
    // addEventListener
    this.props.fixedHeader && document.addEventListener('scroll', this.handleScroll);
    const { isTotal } = this.props; //最新优化
    let bodyArea = this.table && this.table.querySelector('.u-table-body');
    let headerArea = this.table && this.table.querySelector('.u-table-content .u-table-scroll .u-table-header');
    let totalArea = this.total && this.total.querySelector('.u-table-body');
    if (isTotal) {
      //最新优化
      if (bodyArea) {
        bodyArea.addEventListener('scroll', () => {
          // 表体滚动条事件
          if (totalArea) totalArea.scrollLeft = bodyArea.scrollLeft;
        });
      }
      if (totalArea) {
        totalArea.addEventListener('scroll', () => {
          //合计行滚动条事件
          bodyArea.scrollLeft = totalArea.scrollLeft;
          headerArea.scrollLeft = totalArea.scrollLeft;
          // console.log(bodyArea, headerArea, totalArea)
        });
      }
      if (headerArea) {
        headerArea.addEventListener('scroll', () => {
          //表头滚动条事件
          try {
            if (totalArea) totalArea.scrollLeft = headerArea.scrollLeft;
          } catch (e) {
            console.warn(e);
          }
        });
      }
      //最新优化
    } else {
      if (bodyArea) {
        bodyArea.addEventListener('scroll', null);
      }
      if (totalArea) {
        totalArea.addEventListener('scroll', null);
      }
      if (headerArea) {
        headerArea.addEventListener('scroll', null);
      }
    }
  }

  componentWillReceiveProps(newProps) {
    newProps.fixedHeader && document.addEventListener('scroll', this.handleScroll);
    const { isTotal, totalColums } = newProps;
    //用于解决合计行colums的问题，把props中的赋给state
    let totalflag = false;
    if (totalColums) {
      if (this.props.totalColums) {
        if (this.props.totalColums.length == totalColums.length) {
          totalColums.map((item, index) => {
            if (
              item.width &&
              this.props.totalColums[index] &&
              this.props.totalColums[index].width &&
              item.width != this.props.totalColums[index].width
            ) {
              totalflag = true;
            }
          });
        } else {
          totalflag = true;
        }
      }else{
        totalflag = true;
      }
      if (totalflag) {
        this.state.totalColums = totalColums;
      }
      let bodyArea = this.table && this.table.querySelector('.u-table-body');
      let headerArea = this.table && this.table.querySelector('.u-table-content .u-table-scroll .u-table-header');
      let totalArea = this.total && this.total.querySelector('.u-table-body');
      if (isTotal) {
        //最新优化
        if (bodyArea) {
          bodyArea.addEventListener('scroll', () => {
            // 表体滚动条事件
            if (totalArea) {
              totalArea.scrollLeft = bodyArea.scrollLeft;
            }
          });
        }
        if (totalArea) {
          totalArea.addEventListener('scroll', () => {
            //合计行滚动条事件
            if (bodyArea) {
              bodyArea.scrollLeft = totalArea.scrollLeft;
            }
            if (headerArea) {
              headerArea.scrollLeft = totalArea.scrollLeft;
            }
          });
        }
        if (headerArea) {
          headerArea.addEventListener('scroll', () => {
            //表头滚动条事件
            if (totalArea) {
              totalArea.scrollLeft = headerArea.scrollLeft;
            }
          });
        }
        //最新优化
      } else {
        if (bodyArea) {
          bodyArea.addEventListener('scroll', null);
        }
        if (totalArea) {
          totalArea.addEventListener('scroll', null);
        }
        if (headerArea) {
          headerArea.addEventListener('scroll', null);
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.fixedHeader && document.removeEventListener('scroll', this.handleScroll);
    let bodyArea = this.table && this.table.querySelector('.u-table-body');
    let headerArea = this.table && this.table.querySelector('.u-table-content .u-table-scroll .u-table-header');
    let totalArea = this.total && this.total.querySelector('.u-table-body');
    if (bodyArea) {
      bodyArea.addEventListener('scroll', null);
    }
    if (totalArea) {
      totalArea.addEventListener('scroll', null);
    }
    if (headerArea) {
      headerArea.addEventListener('scroll', null);
    }
  }

  handleScroll = () => {
    if (this.table) {
      let { top, height, left } = this.table.getBoundingClientRect();
      if (top < 0 && top > -height) {
        this.headerFixed = true;
        this.left = left;
      } else {
        this.headerFixed = false;
      }
      if (this.state.headerFixed !== this.headerFixed) {
        this.setState({
          headerFixed: this.headerFixed
        });
      }
    }
  };

  noData = () => {
    let { json } = this.state;
    return (
      <div className="no-data-placeholder">
        <i className="no-data" />
        <span className="no-data-title">{json['base-table-0001']}</span>
      </div>
    );
  };

  onDropBorder = () => {
    const { totalColums } = this.state;
    let th = this.table.querySelectorAll('.u-table-scroll .u-table-header colgroup col');
    if (totalColums) {
      totalColums.map((item, index) => {
        item.width = th[index].style.width;
      });
    }
    this.setState({
      totalColums
    });
  };

  handleFooter = () => {
    const {
      //实现合计行
      totalData
    } = this.props;
    return (
      <Table
        className={`total-row ${this.scrollbar && !this.haveFixedCol && 'fix-total-scroll'}`}
        height={35}
        ref={dom => {
          this.total = ReactDOM.findDOMNode(dom);
        }}
        rowKey="total"
        data={totalData}
        columns={[...this.state.totalColums]}
        showHeader={false}
        headerScroll={false}
      />
    );
  };

  render() {
    const {
      //实现合计行
      totalData,
      totalColums,
      isTotal,
      fixedContainer,
      className,
      data,
      scroll,
      isDrag = true,
      lazyload = true,
      isTree = false
    } = this.props;
    let multiHeader =
        Array.isArray(this.props.columns) &&
        this.props.columns.some(e => Array.isArray(e.children) && e.children.length),
      dragborder = isDrag && !multiHeader;
    const ThisTable = lazyload && scroll && scroll.y ? BigDataTable : DragTable;
    let tableHaveData = Array.isArray(data) && data.length;
    this.fixedCol(this.props.columns);
    return [
      this.state.headerFixed &&
        ReactDOM.createPortal(
          <Table
            ref={dom => {
              this.fixedTableHeader = ReactDOM.findDOMNode(dom);
            }}
            className="fixed-table-header"
            columns={[...this.state.columns]}
            data={[]}
            style={{
              position: 'fixed',
              top: 0,
              left: this.left,
              width: this.table && this.table.offsetWidth,
              zIndex: 300
            }}
            emptyText={() => {
              return null;
            }}
            scroll={this.props.scroll}
            onDropBorder={this.onDropBorder}
            // originWidth={true}
          />,
          fixedContainer
        ),

      <ThisTable
        loadBuffer={2}
        isTree={isTree}
        dragborder={dragborder}
        ref={dom => {
          if (dom) {
            this.table = ReactDOM.findDOMNode(dom);
            this.haveScrollbar();
          }
        }}
        className={`nc-table ${multiHeader || dragborder ? 'border-table-head-wrapper' : ''} ${
          isTotal ? 'total-table-wrapper' : ''
        } ${
          tableHaveData
            ? 'nc-table-data'
            : isTotal
            ? 'nc-table-body-scroll'
            : ''
        }  ${dragborder && 'nc-drag-border'}  ${(this.myBrowser == 'IE' || this.myBrowser == 'Firefox') &&
          'IE-fix'} ${className}`}
        //如果页面没有数据，则不显示合计行 liuming 2019/2/19
        footer={isTotal && this.handleFooter}
        bodyStyle={{minHeight:'160px'}}
        {...this.props}
        headerScroll={ tableHaveData?false:(isTotal?false:true)}
        // columns={[ ...this.state.columns ]}
        // emptyText={Nodata}
        emptyText={this.noData}
        onDropBorder={this.onDropBorder}
        // originWidth={true}
      />
    ];
  }
}

NCTable.defaultProps = {
  fixedContainer: document.body
};
