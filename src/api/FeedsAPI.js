import axios from 'axios';

export default class FeedsAPI {
    async getFeeds(page) {
        try {
            const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=page=${page}`);
            this.createUpdateUpvoteMap(response.data.hits);
            return response.data.hits;
          } catch (error) {
            console.error(error);
          }
    }

    createUpdateUpvoteMap(data) {
        try{
            let upvoteMap = window.localStorage.getItem('hn-upvoteMap') || {};
            if(Array.isArray(data)){
                for (let i = 0; i < data.length; i += 1) {
                    const item = data[i];
                    upvoteMap[item.objectID] = item.points;
                }
            }
            console.log(upvoteMap);
            window.localStorage.setItem('hn-upvoteMap', JSON.stringify(upvoteMap));
        } catch(err) {
            console.log("localStorage is not accessible!");
        }
    }

    modifyVote(id, votes) {
        try{
            let upvoteMap = window.localStorage.getItem('hn-upvoteMap') || {};
            upvoteMap = typeof upvoteMap === 'string' ? JSON.parse(upvoteMap) : {};
            
            upvoteMap[id] = votes;

            window.localStorage.setItem('hn-upvoteMap', JSON.stringify(upvoteMap));
        } catch(err) {
            console.log(`Unable to update Votes for feed id:${id}. LocalStorage is not accessible!`);
        }
    }
}