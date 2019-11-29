import React from 'react';
import { extractDomainFromUrl, timePassedBy } from '../../utilities';
import { NOT_FOUND, GENERALS } from '../../utilities/genericConstants';

export const NewsLisitngComments = props => (<span className="newsList__comments-cnt">{props.commentsCount || 0} </span>);

export const NewsLisitngPoints = props => (<span className="newsList__points">{props.points || 0} </span>);

export const VoteUp = props => (<span className="newList__voteUp" onClick={() => props.increaseVoteCount(props.newsId)} onKeyUp={() => props.increaseVoteCount(props.newsId)}>{' '}</span>);

export const HideNewsButton = props => {
    const { hideNews, newsId } = props;
    return (<button type="button" className="newsList__hide__btn" onClick={() => hideNews(newsId)}
        onKeyUp={(e) => {
            if (e.keyCode === '32' || e.keyCode === '13') {
                hideNews(newsId);
            }
        }
        }    >
        [ {GENERALS.hide} ]
    </button>);
}

export const ListBody = props => {
    const { news, hideNews } = props;
    const url = extractDomainFromUrl(news.url);
    return (
        <span className="newsList__text">
            {news.title ? news.title : `${NOT_FOUND.title}`}
            <span className="newsList__text__main">
                {url && <a href={news.url} target="blank" className="newsList__text__main__link">({url})</a>}
                {news.author && <address className="newsList__text__description__userName">{news.author}</address>}
                <time className="newsList__timePassedBy">{timePassedBy(new Date(news.created_at))}</time>
                <HideNewsButton hideNews={hideNews} newsId={news.objectID} />
            </span>
        </span>)
}