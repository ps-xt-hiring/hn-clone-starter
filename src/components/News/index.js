import React from 'react'
import { getDomainFromUrl, getTimeDuration } from '../../utils/helper'
import { CommentCount, Votes, Title, Domain, Author, Duration, HideBtn } from '../Styled'

const News = ({ news, hideNews }) => {
    const { objectID, title, url, num_comments, points, author, created_at } = news
    if (!title && !url) {
        return null
    }

    return (
        <li>
            <CommentCount>{num_comments || 0}</CommentCount>
            <Votes>{points || 0}</Votes>
            <Title href={url}>{title}</Title>
            {url && <Domain href={url}>({getDomainFromUrl(url)})</Domain>}
            {author && <Author>by {author}</Author>}
            {created_at && <Duration>{getTimeDuration(created_at)}</Duration>}
            [<HideBtn onClick={() => hideNews(objectID)}> hide </HideBtn>]
        </li>
    )
}

export default News
