import { css } from 'styled-components';
import styles from '../../styles';

export default css`
  &.display-card-list {
    background-color: ${styles.colors.backgroundColor};
    color: ${styles.colors.black};
    max-width: 1380px;
    margin: 0 auto;

    .display-card-list__loader {
      display: flex;
      background-color: red;
    }
  }
`;
