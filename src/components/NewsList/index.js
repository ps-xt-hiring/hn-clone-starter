import React, { useReducer, useEffect, useMemo, useState } from 'react'
import News from '../News'
import { reducer, initialState } from './reducer'
import FetchNews from '../../Services/APIs/FetchNews';
import { setNewsAsHidden, getHiddenNews } from '../../utils/helper'
import { LoadMoreBtn, ListWraper } from '../Styled';

const NewsList = () => {
    const [hiddenIds, setHiddenIds] = useState(getHiddenNews());
    const [state, dispatch] = useReducer(reducer, initialState);
    const { newsList, processing } = state

    /**
     * Memoizing the `FetchNews` instance.
     */
    const { fetchNews, loadMore } = useMemo(() => new FetchNews(dispatch), [])

    useEffect(() => {
        fetchNews()
    }, [])

    /**
     * Hide news and re-render.
     * @param {*} newsId 
     */
    const hideNews = (newsId) => {
        setNewsAsHidden(newsId);
        setHiddenIds([...hiddenIds, newsId])
    }

    if (!newsList || !newsList.length) {
        return (
            <h6>No news found yet...</h6>
        )
    }

    return (
        <section>
            <ListWraper>
                {newsList.map(news => !hiddenIds.includes(news.objectID) && (
                    <News key={news.objectID} news={news} hideNews={hideNews} />
                ))}
                <li className="paginationWrapper">
                    <div className="left"></div>
                    <div className="right">
                        {
                            processing ?
                                <span className="loader">Loading...</span> :
                                <LoadMoreBtn onClick={() => loadMore()}>More</LoadMoreBtn>
                        }
                    </div>
                </li>
            </ListWraper>
        </section>
    )
}

export default NewsList
