import styled from 'styled-components';

export const ListingStyled = styled.article`
  display: flex;
  flex: 1;
  font-size: 14px;
  line-height: 18px;
  padding: 5px 20px;

  &:nth-child(odd){
      background-color: #d8d8d8
  }

  &:nth-child(even){
      background-color: #f5f5f5
  }

  .newList__voteUp{
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #828282;  
    height: 25px;
    width: 0;
    padding:0    
  }
  address, button {
    display: inline-block;
    background: none;
    border: none;
    cursor: pointer;
    color: #000;
    padding: 0px 4px ;
  }
  .newsList__comments-cnt
  {
    flex: 1 0 5%;
  }

  .newsList__points {
    flex: 1 0 5%;
    padding-right: 20px;   
  }

  .newList__voteUp {
    display:inline-block;
    vertical-align: middle;
    padding-top: 5px;
  }

  .newsList__text {
    flex-basis: 90%;
    padding-left: 20px;
    align-items: center;
    display: inline-flex;
  }

  .newsList__text__main {
    color: #828282;
    font-size: 12px;
    line-height: 14px;
    padding: 0 5px 0px 5px;
  }
  
  .newsList__text__main__link {
    color: #828282;
    text-decoration: none;
  }`;
