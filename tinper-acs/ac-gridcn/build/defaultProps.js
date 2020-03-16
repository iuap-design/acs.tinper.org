"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var paginationDefaultProps = exports.paginationDefaultProps = {
    dataNumSelect: ["5", "10", "15", "20", "25", "50"],
    horizontalPosition: 'center',
    verticalPosition: "bottom",
    dataNum: 1,
    btnType: {
        shape: 'border'
    },
    noBorder: true,
    confirmBtn: function confirmBtn() {
        return null;
    },
    gap: true,
    size: "sm"
};

var gridDefalutProps = exports.gridDefalutProps = {
    syncHover: true, //是否同步状态
    autoCheckedByClickRows: false, //是否启用行点击选中
    headerScroll: false, //是否启用表头滚动条
    bordered: false, //是否有边框
    columnFilterAble: true, //是否显示右侧隐藏行
    showHeaderMenu: true, //是否显示菜单
    dragborder: true, //是否调整列宽
    draggable: true, //是否拖拽
    showFilterMenu: true, //是否显示行过滤菜单
    scroll: { y: 500 }, //滚动条设置
    multiSelect: false, //是否多选
    rowKey: function rowKey(record, index) {
        return index;
    }, //rowKey设置
    showPagination: true //是否启用分页
};