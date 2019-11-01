import React, { useEffect, useState } from 'react';
import Header from './components/header/Header';
import Feed from './components/feed/Feed';
import { GET_NEWS_FEED, HEADER_TOP_LABEL } from './constants';

function App() {
      const [feed, setFeed] = useState([]);
      const [page, setPage] = useState(0);
      const [sortType, setSortType] = useState(HEADER_TOP_LABEL);
      const [isMore, setIsMore] = useState(true);

      const sortFeed = (type, list) => {
            let sortedFeed = [...list];

            if (type === HEADER_TOP_LABEL) {
                  sortedFeed.sort((a, b) => parseInt(b.points, 10) - parseInt(a.points, 10))
            } else {
                  sortedFeed.sort((a, b) => parseInt(b.created_at_i, 10) - parseInt(a.created_at_i, 10))
            }
            setFeed(sortedFeed);
      }

      const getNews = () => {
            let url = GET_NEWS_FEED + '&page=' + page;
            fetch(url)
                  .then(res => res.json())
                  .then(res => {
                        let result = res.hits;
                        result = result.filter(item => item.title);
                        sortFeed(sortType, [...result, ...feed]);
                        if (page + 1 === res.nbPages) {
                              setIsMore(false);
                        }
                  })
      }

      const loadMore = () => {
            setPage(page + 1);
      }

      useEffect(() => {
            sortFeed(sortType, feed);
      }, [sortType]);

      useEffect(() => {
            getNews();
      }, [page]);

      return (
            <div className="App">
                  <Header sortType={sortType} setSortType={setSortType} />
                  <Feed feed={feed} loadMore={loadMore} isMore={isMore} />
            </div>
      );
}

export default App;
