import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Card.style';
import Button from '../Button/Button';
import withStyles from '../../utils/withStyles';


class DisplayCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cardsCount: 0,
    };
  }

  render() {
    const {
      props: {
        className, data: {
          num_comments: numComments,
          title: storyTitle,
          url: storyUrl,
          created_at: createdAt,
          author,
          objectID,
        },
        idx,
      },
    } = this;

    const conatinerClassName = `${className} display-card`;

    const onHideButtonClick = (objectId) => {
      const {
        props: {
          handleHideClick,
        },
      } = this;
      handleHideClick(objectId);
    };
    const creationTime = moment(createdAt);
    const currentTime = moment(Date.now());
    const duration = moment.duration(currentTime.diff(creationTime));

    const baseDomain = storyUrl && storyUrl.split('/');
    return (
      <div className={conatinerClassName}>
        <div className={`display-card__details ${idx % 2 === 0 ? 'display-card__details--even' : 'display-card__details--odd'}`}>
          <span className="display-card__details__no-comments">{numComments}</span>
          <a className="display-card__details--title" href={storyUrl}>{storyTitle}</a>
          { storyUrl && (
            <span>
            (
              <a href={storyUrl}>{baseDomain[2]}</a>
            )
            </span>)
          }
          {' '}
          by
          <span><strong>{author}</strong></span>
          <span>{`${duration.humanize()} ago`}</span>
          <Button onClick={() => onHideButtonClick(objectID)} label="hide" />
        </div>
      </div>
    );
  }
}

DisplayCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape(
    {
      numComments: PropTypes.string,
      storyTitle: PropTypes.string,
      storyUrl: PropTypes.string,
      createdAt: PropTypes.string,
      createdAtI: PropTypes.string,
      author: PropTypes.string,
      objectID: PropTypes.string.isRequired,
      handleHideClick: PropTypes.func,
    },
  ),
  idx: PropTypes.number,
};

DisplayCard.defaultProps = {
  className: '',
  data: {
    numComments: '0',
    storyTitle: null,
    storyUrl: null,
    createdAt: null,
    author: null,
    createdAtI: Date.now(),
    handleHideClick: () => {},
  },
  idx: 0,
};

export default withStyles(DisplayCard, styles);
