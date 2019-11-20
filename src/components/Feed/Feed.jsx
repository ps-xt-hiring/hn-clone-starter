import React from 'react';
import { Row, Col } from 'reactstrap';
// import PropTypes from 'prop-types';
import { timeElapsed, getDomain } from '../../helpers/utils';

import TEXT from '../../constants/text.constants';
import { ReactComponent as ArrowUp } from '../../assets/arrow.svg';
import './Feed.scss';
import '../../helpers/_utils.scss';

const Feed = ({onUpvote, onHide, feed}) => (
      <div className='feed'>
        <Row>
          <Col xs={1}>
            <span className="greyText">{feed.num_comments}</span>
          </Col>
          <Col xs={1}>
            <span>{feed.points}</span>
            <button type='button' onClick={() => onUpvote(feed)}>
              <ArrowUp className='arrow' />
            </button>
          </Col>
          <Col xs={10}>
            <span className='darkGreyText bold'>{feed.title}</span>
            &nbsp;
            <span>{feed.url 
              && (
                    <a className='url greyText' 
                       href={feed.url}>
                      {getDomain(feed.url)}
                    </a>
                  )}
            </span>
            <span className='darkGreyText m-lr-2 '>
              {TEXT.BY}
              {feed.author}
            </span>
            <span className='bold'>{feed.created_at && timeElapsed(feed.created_at)}</span>
            <button type='button' onClick={() => onHide(feed)}>
              {TEXT.HIDE}
            </button>
          </Col>
        </Row>
      </div>
  );

export default Feed;
