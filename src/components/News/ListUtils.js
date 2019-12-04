import React from 'react';
import { extractDomainFromUrl, timePassedBy } from '../../utilities';
import { NOT_FOUND, GENERALS } from '../../utilities/genericConstants';

export const NewsLisitngComments = props => (<p className="newsList__comments-cnt">{props.commentsCount || 0} </p>);

export const NewsLisitngPoints = props => (<p className="newsList__points">{props.points || 0} </p>);

export const VoteUp = props => (<button className="newList__voteUp" onClick={() => props.increaseVoteCount(props.newsId)} onKeyUp={() => props.increaseVoteCount(props.newsId)} aria-label="Up Vote"></button>);

export const HideNewsButton = props => {
    const { hideNews, newsId } = props;
    return (<button type="button" className="newsList__hide__btn" onClick={() => hideNews(newsId)}>
        [ {GENERALS.hide} ]
    </button>);
}

export const ListBody = props => {
    const { news, hideNews } = props;
    const url = extractDomainFromUrl(news.url);
    return (
        <article className="newsList__text">
            {news.title ? news.title : `${NOT_FOUND.title}`}
            <p className="newsList__text__main">
                {url && <a href={news.url} target="_blank" className="newsList__text__main__link">({url})</a>}
                {news.author && <address className="newsList__text__description__userName">{news.author}</address>}
                <time className="newsList__timePassedBy">{timePassedBy(new Date(news.created_at))}</time>
                <HideNewsButton hideNews={hideNews} newsId={news.objectID} />
            </p>
        </article>)
}
