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
            <td style={rowStyle}>
                {upvote}
                    <img src={upArrow} className="upvote" onClick={()=>{this.getUpvoteCount()}} />
            </td>
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
            <td>
                <a href={url} target='_blank'>
                    <div>{titlehead}</div>
                </a>
            </td>
            
            <td> {this.getDomainName(url,true)} </td>
            <td> by {author} </td>
            <td> {this.getHours(created_at_i)} ago </td>
            <td><button onClick={()=>this.hidePost()}>[hide]</button></td>
          </>
        );
      };

    render() {
    const { data } = this.props;
    const {show , numComments } = this.state;
    return (
      <tr>
        {show && <td>{numComments}</td>}
        {show && this.setUpVote()}
        {show && this.titleBar(data)}
      </tr>
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
