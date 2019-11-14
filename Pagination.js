import React, { Component } from "react";

class Pagination extends Component {
	constructor() {
		super();
		this.state = {
			page: 0
		};
	}

	update = () => {
		this.setState({
			page: this.state.page + 1
		});
	};

	render() {
		let { page } = this.state,
			feedApi = `https://hn.algolia.com/api/v1/search?tags=front_page&page={page}`;
		return (
			<span className="pagination">
				<button onClick={() => this.update()}>
					<span className="more">More</span>
				</button>
			</span>
		);
	}
}

export default Pagination;
