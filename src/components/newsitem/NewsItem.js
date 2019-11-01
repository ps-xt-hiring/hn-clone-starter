import React from 'react';

import * as CONSTANTS from '../../utils/Constants';
import { localeData, defaultLanguage } from '../../utils/Locale-Data';
import Classes from './NewsItem.module.scss';

const getColorForText = (points) => {
  const styleClsBox2 = [Classes.newsfeed__article_box2];
  if (points > CONSTANTS.DARKER_THRESHOLD && points < CONSTANTS.DARK_THRESHOLD) {
    styleClsBox2.push(Classes.points_color_darker);
  } else if (points >= CONSTANTS.DARK_THRESHOLD && points < CONSTANTS.NORMAL_THRESHOLD) {
    styleClsBox2.push(Classes.points_color_dark);
  } else if (points >= CONSTANTS.NORMAL_THRESHOLD && points < CONSTANTS.LIGHT_THRESHOLD) {
    styleClsBox2.push(Classes.points_color_normal);
  } else if (points >= CONSTANTS.LIGHT_THRESHOLD && points < CONSTANTS.LIGHTER_THRESHOLD) {
    styleClsBox2.push(Classes.points_color_light);
  } else {
    styleClsBox2.push(Classes.points_color_lighter);
  }
  return styleClsBox2;
};

const getTimeDifference = (date) => {
  const timeDifference = Math.abs(new Date() - new Date(date));
  let finalTime = Math.round(timeDifference / 36e5);
  finalTime += CONSTANTS.GET_HOUR_STRING(finalTime);
  return finalTime;
};

const getHostName = (urlStr) => {
  let hostName = '-';
  if (urlStr) {
    hostName = new URL(urlStr).host;
  }
  return hostName;
};

const newsitem = (props) => {
  let newsElement = (<div>{localeData[defaultLanguage].LOADING_TEXT}</div>);
  const newsArr = props.newsItems;
  if (newsArr) {
    newsElement = newsArr.map((item, index) => {
      const styleCls = [Classes.newsfeed__article];
      if (index % 2 !== 0) {
        styleCls.push(Classes.grey_bg_color);
      }
      return (
        <article className={styleCls.join(' ')} key={item.objectID}>
          <span className={Classes.newsfeed__article_box1}>
            {item.num_comments || '-'}
          </span>
          <span
            className={getColorForText(item.points).join(' ')}
          >
            <span className={Classes.newsfeed__article_box2_C1}>{item.points}</span>
            <span className={Classes.newsfeed__article_box2_C2}>
              <a
                href="#/"
                hidden={!item.num_comments}
                onClick={() => props.onClickedUpvote(item.objectID)}
              >
                <img
                  src={CONSTANTS.ARROW_IMAGE_SRC}
                  alt={localeData[defaultLanguage].ARROR_ALT_TEXT}
                />
              </a></span>
          </span>
          <span className={Classes.newsfeed__article_box3}>
            <span className={Classes.newsfeed__article_box3_title}>
              {item.title + ' '}
            </span>
            (<a href={item.url}>{getHostName(item.url)}</a>) by&nbsp;
                    <span className={Classes.newsfeed__article_box3_author}>
              <a href="#/">{item.author}</a>&nbsp;
                    </span>
            {getTimeDifference(item.created_at) + ' '}
            [<span className={Classes.newsfeed__article_box3_hide}>
              <a hidden={!item.num_comments} href="#/" onClick={() => props.onHideClicked(item.objectID)}>
                {localeData[defaultLanguage].HIDE_BUTTON_TEXT}
              </a>

            </span>]
          </span>
        </article>);
    });
  }
  return newsElement;
};

export default newsitem;
