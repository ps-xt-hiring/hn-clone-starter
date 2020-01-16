/* eslint-disable react/prop-types */
import React from 'react';
import Constants from '../constants';

export default class Header extends React.Component {
  constructor(props, state) {
    super(props, state);

    this.state = {
      active: 'top',
    };

    this.toggleView = this.toggleView.bind(this);
  }

  toggleView(view) {
    this.setState({
      active: view,
    });
    const { onViewChange } = this.props;
    onViewChange(view);
  }

  render() {
    const { active } = this.state;

    return (
      <div className="list-header">
        <img src={Constants.Url.Gif_Url} className="y-logo" alt="Y-Combinator Logo" />
        <div className="view-options">
          <span className={`view-option ${active === 'top' ? 'active' : ''}`} onClick={() => this.toggleView('top')} aria-hidden>{Constants.Text.top}</span>
          <span> | </span>
          <span className={`view-option ${active === 'new' ? 'active' : ''}`} onClick={() => this.toggleView('new')} aria-hidden>{Constants.Text.new}</span>
        </div>
      </div>
    );
  }
}
