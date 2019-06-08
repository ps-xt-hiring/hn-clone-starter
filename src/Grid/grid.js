import React, { Component } from 'react';
import ReactDataGrid from "react-data-grid";

const initialState = {
  columns: [
    {
      key: "id",
      name: "ID",
      resizable: true,
      width: 40
    },
    {
      key: "title",
      name: "Title",
      resizable: true
    },
    {
      key: "count",
      name: "Count",
      resizable: true
    }
  ]  
};

class GridTest extends Component {
  state = {
    rowData: []
  }

  rowGetter(i) {
      fetch('https://hn.algolia.com/api/v1/items/3')
      .then(res => res.json())
      .then(function(data){
        debugger;
        this.setState({ rowData: data })
        console.log(this.state.rowData);
      })
  }

  getSize() {
    return this.props.rows.length;
  }
  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    console.log("handleGridRowsUpdated", arguments);
  }
  render() {
    return (
      
      <h3>React Grid</h3>

      // <ReactDataGrid
      //   columns={initialState.columns}
      //   rowGetter={this.rowGetter.bind(this)}
      //   //rowsCount={this.state.rows.length}
      //   onGridRowsUpdated={this.handleGridRowsUpdated}        
      //   minHeight={200}
      //   enableCellSelect={true}
      // />
    );
  }
}

export default GridTest;