import React, { Component } from 'react';
import classnames from 'classnames';
import FoldableTabs from './FoldableTabs';
import SimpleTable from './SimpleTable';
import {checkHasKey} from './utils';

const propTypes = {
    showMore: PropTypes.bool, //是否展开详细信息
    showMax: PropTypes.bool, //是否最大化
    moduleId: PropTypes.string, //meta的id号
    config: PropTypes.object, //表格配置项
    tabLists: PropTypes.array, //卡表的 tabs 页签
    showListView: PropTypes.bool, //是否以列表形式展示
    onTabChange: PropTypes.func, //切换 Tab 时触发的回调
}

const defaultProps = {
    showMore: true,
    showMax: false,
    moduleId: '',
    config: {},
    tabLists: [],
    showListView: false,
    onTabChange: () => {}
}

class CardTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 'browse', //browse(浏览态)、edit(编辑态)
            activeKey: '', //标识当前卡表的选中项
            showMore: props.showMore, //卡表是否展开
        }
    }

    //activeKey 改变时触发的回调
    onTypeChange = (item) => {
        let {onTabChange} = this.props;
        this.setState({
            activeKey: item
        });
        onTabChange && isFunction(onTabChange) && onTabChange();
    }

    //卡表收起/展开状态改变时的回调
    onHeadAngleToggle = (showMore) => {
        this.setState({ showMore });
    }

    render(){
        let {
            showMax,
            config,
            moduleId,
            columns,
            data: dataRows,
            tabLists,
            showListView
        } = this.props;

        let { status,showMore,activeKey } = this.state;

        let tabsOther = tabLists.map((item, index) => {
            let { code, items, name } = item;
            // let curColumn = columns[code];
            // if (config && config.showCheck && !checkHasKey(meta.items, 'checkbox')) {
            //   curColumn = [...checkColumn, ...curColumn];
            // }
            //multiSelect
            return {
                key: code,
                label: name,
                render: () => (
                    <SimpleTable
                    columns={columns}
                    data={dataRows}
                    multiSelect={config.showCheck}
                    bodyStyle={{minHeight:'auto'}}
                    />
                )
            };
        });

        return(
            <main
            className={classnames('lightapp-component-cardTable', {
                'lightapp-component-cardTable-close': !showMore
            })}
            >
            {/*主table区域*/}
            <div className="lightapp-component-cardTable-table">
                {!showMax ? (
                    <FoldableTabs
                        // pageScope={pageScope}
                        tableScope={this}
                        config={config}
                        isEdit={status == 'edit'}
                        moduleId={moduleId}
                        activeKey={activeKey}
                        tabs={tabsOther}
                        showListView={showListView}
                        rows={dataRows}
                        // expandedList={expandedList}
                        handleTypeChange={item => {
                            this.onTypeChange(item);
                            // 标签切换时，首个自动聚焦
                            // status === 'edit' && cellFocusAfterTabChange(item);
                        }}
                        showMore={showMore}
                        onHeadAngleToggle={this.onHeadAngleToggle}
                    />
                ) : null}
            </div>
            
            {/*侧拉面板*/}
            {/* {model === 'open' &&
            ReactDOM.createPortal(
                <section className="card-table-modal">
                    <div
                    className={animation.mask}
                    onClick={() => {
                        pageScope.cardTable.closeModel(moduleId);
                        config && config.modelClose && typeof config.modelClose == 'function'
                        ? config.modelClose.call(pageScope, {
                            ...pageScope.props,
                            ...pageScope.output
                            })
                        : () => {
                            return false;
                            };
                    }}
                    />
                    <div className={animation.dialog}>
                        {model === 'open' && (
                            <SideBox
                            config={config}
                            model={model}
                            moduleId={moduleId}
                            pageScope={pageScope}
                            tableScope={this}
                            modelIndex={modelIndex}
                            modelLens={modelLens}
                            renderItem={renderItem}
                            modelValue={modelValue}
                            modelScale={modelScale}
                            modelDisplay={modelDisplay}
                            modelDisabled={modelDisabled}
                            modelRecord={modelRecord}
                            destEditAreaCodeGroup={destEditAreaCodeGroup}
                            />
                        )}
                    </div>
                </section>,
                document.querySelector('body')
            )} */}
            {/* 最大化区域  最终用portal改造 */}
            {/* {ReactDOM.createPortal(
                <section
                className={classnames('card-table-max ', {
                    scaleFromOrigin: !!showMax
                })}
                >
                {showMax ? (
                    <FoldableTabs
                    pageScope={pageScope}
                    moduleId={moduleId}
                    tableScope={this}
                    isEdit={this.state.status == 'edit'}
                    config={config}
                    activeKey={activeKey}
                    tabs={tabsOther}
                    showListView={showListView}
                    showMax={showMax}
                    rows={dataRows}
                    expandedList={expandedList}
                    handleTypeChange={item => {
                        config && config.onTabChange && typeof config.onTabChange == 'function'
                        ? config.onTabChange.call(pageScope, { ...pageScope.output }, moduleId, item)
                        : (function() {})();
                        onTypeChange.call(this, item);

                        this.state.status === 'edit' && cellFocusAfterTabChange(item);
                    }}
                    showMore={showMore}
                    />
                ) : null}
                </section>,
                document.querySelector('body')
            )} */}
            </main>  
        )
    }
}

export default CardTable;