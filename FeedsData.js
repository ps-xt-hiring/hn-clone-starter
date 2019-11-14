import React, { Component } from "react";
import Moment from "react-moment";
import "./feeds.css";
import Upvote from "./Upvote";

class FeedsData extends Component {
	constructor() {
		super();
		this.state = {
			feeds: [],
			page: 0,
			hide: false
		};

		this.loadMore = this.loadMore.bind(this);
	}

	loadMore = () => {
		this.setState(prev => {
			return { visible: prev.visible + 1 };
		});
		this.getFeed();
	};

	handleHideBtnClick() {
		this.setState({ hide: true });
	}

	componentDidMount() {
		this.getFeed();
	}

	getFeed() {
		this.setState({
			page: this.state.page + 1
		});

		return fetch(
			`https://hn.algolia.com/api/v1/search?page=${this.state.page}`
		)
			.then(results => {
				return results.json();
			})
			.then(data => {
				if (data.hits.length > 0) {
					let feeds = data.hits.map(feed => {
						if (feed.title && feed.url) {
							let linkDomainUrl = new URL(feed.url),
								linkDomain = linkDomainUrl.hostname,
								feedPostedDate = feed.created_at,
								feedObj = Object.assign(
									{},
									...this.state.feeds
								),
								feedObjArray = Object.keys(feedObj).map(
									i => feedObj[i]
								);

							feedObjArray.push(feed);

							return (
								<div key={feed.objectID} className="feedItem">
									<span className="comments-num">
										{feed.num_comments}
									</span>
									<span className="upvote">
										<Upvote />
									</span>
									<span
										className="feed-title"
										data-story-title={feed.story_title}
									>
										{feed.title}
									</span>
									<span className="link-domain">
										(<span>{linkDomain}</span>)
									</span>
									<span className="by"> by</span>
									<span className="author">
										{" "}
										{feed.author}{" "}
									</span>
									<span className="timestamp">
										<Moment fromNow>
											{feedPostedDate}
										</Moment>
									</span>
									<span
										className="hide"
										onClick={this.handleHideBtnClick.bind(
											this
										)}
									>
										[<button>hide</button>]
									</span>
								</div>
							);
						}
					});

					this.setState({
						feeds: feeds
					});
				} else {
					document.querySelectorAll(".loadMore")[0].hidden = true;
				}
			});
	}

	render() {
		return (
			<div className="container">
				<div className="feedsList" key={this.state.page}>
					{this.state.feeds}
				</div>
				<div className="loadMore">
					<button onClick={this.loadMore} className="loadMoreBtn">
						More
					</button>
				</div>
			</div>
		);
	}
}

export default FeedsData;
