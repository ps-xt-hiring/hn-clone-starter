import styled from 'styled-components';
import { Colors } from './constants/theme';

export const Container = styled.div`
  margin: 20px;
  font-size: 14px;
  background-color: ${Colors.list};

  @media (min-width: 992px) {
    width: 970px;
    margin: 20px auto;
  }
`;
