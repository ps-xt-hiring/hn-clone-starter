import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getData } from '../store/actions/hackerActions';
import PropTypes from 'prop-types';
import * as moment from 'moment';

class HackerPage extends Component {

  constructor(props){
    super(props);
    this.state = {
       loading: this.props.loading || false,
       data: this.props.data || [],
    }

  }

//   static getDerivedStateFromProps(props, state) {
//     if (props.loading !== state.loading) {
//       return {
//         loading: this.props.loading,
//         data: this.props.data
//       };
//     }
//     return null;
//   }

  componentDidMount(){
    this.props.dispatch( getData(1) );
  }


  loadMoreAction = () => {
    console.log("cc", this.props);
    let {page} = this.props;
    this.props.dispatch( getData(page+1) );
  }

  geturlText =(url) => {
    return url? url.replace('http://','').replace('https://','').split(/[/?#]/)[0] : 'n/a';  
  }

  renderList = (data) =>{
     return (
       data.map( (el, iKey) =>
         <li key={iKey} className="list normal-text">
             <div className="comments-num"> {el.num_comments || 0} </div>
             <div className="points"> {el.points || 0} </div>
             <div className="desc-row">
                <div className="title-url normal-text">
                    <span>{el.title}</span>
                    <span className="dim-text text-url no-break" href={el.url} >  ( {this.geturlText(el.url)} )  </span>
                </div>
                <div className="dim-text">
                    <span className="text-gap"> by </span>
                    <span className="normal-text text-gap"> {el.author} </span>
                    <span className="no-break"> {moment(el.created_at).fromNow()} </span>
                    <span className='dim-text no-break'>[<span className="normal-text"> Hide </span>]</span>
                </div>
             </div>
         </li>
       )
     ) 
  }
 

  render() {
    const {data, loading} = this.props;


    return (
      <div className="listData-wrapper">
     
      <React.Fragment>
          <ul>
            { data && data.length ?
              ( this.renderList(data) )
              :
              ( <div style={{margin:15}}>{ }</div>)
            }
          </ul>
          
           { loading ?
             (<span className="more-btn">Loading....</span>) 
             : (<span className="more-btn" onClick={ this.loadMoreAction } >{'more'} </span>)
           }
      </React.Fragment>
       
      </div>
    );
  }
}

function mapStateToProps(state ) {
    return {
        loading: state.hacker.loading,
        data: state.hacker.data,
        page: state.hacker.page, 
    };
}

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps )(HackerPage);


HackerPage.PropTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  page: PropTypes.number
}

