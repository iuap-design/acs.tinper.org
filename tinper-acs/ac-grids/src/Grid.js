import React, {Component} from "react";
import BeeGrid,{GridToolBar}  from "bee-complex-grid";

const defaultProps = {
    headerScroll: false,
    bordered: false,
    data: [],
    columnFilterAble:false
};

class Grid extends Component {
    constructor(props) {
        super(props);
    }
    exportExcel=()=>{
        this.grid.exportExcel();
    }
    render() {
        const { paginationObj, data, columnFilterAble, ...otherProps } = this.props;
        return (
            <BeeGrid
                {...otherProps}
                className="ac-grids"
                data={data}
                paginationObj='none'  
                columnFilterAble={columnFilterAble}
                ref={ref=>this.grid=ref}
                syncHover={true}
                headerHeight={35}
            />
        );
    }
}

Grid.defaultProps = defaultProps;
Grid.GridToolBar = GridToolBar;
export default Grid;
