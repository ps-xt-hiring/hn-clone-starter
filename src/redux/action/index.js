import {
    FETCH_PRODUCTS,
    Hide_PRODUCTS,
    UP_WARDS,
   
  
  } from "../constants/actionType";
  
  export const fetchProducts = (pagination) => dispatch => {
    fetch("https://hn.algolia.com/api/v1/search?page=" + pagination)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          
        return dispatch({
          type: FETCH_PRODUCTS,
          payload: data,
          newItems: pagination
        });
      });
  };


  

  export const hideItems = (objId, item) => dispatch => {
    const hideList = item.slice().filter(it => it.objectID !== objId);
    
    return dispatch({
      type: Hide_PRODUCTS,
      payload: hideList
    });
  };


  export const upWardItems = (objId, items) => dispatch => {
    const vote = items.map((item) => {
      if(item.objectID === objId){
      item.points++
      }
      return item;
    } )
    
    return dispatch({
      type: UP_WARDS,
      payload: vote
    });
  };
  

  
  
 
 
