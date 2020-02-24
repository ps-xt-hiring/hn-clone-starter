import React from 'react';
import { PropTypes } from 'prop-types';
import upArrow from '../up-arrow.svg';


const rowStyle = {
    width: '70px',
  };
  
class NewsList extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
          show: true,
          numComments:props.data.num_comments || 0,
          upvote:this.props.data.points || 0,
        };
      }
    
  
     hidePost = ()=>{
         this.setState({
             show:false
         })
     }
     getUpvoteCount = ()=>{
         const {upvote} = this.state;
         this.setState({
            upvote : upvote+1 ,
         })
     }
     setUpVote=()=>{
        const {upvote} = this.state;
        return(
          <>
            <div style={rowStyle} className="upvotes-count" >
                {upvote}
            </div>
            <div role="button" tabindex="0" class="upCaret" onClick={()=>{this.getUpvoteCount()}}></div>
          </>
        )
     }

     getDomainName = (url,subdomain)=>{
        subdomain = subdomain || false;
        if(!url){
            return false;
        }
        url = url.replace(/(https?:\/\/)?(www.)?/i, '');
        if (!subdomain) {
            url = url.split('.');
            url = url.slice(url.length - 2).join('.');
        }
        if (url.indexOf('/') !== -1) {
            return url.split('/')[0];
        }
        return url;
    }
    getHours = (timestamp) =>{
        const date = new Date(timestamp*1000);
        const currentDate = new Date();
        let res = Math.abs(currentDate - date) / 1000;
        const hours = Math.floor(res / 3600) % 24;
        const mintues =  Math.floor(res / 60) % 60;
        return  hours>0 ? `${hours} Hours` : `${mintues} Minutes`;        
    }

    titleBar = (data) => {
        const { title, url ,author ,created_at_i, story_title} = data;
        const titlehead = story_title || title;
        return (
          <>  
            <div>
                <a href={url} target='_blank'>
                    <div>{titlehead}</div>
                </a>
            </div>
            
            <div className="domain"> {this.getDomainName(url,true)} </div>
            <div className="author"> {author} </div>
            <div className="createdAt"> {this.getHours(created_at_i)} ago </div>
            <div className="hidebtn"> <button onClick={()=>this.hidePost()}>[hide]</button></div> 
          </>
        );
      };

    render() {
    const { data } = this.props;
    const {show , numComments } = this.state;
    return (
      <div className="row-layout">
        {show && <div className="comments">{numComments}</div>}
        {show && this.setUpVote()}
        {show && this.titleBar(data)}
      </div>
    );
  }
}

NewsList.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
  }),
};
NewsList.defaultProps = {
  data: {
    title: '',
  },
};

export default NewsList;
