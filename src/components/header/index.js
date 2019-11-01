import React from 'react';
import './Header.css';
import logo from '../../logo.gif';

const NavContent = (props) => {
  const navContent = props.data.map((content, index) => {
    if (content !== " | ") {
      return (
        <span key={index}
          className={(props.hasSelected === content ? "selected" : "")}
          onClick={props.changePage}>
          {content}
        </span>)
    }
    else
      return content
  }
  );
  return (
    navContent
  )
}

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      hasSelected: 'top'
    };
  }
  changePage = (e) => {
    this.setState({ hasSelected: e.target.innerText });
    this.props.changeTag();
  };

  render() {
    return (
      <header className="header-layout">
        <img src={logo} alt="logo" className="logo" />
        <nav>
          <NavContent
            data={['top', ' | ', 'new']}
            changePage={this.changePage}
            hasSelected={this.state.hasSelected} />
        </nav>
      </header>
    )
  }
}

export default Header;
