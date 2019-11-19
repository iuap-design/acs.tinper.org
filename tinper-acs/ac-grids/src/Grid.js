import React, {Component} from "react";
import BeeGrid,{GridToolBar}  from "bee-complex-grid";

const defaultProps = {
    headerScroll: false,
    bordered: false,
    data: []
};

class Grid extends Component {
    constructor(props) {
        super(props);
    }
    exportExcel=()=>{
        this.grid.exportExcel();
    }
    render() {
        const { paginationObj, data,  ...otherProps } = this.props;
        return (
            <BeeGrid
                {...otherProps}
                className="ac-grids"
                data={data}
                paginationObj='none'  
                columnFilterAble={false}
                ref={ref=>this.grid=ref}
                syncHover={true}
            />
        );
    }
}

Grid.defaultProps = defaultProps;
Grid.GridToolBar = GridToolBar;
export default Grid;
