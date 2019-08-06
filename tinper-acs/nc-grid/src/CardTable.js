import React, { Component } from 'react';
import classnames from 'classnames';
import FoldableTabs from './FoldableTabs';
import EditTable from './EditTable';

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
    showMore: false,
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
        let defaultShown = props.showMore || false;
        this.state = {
            status: 'browse', //browse(浏览态)、edit(编辑态)
            activeKey: '', //标识当前卡表的选中项
            showMore: defaultShown, //卡表是否展开
            isMaximized: false, //是否最大化显示
            selectedList: [], //已勾选的行数据集合
        }
        this.addRowFoo = () => {}
        this.delRowFoo = () => {}
        this.pasteRowFoo = () => {}
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
    onHeadAngleToggle = (flag) => {
        this.setState({ 
            showMore: flag
        });
    }

    //最大化多表中表格
    openMaxTable = (isMaximized) => {
        this.setState({ isMaximized })
    }
    //调用editTable实例中的方法
    addRow = () => {
        this.addRowFoo();
    }
    delRow = () => {
        this.delRowFoo();
    }
    pasteRow = () => {
        this.pasteRowFoo();
    }
    
    parentFoo = (addRow, delRow ,pasteRow) => {
        this.addRowFoo = addRow;
        this.delRowFoo = delRow;
        this.pasteRowFoo = pasteRow;
    }
    /**
     * 勾选表行时触发的回调
     * @param selectedList 已勾选的行数据集合
     */
    getSelectedDataFunc = (selectedList) => {
        this.setState({
            selectedList: selectedList
        })
    }

    render(){
        let self = this;
        let {
            showMax,
            moduleId,
            columns,
            data: dataRows,
            tabLists,
            showListView,
            isEdit,
            tableRightHead,
            ...config
        } = this.props;

        let { status,showMore,activeKey,isMaximized,selectedList } = this.state;
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
                    <EditTable
                    {...config}
                    columns={columns}
                    data={dataRows}
                    moduleId={moduleId}
                    isEdit={isEdit}
                    // onRef={(ref) => { self[moduleId] = ref }} //获取EditTable组件实例
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    parentFoo={this.parentFoo}
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
                {!isMaximized ? (
                    <FoldableTabs
                        // pageScope={pageScope}
                        tableScope={this}
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
                        isMaximized={isMaximized}
                        onHeadAngleToggle={this.onHeadAngleToggle}
                        openMaxTable={this.openMaxTable}
                        addRow={this.addRow}
                        delRow={this.delRow}
                        pasteRow={this.pasteRow}
                        selectedList={selectedList}
                        {...config}
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
            {ReactDOM.createPortal(
                <section
                className={classnames('card-table-max ', {
                    scaleFromOrigin: !!isMaximized
                })}
                >
                {isMaximized ? (
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
                    isMaximized={isMaximized}
                    onHeadAngleToggle={this.onHeadAngleToggle}
                    openMaxTable={this.openMaxTable}
                    addRow={this.addRow}
                    delRow={this.delRow}
                    pasteRow={this.pasteRow}
                    selectedList={selectedList}
                    {...config}
                />
                ) : null}
                </section>,
                document.querySelector('body')
            )}
            </main>  
        )
    }
}

CardTable.propTypes = propTypes;
CardTable.defaultProps = defaultProps;
export default CardTable;