import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './CardListContainer.style';
import withStyles from '../../utils/withStyles';

import CardList from '../CardList/CardList';
import Paginator from '../Paginator/Paginator';

class CardListContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      paginator: {
        current: 1,
        from: 1,
        till: 10,
      },
    };
  }

  onPageChange(page) {
    console.log('on page change called with page ', page);
    const {
      state: {
        paginator,
      },
    } = this;
    this.setState({
      paginator: {
        ...paginator,
        current: page,
      },
    });
  }

  render() {
    console.log('re rendering card list container ....');
    const {
      props: {
        className,
      },
      state: {
        paginator,
      },
    } = this;
    const containerClass = `${className} card-list-container`;
    return (
      <section className={containerClass}>
        <CardList currentPage={paginator.current} />
        <Paginator paginator={paginator} onPageChange={page => this.onPageChange(page)} bac="abc" />
      </section>);
  }
}
CardListContainer.propTypes = {
  className: PropTypes.string,
};

CardListContainer.defaultProps = {
  className: '',
};

const StyledCardListContainer = withStyles(CardListContainer, styles);

export default StyledCardListContainer;
