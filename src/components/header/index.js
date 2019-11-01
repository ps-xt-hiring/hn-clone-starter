import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import logo from '../../logo.gif';

const NavContent = ({ hasSelected, changePage, data }) => {
  const navContent = data.map((item) => {
    if (item.content !== ' | ') {
      return (
        <span
          key={item.id}
          role="button"
          tabIndex={0}
          className={(hasSelected === item.content ? 'selected' : '')}
          onClick={changePage}
          onKeyPress={changePage}
        >
          {item.content}
        </span>);
    }
    return item.content;
  });
  return (
    navContent
  );
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      hasSelected: 'top',
    };
  }

  changePage = (e) => {
    const { changeTag } = this.props;
    this.setState({ hasSelected: e.target.innerText });
    changeTag();
  };

  render() {
    const { hasSelected } = this.state;
    return (
      <header className="header-layout">
        <img src={logo} alt="logo" className="logo" />
        <nav>
          <NavContent
            data={[{ id: 1, content: 'top' }, { id: 2, content: ' | ' }, { id: 3, content: 'new' }]}
            changePage={this.changePage}
            hasSelected={hasSelected}
          />
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  changeTag: PropTypes.func.isRequired,
};

export default Header;
