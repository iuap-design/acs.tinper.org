import React, { Component } from 'react';
import classnames from 'classnames';
import Nodata from './nc_Table/noData';
import { isFunction } from './utils';
import Collapse from 'bee-collapse';
import TabHotKey from './hotkeys';
import Button from 'bee-button';
import ButtonGroup from 'bee-button-group';

let maxTop = 0;
let height = 0;

const propTypes = {
  showMore: PropTypes.bool, //是否展开详细信息
  isMaximized: PropTypes.bool, //是否最大化显示
  tabs: PropTypes.array, //折叠区域左侧的 tabs 列表
}

const defaultProps = {
  addRow: () => {},
  delRow: () => {},
  pasteRow: () => {}
}
class FoldableTabs extends Component {
  constructor(props) {
    super(props);
    let defaultActiveKey = props.tabs && props.tabs.length && props.tabs[0].key || '';
    this.state = {
      showMore : props.showMore,
      isMaximized : props.isMaximized,
      activeKey : defaultActiveKey
    }
  }

  componentWillReceiveProps(nextProps) {
    const { 
      showMore: oldShowMore, 
      activeKey: oldActiveKey ,
      isMaximized: oldIsMaximized
    } = this.props;
    const { 
      showMore: newShowMore, 
      activeKey: newActiveKey,
      isMaximized: newIsMaximized
    } = nextProps;
    if (newShowMore !== oldShowMore) {
      this.setState({
        showMore: newShowMore
      })
    }
    if (newActiveKey !== oldActiveKey) {
      this.setState({
        activeKey: newActiveKey
      })
    }
    if(newIsMaximized !== oldIsMaximized) {
      this.setState({
        isMaximized: newIsMaximized
      })
    }
  }

  changeActiveKey = item => {
    this.props.handleTypeChange && this.props.handleTypeChange(item.key);
  };

  /**
   * 控制主表收起展开
   */
  toggleCardTable(flag = false) {
    let { onHeadAngleToggle } = this.props;
    onHeadAngleToggle && onHeadAngleToggle(flag);
  }

  /**
   * 最大化多表中表格
   */
  openMaxTable(flag) {
    let { openMaxTable } = this.props;
    openMaxTable && openMaxTable(flag);
  }
  //生成表头右侧操作栏
  getTableHead = (toolBtns) => {
    let rs = [];
    rs = toolBtns.map(item=>{
        let {value,bordered,itemtype,btnSize} = item;
        let btn,className = item.className?item.className:'' ;
        if(itemtype === 1 && item.children){
            btn = this.getBtnGroup(item);
        }else{
            btn = <Button size={btnSize} bordered={bordered} {...item} className={className} >
                    {value}
                  </Button>
        }
        return btn;
    })
    if (rs.length==0){
      return ''
    }else {
      return (
        <div className="shoulder-definition-area">
            {rs}
        </div>
      )
    }
  }
  //生成按钮组
  getBtnGroup = (btns) => {
    let {bordered,btnSize} = btns;
    let btnGroupItems = btns.children.map((item,index)=>{
      return (
        <Button key={index} size={btnSize} bordered={bordered} onClick={(e) => this.handleClickByOptType(item.operation)}>{item.value}</Button>
      ) 
    })
    return (
      <ButtonGroup>
        {btnGroupItems}
      </ButtonGroup>
    )
  }
  //根据 operation 的值选择相应的事件处理程序
  handleClickByOptType(operation){
    let { addRow, delRow, pasteRow } = this.props;
    switch(operation){
      case 'addRow': //增行
        addRow();
        break;
      case 'delRow': //删行
        delRow();
        break;
      case 'pasteRow': //复制粘贴行
        pasteRow();
        break;
      default:
        break;
    }
  }

  render() {
    let {
      tabs = [], //折叠区域左侧的 tabs 列表
      pageScope,
      moduleId,
      isEdit, //是否为编辑态
      showListView, //是否以列表形式展示
      rows, //表格行数据
      tableScope,
      expandedList,
      ...config
    } = this.props;
    let { showMore,activeKey,isMaximized } = this.state;
    let visibleRows = rows.filter(item => item.status !== '3'); // 界面显示行 分页新加
    const isShow = { display: showMore ? 'block' : 'none' };
    let iconClass = classnames({
      'uf-triangle-right': !showMore,
      'uf-triangle-down': showMore
    });
    // const style = isMaximized ? { style: { width: '100vw' } } : {}; //暂且这样吧  先加个 style={{width: "100vw"}}
    if (showMore && showListView) {
      let lightTabs_header = document.querySelector('#js_lightTabs_header_' + moduleId);
      let lightTabs = document.querySelector('#js_lightTabs_' + moduleId);
      if (lightTabs_header) {
        maxTop = lightTabs_header.getBoundingClientRect().height;
        height = lightTabs.getBoundingClientRect().height;
      }
    }
    console.log('isMaximized: ',isMaximized)
    return (
      <section className="light-tabs">
        <TabHotKey
          tabs={tabs}
          activeKey={activeKey}
          wrapperId={'js_cardTable_' + moduleId}
          headerId={'js_lightTabs_header_' + moduleId}
        />
        <div className="light-tabs-background">
          <header
            className={classnames('light-tabs-header cf', {
              'tabs-header-spread': showMore,
              'tabs-header-pack': !showMore
            })}
            id={'js_lightTabs_header_' + moduleId}
          >
            <div className="light-tabs-header-tabs fl">
              <span
                className={classnames('light-tabs-angle fl', {
                  'angle-show': showMore
                })}
                onClick={() => {
                  //控制主表的收起展开
                  this.toggleCardTable(!showMore);
                }}
              >
                <span className={`iconfont icon table-tabs-icon ${iconClass}`} />
              </span>
              <ul
                className={classnames('tabs-wraps fl', {
                  'single-tab': tabs.length <= 1
                })}
              >
                {tabs.map((item, i) => {
                  if (item.key === activeKey) {
                    return (
                      <li className="active">
                        <a href="javascript:;">{item.label}</a>
                        <span />
                      </li>
                    );
                  } else {
                    return (
                      <li onClick={this.changeActiveKey.bind(this, item)}>
                        <a href="javascript:;">{item.label}</a>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            {/*折叠预览区  功能区 -- 右侧操作按钮*/}
            <div
              className={classnames('tabs-operation fr', {
                'tab-hide': !showMore
              })}
            >
              {/* {isEdit || (config && isFunction(config.hideSwitch) && !config.hideSwitch()) || (
                <span
                  className={`icon iconfont head-icon ${showListView ? 'icon-shituqiehuan' : 'icon-shituliebiaoqiehuan'}`}
                  onClick={() => {
                    //视图切换：表格 <=> 卡片列表
                    // pageScope.cardTable.openListView(moduleId, !showListView);
                  }}
                />
              )} */}
              <span
                className={'icon iconfont  head-icon ' + (isMaximized ? 'uf-minimize' : 'uf-maxmize')}
                onClick={() => {
                  //最大化最小化
                  this.openMaxTable(!isMaximized)
                  // pageScope.cardTable.openMaxTable(moduleId, !isMaximized);
                }}
              />
            </div>
            {/*折叠预览区  功能区 -- 表头工具栏*/}
            {config && config.tableHeadLeft && (
              <div
                className={classnames('tabs-config fl', {
                  'tab-hide': !showMore
                })}
              >
                {config.tableHeadLeft()}
              </div>
            )}
            {config && config.tableHead && (
              <div
                className={classnames('tabs-config fr', {
                  'tab-hide': !showMore
                })}
              >
                {this.getTableHead(config.tableHead)}
              </div>
            )}
          </header>
          {/*折叠预览区  功能区 -- 全预览功能*/}
          {isEdit ||
            (config && isFunction(config.hideSwitch) && !config.hideSwitch()) ||
            (showMore && showListView ? (
              <Collapse in={showListView}>
                <div
                  className="lightapp-component-cardTable-view"
                  style={{
                    maxHeight: isMaximized ? '93%' : `300px`,
                    minHeight: isMaximized ? '' : `300px`,
                    top: isMaximized ? maxTop + 8 : maxTop,
                    width: isMaximized ? 'calc(100vw - 32px)' : '100%'
                  }}
                >
                  <ul className="card-table-expand-wraps">
                    {visibleRows.length ? (
                      visibleRows.map(item => {
                        return expandedList.call(tableScope, moduleId, item, pageScope);
                      })
                    ) : (
                      <li className="no-data-li">
                        <Nodata />
                      </li>
                    )}
                  </ul>
                </div>
              </Collapse>
            ) : null)}
          <footer id={'js_lightTabs_' + moduleId} className="light-tabs-content" style={isShow}>
            {tabs.map((item, i) => {
              console.log(item.key, activeKey,'=====')
              if (item.key === activeKey) {
                return item.render();
              }
            })}
          </footer>
        </div>
      </section>
    );
  }
}

export default FoldableTabs;