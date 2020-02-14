import { css } from 'styled-components';
import styles from '../../styles';

export default css`
  &.button {
    background-color: ${styles.colors.white};
    border: 2px solid ${styles.colors.backgroundColorPrimary};
    border-radius: 2px;
    cursor: pointer;
  }
`;
