import React, { Component } from 'react';
import NCTable from './nc_Table';
import SimpleTable from './SimpleTable';
import CardTable from './CardTable';
import EditTable from './EditTable';

const propTypes = {};
const defaultProps = {};

class NCGrid extends Component {
    render(){
        return <NCTable {...this.props}/>
    }
};

NCGrid.propTypes = propTypes;
NCGrid.defaultProps = defaultProps;
NCGrid.SimpleTable = SimpleTable;
NCGrid.CardTable = CardTable;
NCGrid.EditTable = EditTable;
export default NCGrid;