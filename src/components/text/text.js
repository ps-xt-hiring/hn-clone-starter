import React, { Component } from 'react';

class Text extends Component {
  render () {
    const { type, value } = this.props;

    return (
      <span className={`text-cl ${type}`}>
        {value}
      </span>
    )
  }
}

export default Text;
