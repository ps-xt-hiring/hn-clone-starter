import request from './Service'

function get(requestUrl) {
  return request({
    url:    requestUrl,
    method: 'GET'
  });
}



const FeedService = {
  get //, create , update, delete, etc. ...
}

export default FeedService;