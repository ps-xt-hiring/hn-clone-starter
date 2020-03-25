import React, { useReducer, useEffect, useMemo, useState } from 'react'
import News from '../News'
import { reducer, initialState } from './reducer'
import FetchNews from '../../Services/APIs/FetchNews';
import styled from 'styled-components';
import { setNewsAsHidden, getHiddenNews } from '../../utils/helper'

const ListWraper = styled.ul`
    list-style: none;
`;
const LoadMore = styled.span`
    cursor: pointer;
`;

const NewsList = () => {
    const [hiddenIds, setHiddenIds] = useState(getHiddenNews())
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
            </ListWraper>
            {
                processing ?
                    <span>Loading...</span> :
                    <LoadMore onClick={() => loadMore()}>More</LoadMore>
            }
        </section>
    )
}

export default NewsList
