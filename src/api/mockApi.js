import _ from 'lodash';


export const makeHttpRequestWithPage = async pageNumber => {
  const response = await fetch(`https://hn.algolia.com/api/v1/search?hitsPerPage=12&page=${pageNumber}`, { 
    method: 'GET',
    // headers: {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    // },
  });

  const data = await response.json();
  return data;
}