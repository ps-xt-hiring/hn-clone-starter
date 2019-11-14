import React, { Component } from 'react';

class Pagination extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
    };
  }

  update() {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  render() {
    return (
      <span className="pagination">
        <button type="button" onClick={() => this.update()}>
          <span className="more">More</span>
        </button>
      </span>
    );
  }
}

export default Pagination;
