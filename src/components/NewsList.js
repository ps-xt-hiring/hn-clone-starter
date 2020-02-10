import React, { Component } from 'react';
import NewsItem from './NewsItem';
import apiHelper from '../utils/api_helper';
import classes from './NewsList.module.css';
import { setLocalStorage, getLocalStorage } from '../utils/util';

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: []
    };
  }

	componentDidMount() {
		const {match:{params:{id}}} = this.props;
		this.getNewsData(id);
	}

	componentDidUpdate(nextProps) {
		const {match:{params:{id}}} = this.props;
		if (nextProps.match.params.id !== id) {
			this.getNewsData(id);
		}
	}

  getNewsData = (id) => {
		apiHelper('GET', `https://hn.algolia.com/api/v1/search?page=${id || 1}`).then((res) => {
			const newsList = res.hits.filter((item) => item.title !== null && item.title !== "");
			if(res.hits && res.hits.length > 0){
				this.setState({
					listItems: newsList
				});
			}
		})
  }

	upVotePost = (postId, voteCount, isHide = false) => {
		setLocalStorage("UserNewsAction", postId, {voteCount: voteCount + 1, isHide: isHide});
		this.forceUpdate();
	}

	hidePost = (postId, voteCount, isHide=true) => {
		setLocalStorage("UserNewsAction", postId, {voteCount: voteCount, isHide: isHide});
		this.forceUpdate();
	}

  render() {
		const UserActionList = getLocalStorage("UserNewsAction");
		return (
		<div>
			{this.state.listItems.map((item, index) => {
				item = {...item, ...UserActionList[item.objectID]};
				return (<NewsItem heading={item} key={index} upVotePost={this.upVotePost} hidePost={this.hidePost}/>)
			})}
		</div>
		);
	}
}

export default NewsList;