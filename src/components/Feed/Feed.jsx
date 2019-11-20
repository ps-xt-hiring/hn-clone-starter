import React from 'react';
import { Row, Col} from 'reactstrap';
// import PropTypes from 'prop-types';
import { timeElapsed, getDomain } from '../../helpers/utils'

import TEXT from '../../constants/text.constants';
import { ReactComponent as ArrowUp } from '../../assets/arrow.svg';
import './Feed.scss';
import '../../helpers/_utils.scss';

const Feed = (props) => {

    return (
      <div className='feed'>
        <Row>
          <Col xs={1}>
            <span className="greyText">{props.feed.num_comments}</span>
          </Col>
          <Col xs={1}>
            <span>{props.feed.points}</span>
            <button type="button" onClick={() => props.onUpvote(props.feed)}>
                <ArrowUp className="arrow"/>
            </button>
          </Col>
          <Col xs={10}>
            <span className="darkGreyText bold">{props.feed.title}</span> &nbsp;
            <span>{props.feed.url && (
                <a className="url greyText" href={props.feed.url}>
                  {getDomain(props.feed.url)}
                </a>
              )}</span>
            <span className='darkGreyText m-lr-2 '>{TEXT.BY} {props.feed.author}</span>
            <span className='bold'>{props.feed.created_at && timeElapsed(props.feed.created_at)}</span>
            <button onClick={() => props.onHide(props.feed)}>{TEXT.HIDE}</button>
          </Col>
        </Row>
      </div>
  );

};

// Feed.propTypes = {
//   objectID: PropTypes.string,
//   num_comments: PropTypes.number,
//   points: PropTypes.number,
//   title: PropTypes.string,
//   url: PropTypes.string,
//   author: PropTypes.string,
//   created_at: PropTypes.string
// }

// Feed.defaultProps = {
//   objectID: '0',
//   num_comments: 0,
//   points: 0,
//   title: 'title',
//   url: 'www.testurl.com',
//   author: 'default',
//   created_at: '0'
// };

export default Feed;