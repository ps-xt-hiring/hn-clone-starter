import React from 'react';
import PropTypes from 'prop-types';
import NewsList from '../news-list';
import './main.scss';

export default function Main(props) {
  const { children } = props;
  return (
    <div className="container">
      {children}
      <NewsList />
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Main.defaultProps = {
  children: {},
};
