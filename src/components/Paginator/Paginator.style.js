import { css } from 'styled-components';
import styles from '../../styles';

export default css`
  &.paginator {
    margin: 5px auto;
    padding: 5px;

    nav {
      height: 35px;
    }

    ul {
      list-style: none;
      height: 100%;

      li {
        height: 100%;
        width: 35px;
        display: inline-block;
        border: 1px solid grey;
        border-radius: 5px;

        &:not(:last-child) {
          margin-right: 5px;
        }

        button {
          height: 100%;
          width: 100%;
          border: none;
          background: transparent;
          cursor: pointer;

          &.active {
            background-color: ${styles.colors.primaryColor};
            color: ${styles.colors.primaryTextColor};
          }
        }
      }
    }
  }
`;
