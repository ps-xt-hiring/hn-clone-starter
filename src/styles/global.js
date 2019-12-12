import {createGlobalStyle} from 'styled-components'

export const GlobalStyles= createGlobalStyle`

* { 
  box-sizing:border-box;
    
}

html,body {
  font-size:12px;
  width:100%;
  overflow-x:hidden;
  margin:0;
  padding:0;
}

ul {
  list-style:none;
   
}

li{
  padding:5px;
}

a {
  text-decoration:none
  color: inherit;
  padding:5px;
}

span {
  padding:5px;  
}

`;