import React from 'react';
import PropTypes from 'prop-types';
import './btnLink.scss';

export default function BtnLink({ children, handleBtn, handleKeyBtn }) {
  return (
    <button
      type="button"
      tabIndex={0}
      className="btn-link"
      onClick={handleBtn}
      onKeyUp={handleKeyBtn}
    >
      {children}
    </button>
  );
}

BtnLink.propTypes = {
  children: PropTypes.string,
  handleBtn: PropTypes.func,
  handleKeyBtn: PropTypes.func,
};

BtnLink.defaultProps = {
  children: '',
  handleBtn: () => {},
  handleKeyBtn: () => {},
};
