import React, { Component,Fragment } from "react";
import BeeGrid, { GridToolBar } from "bee-complex-grid";
import { gridDefalutProps,paginationDefaultProps } from './defaultProps'


const defaultProps = {
    headerScroll: false,
    bordered: false,
    data: [],
    columnFilterAble:false,
    ...gridDefalutProps
};

class Grid extends Component{

    exportExcel=()=>{
        this.grid.exportExcel();
    }
    render(){
        const { paginationObj, data,exportData, ...otherProps } = this.props;
        let _paginationObj ='none';
        if(paginationObj!='none'){
            _paginationObj = {...paginationDefaultProps,...paginationObj}
        }
        return <div className='ac-gridcn'>
            <BeeGrid 
                {...otherProps}
                    data={data}
                    paginationObj={_paginationObj}  
                    ref={ref=>this.grid=ref}
                    exportData={exportData||data}
                />
        </div>
    }
}

Grid.defaultProps = defaultProps;
Grid.GridToolBar = GridToolBar;

export default Grid;