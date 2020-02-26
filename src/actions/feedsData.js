import FeedService from '../services/FeedService';
// get all feeds
export function fetchFeedsData(selectedPage,order="") {
  
  return FeedService
    .get(`/api/v1/search?page=${selectedPage}&&tags=${order}`)
    .then(response => {
      return response;
    });
}
