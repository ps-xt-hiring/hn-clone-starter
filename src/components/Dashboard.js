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
      page: 0,
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
    const apiUrl = `http://hn.algolia.com/api/v1/search?tags=front_page&page=${page}&hitsPerPage=30`;
    this.feeds(apiUrl);
    
  }


  getFeed = (feedType,flag)=>{
    const { page, type } = this.state;
    debugger;
    if(feedType===type && !flag){
        return false;
    }else{
        this.setState({
            type:feedType,
        })
    }
    let apiUrl = `http://hn.algolia.com/api/v1/search?tags=front_page&page=${page}&hitsPerPage=30`;
      if(feedType === 'new'){
       apiUrl = `http://hn.algolia.com/api/v1/search?tags=story&page=${page}&hitsPerPage=30`;
      }
    this.feeds(apiUrl);
  }

  moreFeeds = ()=>{
    const {type} = this.state;
    this.setState(prevState =>({
      page :prevState.page+1,
    }))
    this.getFeed(type, true);
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
        <div className='row'>
            {isLoaded && items.map(item => <NewsList key={item.objectID} data={item} />)}
            <div className="footer more-btn" onClick={()=>this.moreFeeds()}>
              More
            </div>
        </div>

        )}
      </div>
    );
  }
}

export default Dasboard;

