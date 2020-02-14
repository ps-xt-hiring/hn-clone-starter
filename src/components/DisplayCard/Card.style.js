import { css } from 'styled-components';
import styles from '../../styles';

export default css`
  &.display-card {
    margin: 0;
    div{
      margin: 0;
      padding: 10px 5px;
    }
    .display-card__details{
      text-align: left;
      span{
        display: inline-block;
        text-align: left;
        margin : 0 5px;
      }

      button{
        background-color: transparent;
        margin-left: 5px;
        border: 1px solid ${styles.colors.black};
      }
    }
    .display-card__details--even{
      background-color: ${styles.colors.backgroundColorSecondary};
    }
    .display-card__details--odd{
      background-color: ${styles.colors.backgroundColorPrimary};
    }

    .display-card__details--title{
      text-decoration: none;
    }
`;
