import React from 'react';
import PropTypes from 'prop-types';
import { BreedingRhombusSpinner } from 'react-epic-spinners';
import styles from './CardList.style';
import withStyles from '../../utils/withStyles';
import fetch from '../../utils/fetch';
import Card from '../DisplayCard/Card';

class CardList extends React.PureComponent {
  static async fetchData(pageNumber) {
    const url = `https://hn.algolia.com/api/v1/search?page=${pageNumber}&numericFilters=num_comments>0`;
    const data = await fetch(url);
    return data;
  }

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };

    this.dataLoading = true;
  }

  async componentDidMount() {
    const {
      props: { currentPage },
    } = this;
    const data = await CardList.fetchData(currentPage);
    const filteredData = CardList.getFilteredData(data.hits);
    this.dataLoading = false;
    this.setState({
      data: filteredData,
    });

    console.log('data ', data);
  }

  async componentDidUpdate(prevProps) {
    const {
      currentPage: prevPage,
    } = prevProps;
    const {
      props: {
        currentPage,
      },
    } = this;
    if (currentPage !== prevPage) {
      const data = await CardList.fetchData(currentPage);
      const filteredData = CardList.getFilteredData(data.hits);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        data: filteredData,
      });
    }
  }

  static getFilteredData(data) {
    const hiddenCards = window && window.localStorage && window.localStorage.getItem('hiddenCards');
    const hiddenCardsObj = (hiddenCards && JSON.parse(hiddenCards)) || {};
    return data.filter(item => !hiddenCardsObj[item.objectID]);
  }

  handleHideClick(objectID) {
    if (window && window.localStorage) {
      const storageKey = 'hiddenCards';
      const hiddenCards = window.localStorage.getItem(storageKey);
      let updatedHiddenCards;
      if (hiddenCards) {
        const hiddenCardsObj = JSON.parse(hiddenCards);
        updatedHiddenCards = { ...hiddenCardsObj, [objectID]: true };
      } else {
        updatedHiddenCards = { [objectID]: true };
      }
      window.localStorage.setItem(storageKey,
        JSON.stringify(updatedHiddenCards));

      const {
        state: {
          data,
        },
      } = this;

      const filteredData = CardList.getFilteredData(data);
      this.setState({
        data: filteredData,
      });
    }
  }

  renderList(data) {
    return data.map(
      (details, idx) => (
        <Card
          data={details}
          key={details.objectID}
          idx={idx}
          handleHideClick={objectID => this.handleHideClick(objectID)}
        />
      ),
    );
  }


  render() {
    const {
      state: { data },
      props: { className },
      dataLoading,
    } = this;
    const conatinerClassName = `${className} display-card-list`;
    return (
      <>
        {dataLoading && (
        <div className="display-class-list__loader">
          <BreedingRhombusSpinner color="grey" />
        </div>)}
        { !dataLoading && (
        <div className={conatinerClassName}>
          {data && data.length && this.renderList(data)}
        </div>)}
      </>
    );
  }
}

CardList.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number,
};

CardList.defaultProps = {
  className: '',
  currentPage: 1,
};

export default withStyles(CardList, styles);
