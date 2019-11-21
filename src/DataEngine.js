import moment from 'moment';

export default class DataEngine {
    static currentView = 'latest';
    static pageNo = 1;
    static pageSize = 30;
    
    static fetchAndMassageData(query) {
        let self = this;
        return (async ()=> {
            let res = await fetch(query);
            let raw =  await res.json();

            return raw.hits.map((story, index) => {
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
                    shortUrl: shortUrl,
                    age: moment(story.created_at).fromNow(),
                    commentsCount: story.num_comments
                };
            })
        })();
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