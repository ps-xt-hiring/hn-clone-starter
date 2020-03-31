import styled from 'styled-components';
import Colors from '../../constants/theme';

export const Loading = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 10px;
`;

export const StyledUl = styled.ul`
  background-color: ${Colors.list};
  padding: 0;
`;

export const ShowMore = styled.div`
  color: ${Colors.showMore};
  text-align: center;
  padding-bottom: 15px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
