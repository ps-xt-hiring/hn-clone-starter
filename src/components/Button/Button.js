import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './Button.style';
import withStyles from '../../utils/withStyles';

const Button = (props) => {
  const {
    onClick,
    label,
    className,
  } = props;
  return (
    <button
      type="button"
      className={`${className} button`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  label: 'Button',
  className: '',
};

const StyledButton = withStyles(Button, styles);

export default StyledButton;
