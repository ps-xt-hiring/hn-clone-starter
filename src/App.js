import React from 'react';
import './App.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import DataTable from './components/DataTable.js';
import Header from './components/Header.js';
import Loader from 'react-loader-spinner';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      response: [],
      page: 0,
      loader: false
    }
  }

  fetchResults = (page) => {
    this.setState({ loader: true });
    // let config = {
    //   headers: {'Cache-Control': 'max-age=31536000'}
    // };
    axios.get(`https://hn.algolia.com/api/v1/search?tags=front_page&&page=${page}`)
      .then(res => {
        this.setState({ response: res.data.hits, loader: false })
      })
      .catch(() => {
        this.setState({ loader: false });
      })
  }
  componentDidMount() {
    this.fetchResults(this.state.page);
  }

  onHideHandler = (key) => {
    this.setState({
      response: this.state.response.filter((_, i) => i !== key)
    });
  }

  onMoreHandler = () => {
    this.setState({ page: this.state.page + 1, loader: true }, () => {
      this.fetchResults(this.state.page);
      document.documentElement.scrollTop = 0;
    })
  }

  onUpvoteHandler = (key) => {
    var responseCopy = Object.assign({}, this.state.response);
    responseCopy[key].points += 1;
    this.setState(responseCopy);
  }
  goToHome = () => {
    this.setState({ page: 0 })
    this.fetchResults(0);
  }
  render() {
    return (
      <div className="App">
        <Header goToHome={this.goToHome} />
        {this.state.loader ?
          <div className="loader">
          <Loader 
            type="ThreeDots"
            color="#ff6600"
            height={100}
            width={100}
            timeout={3000} />
            </div> :
          <div>
            <Table responsive striped className="table-main">
              <tbody>
                {this.state.response.length ? this.state.response.map((item, index) => (
                  <DataTable data={item} key={index} index={index} onHideHandler={this.onHideHandler} onUpvoteHandler={this.onUpvoteHandler} />
                )) :
                  <tr>
                    <td> {'No Records Found'}
                    </td>
                  </tr>}
              </tbody>
            </Table>
            {this.state.response.length ? <div className="click-more" onClick={this.onMoreHandler}>More</div> : ''}
          </div>}
      </div>
    )
  }
}
export default App;