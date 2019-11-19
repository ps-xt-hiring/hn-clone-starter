import React from 'react';
import PropTypes from 'prop-types';
import BtnLink from '../../BtnLink';
import Logo from '../../../images/y18.gif';

export default function HeaderTemplate({ data, handleTop, handleKey }) {
  return (
    <ul className="header">
      <li className="logo"><img src={Logo} alt="load" /></li>
      <li className="label top-label">
        <BtnLink handleBtn={handleTop} handleKeyBtn={handleKey}>{data[0]}</BtnLink>
      </li>
      <li className="label new-label">
        <BtnLink handleBtn={handleTop} handleKeyBtn={handleKey}>{data[1]}</BtnLink>
      </li>
    </ul>
  );
}

HeaderTemplate.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  handleKey: PropTypes.func,
  handleTop: PropTypes.func,
};

HeaderTemplate.defaultProps = {
  data: [],
  handleKey: () => {},
  handleTop: () => {},
};
