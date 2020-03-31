/* eslint-disable */
import styled from 'styled-components';
import Colors from '../../constants/theme';

export const StyledLi = styled.li`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  padding: 5px;

  &:nth-child(even) {
    background-color: ${Colors.evenList};
  }
`;

export const Points = styled.div`
  position: relative;
  width: 15%;
  display: flex;
  justify-content: flex-end;
  padding-right: 25px;

  @media (min-width: 768px) {
    width: 8%;
  }
`;

export const UpArrow = styled.span`
  position: absolute;
  top: 4px;
  right: 8px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 8px solid #828282;
  cursor: pointer;
`;

export const Comments = styled.div`
  width: 15%;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 768px) {
    width: 8%;
  }
`;

export const FeedDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  @media (min-width: 992px) {
    flex-direction: row;
    width: inherit;
  }
`;

export const TitleDetails = styled.div`
  padding: 0 5px;
  display: flex;
`;

export const Title = styled.div`
  @media (min-width: 992px) {
    max-width: 380px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 5px;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${Colors.link};
  font-size: 12px;
  display: flex;
  align-items: flex-end;

  &:hover, &:active {
    text-decoration: underline;
  }
`;

export const AuthorTimeDetails = styled.div`
  font-size: 12px;
  display: flex;
  align-items: flex-end;
  color: ${Colors.link};
`;

export const Author = styled.span`
  padding: 0 5px;
  color: ${Colors.black};
`;

export const Hide = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: flex-end;
  font-size: 12px;
  color: ${Colors.link};
  cursor: pointer;

  span {
    padding: 0 5px;
    color: ${Colors.black};

    &:hover {
      text-decoration: underline;
    }
  }
`;
