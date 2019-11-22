import moment from 'moment';
import Constants from '../constants';

export default class DataEngine {
    static currentView = 'latest';
    static pageNo = 1;
    static pageSize = 30;
    
    static fetchAndMassageData(query) {
        let self = this;
        return (async ()=> {
            let res = await fetch(query);
            let raw =  await res.json();


            /* Mocking Hidden and upvoted stories behavior
               [This won't be needed after auth as BE will modify the response accordingly]
               For hidden stories: Filter from view 
               For upvoted stories: Increase points by 1
            */
            const hiddenStories = this.getCachedStories('hidden');
            const upvotedStories = this.getCachedStories('upvoted');

            return raw.hits.filter((story) => !(story.objectID in hiddenStories)).map((story, index) => {
                let shortUrl = '';

                // Extract the short Domain for display
                if (story.url) {
                    let urlHost = story.url.split('://')[1].split('/')[0].split('.');
                    if (urlHost.length > 2) {
                        urlHost.shift();
                    }
                    shortUrl = urlHost.join('.');
                }

                return {
                    sequenceNumber: (self.pageNo - 1) * self.pageSize + index + 1,
                    ...story,
                    id: story.objectID,
                    upvoted: story.objectID in upvotedStories,
                    shortUrl: shortUrl,
                    age: moment(story.created_at).fromNow(),
                    commentsCount: story.num_comments,
                    proxyPoints: story.points + (story.objectID in upvotedStories ? 1 : 0)
                };
            })
        })();
    }

    static resetCache() {
        localStorage.setItem(Constants.Keys.hiddenStories, '{}');
        localStorage.setItem(Constants.Keys.upvotedStories, '{}');
        alert('Cache Cleared. Reloading Page Now.');
        window.location.reload();
    }
    static getCachedStories(storyType='hidden') {

        let cachedStories = null;
        
        switch(storyType) {
            case "hidden": cachedStories = localStorage.getItem(Constants.Keys.hiddenStories); break;
            case "upvoted": cachedStories = localStorage.getItem(Constants.Keys.upvotedStories); break; 
            default: break;  
        }

        if (cachedStories) {
            cachedStories = JSON.parse(cachedStories);
        } else {
            cachedStories = {};
        }

        return cachedStories;
    }

    static hideStory(storyIdToHide) {
        // Mocking Snip API behavior
        let hiddenStories = this.getCachedStories('hidden');
        hiddenStories[storyIdToHide] = storyIdToHide;
        localStorage.setItem(Constants.Keys.hiddenStories, JSON.stringify(hiddenStories));

        // Make API call to Snip after Auth
    }

    static upvoteStory(storyIdToUpvote) {
        let upvotedStories = this.getCachedStories('upvoted');
        upvotedStories[storyIdToUpvote] = storyIdToUpvote;
        localStorage.setItem(Constants.Keys.upvotedStories, JSON.stringify(upvotedStories));
        
        // Make API call to Rank after Auth
    }

    static loadLatest() {
        this.currentView = 'latest';
        this.pageNo = 1;

        let query = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.pageNo}&hitsPerPage=${this.pageSize}`;

        return this.fetchAndMassageData(query);
    }

    static loadNext() {
        this.pageNo++;

        let query = this.currentView === 'latest' ? `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.pageNo}&hitsPerPage=${this.pageSize}` : `https://hn.algolia.com/api/v1/search?tags=story&page=${this.pageNo}&hitsPerPage=${this.pageSize}` ;
        return this.fetchAndMassageData(query);

    }

    static loadTop() {
        this.currentView = 'top';
        this.pageNo = 1;

        let query = `https://hn.algolia.com/api/v1/search?tags=story&page=${this.pageNo}&hitsPerPage=${this.pageSize}`;

        return this.fetchAndMassageData(query);
    }
} 