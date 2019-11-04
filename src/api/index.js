
function fetchData(qry) {
  return new Promise((resolve, reject) => {
    fetch(`https://hn.algolia.com/api/v1/search?${qry}`)
      .then(res => res.json())
      .then(
        (result) => {
          resolve(result.hits);
        },
        (error) => {
          reject(error);
        },
      );
  });
}
export default fetchData;
