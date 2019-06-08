import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GridTest from './Grid/grid'

function App() {
  return (
    <div className="App">


      <div className="container">
        <div className="row app__header--layout">
          <div className="col">
            
          <div >
            <span className="pagetop">
              <b className="hnname"><a className="app__headerAnchor--white" href="news">Hacker News</a></b>
              <a className="app__headerAnchor--black" href="newest">new</a>
            </span>
          </div>

          </div>
        </div>

        <div className="row">
          <div className="col">
            
            <GridTest />

            {/* <ReactDataGrid
              columns={columns}
              rowGetter={i => rowData[i]}
              rowsCount={rows.length}
              minHeight={650}
              // rowRenderer={RowRenderer}
              // rowHeight={ROW_HEIGHT}
              headerRowHeight={50}
              enableCellAutoFocus={false}
            /> */}

          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
