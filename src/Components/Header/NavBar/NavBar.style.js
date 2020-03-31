import styled from 'styled-components';
import Colors from '../../../constants/theme';

const StyledNavBar = styled.div`
  button {
    color: ${Colors.black};
    background-color: transparent;
    border: none;
    font-size: 14px;
    padding: 0;
    cursor: pointer;

    &:hover {
      outline: none;
    }
    
    &.active {
      color: ${Colors.white};
      outline: none;
    }
  }
`;

export default StyledNavBar;
