import React from 'react';
import '../App.css';
import logo from '../logo.svg';
import NewsList from './NewsList';

class Dasboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      page: 1,
      type : 'top'
    };
  }

  feeds = (apiUrl)=>{
    fetch(apiUrl)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result.hits,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      },
    );
  }

  componentDidMount() {
    const { page } = this.state;
    const apiUrl = `http://hn.algolia.com/api/v1/search?tags=(comment,story,poll)&page=${page}`;
    this.feeds(apiUrl);
    
  }

  getFeed = (feedType)=>{
    const { page, type } = this.state;
    if(feedType===type){
        return false;
    }else{
        this.setState({
            type:feedType,
        })
    }
    let apiUrl = `http://hn.algolia.com/api/v1/search?tags=(comment,story,poll)&page=${page}`;
      if(feedType === 'new'){
       apiUrl = `http://hn.algolia.com/api/v1/search_by_date?tags=(comment,story,poll)&page=${page}`;
      }
    this.feeds(apiUrl);
  }

  render() {
    const { error, isLoaded, items,type } = this.state;
    return (
      <div className="App">
        <div className="header">
          <img src={logo} className="logo" />
          <div className="nav">
            <a href="#" onClick={() => { this.getFeed('top'); }} className={type==='top'?'selected':null}>top</a>
            <a href="#" onClick={() => { this.getFeed('new'); }} className={type==='new'?'selected':null}>new</a>
          </div>
        </div>
        {!isLoaded && <div>.....LOADING FEEDS.</div>}
        {!error && (
        <table>
          <tbody>
            {isLoaded && items.map(item => <NewsList key={item.objectID} data={item} />)}
          </tbody>
        </table>
        )}
      </div>
    );
  }
}

export default Dasboard;

