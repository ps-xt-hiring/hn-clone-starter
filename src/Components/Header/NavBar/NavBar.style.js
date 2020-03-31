import styled from 'styled-components';
import { Colors } from '../../../constants/theme';

export const NavBar = styled.div`
  span {
    cursor: pointer;

    &.active {
      color: ${Colors.white};
    }
  }
`;