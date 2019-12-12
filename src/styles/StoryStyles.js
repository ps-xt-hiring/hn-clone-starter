import styled from 'styled-components'
import {device} from './Devices'

export const Page = styled.div`
  margin:20px;
`;
   
export const Interactions = styled.div`
    text-align: center;
`;

export const Wrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 0;

`;

export const Item = styled.li`
  list-style: none;
  display: inline-block;
  width: 100%
  height: 40px;
  text-align: left;
    @media ${device.tablet} { 
        flex-direction: column;
        height:70px;
        padding:10px
        margin:0   
    }
   background: ${props => props.isOdd? "#E6E6DF" : "#F6F6EF"
}
`;

export const Headers=styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #FF6601;
    
`;

export const Headeritem=styled.li`
  float: left;
    & > a{
    display: block;
    color: white;
    text-align: center;  
    text-decoration: none;
   }
   & > a:hover {
    color: #111;
    text-decoration:underline
  }
`;

export const ExternalLink = styled.a`
  max-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color:#828282;
  display:inline-block
  vertical-align:middle

`;

export const HideLink = styled.a`
  width:100%;
  height:100%;
  text-decoration:none;
  color:#828282;

`;

export const MoreLink = styled.a`
  text-decoration:none;
  color:#FF6601;

`;

export const MoreLinkDiv = styled.div`
  text-decoration:none;
  color:#FF6601;

`;