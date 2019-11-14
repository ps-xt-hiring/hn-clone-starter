import React, { Component } from "react";
import FeedsData from "./FeedsData";
// import Pagination from "./Pagination";

class Feeds extends Component {
	render() {
		return (
			<div className="feeds">
				<FeedsData />
			</div>
		);
	}
}

export default Feeds;
