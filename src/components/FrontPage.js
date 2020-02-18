import React, { Component } from 'react';
import getHits from '../api/services';
import { getLocalStorage } from '../api/storage';
import './FrontPage.css';
import FrontPageRow from './FrontPageRow';
import hnLogo from '../assets/y18.gif';

class FrontPage extends Component {
   state = {
     hnlist: [],
   }

   componentDidMount() {
     getHits().then((res) => {
       this.setState({ hnlist: res });
     });
   }

  moreClickHandler = () => {
    const currentPageNo = parseInt(getLocalStorage('currentPage'), 10);
    const totalPage = parseInt(getLocalStorage('totalPage'), 10);
    if (currentPageNo <= totalPage) {
      getHits(currentPageNo + 1).then((res) => {
        this.setState({ hnlist: res });
      });
    }
  }

  render() {
    const { hnlist } = this.state;
    return (
      <div>
        <div className="hn-header">
          <img src={hnLogo} alt="hn" className="hn-logo" />
          <span>top</span>
          <span>| new</span>
        </div>

        <div className="hn-contents">
          <ul>
            {hnlist
              && hnlist.map(item => <FrontPageRow key={JSON.stringify(item)} {...item} />)}
            <li className="hn-footer">
              <span role="button" onClick={this.moreClickHandler} onKeyDown={this.moreClickHandler}>More</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default FrontPage;
