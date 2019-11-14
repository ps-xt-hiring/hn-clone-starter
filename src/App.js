import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import ListItems from './components/listItems/ListItems';

function App() {
  const [selectedSort, setselectedSort] = useState('top');
  const [recordCount, setrecordCount] = useState(20);
  const [records, setRecords] = useState([]);
  const [showLoader, setLoaderStatus] = useState(true);
  const handleAddValue = (sortType) => {
    setselectedSort(sortType);
  };
  function fetchRecords(sortParam) {
    setLoaderStatus(true);
    const apiURL = (sortParam === 'newest') ? `http://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=${recordCount}` : `https://hn.algolia.com/api/v1/search?query=*&hitsPerPage=${recordCount}`;
    fetch(apiURL)
      .then(res => res.json())
      .then((data) => {
        setLoaderStatus(false);
        setRecords(data.hits);
      })
      .catch(() => {
        setLoaderStatus(false);
        // eslint-disable-next-line no-console
        console.log('Error');
      });
  }
  useEffect(() => {
    fetchRecords(selectedSort);
    return function cleanup() {
      setRecords([]);
    };
  }, [selectedSort, recordCount]);
  function handleHide(recordIndex) {
    let recordsToUpdate = [...records];
    if (recordIndex !== -1) {
      recordsToUpdate.splice(recordIndex, 1);
      setRecords(recordsToUpdate);
    }
  }
  function handleVote(recordIndex) {
    let recordsToUpdate = [...records];
    recordsToUpdate[recordIndex].relevancy_score = recordsToUpdate[recordIndex].relevancy_score || 0;
    if (recordIndex !== -1) {
      recordsToUpdate[recordIndex].relevancy_score += 1;
      setRecords(recordsToUpdate);
    }
  }
  return (
    <React.Fragment>
    {showLoader  ?  <div class='lmask'></div> :
    <div className="App">
      <center className="App-header">
        <table id="hnmain" border="0" cellPadding="0" cellSpacing="0" width="85%" bgcolor="#f6f6ef">
          <tbody>
            <tr>
              <td bgcolor="#ff6600">
                <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                  <tbody>
                    <Header selectedSort={selectedSort} handleClick={handleAddValue} />
                  </tbody>
                </table>
              </td>
            </tr>
            <tr id="pagespace" className="spaceElem" />
            <ListItems records={records} handleHide={handleHide} handleVote={handleVote}/>
            <tr class="moreItems">
              <a href="javascript:Void(0)" title="click for more" onClick={() => setrecordCount(recordCount + 20)}>
                More..
            </a>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  }
    </React.Fragment>
  );
}

export default App;
