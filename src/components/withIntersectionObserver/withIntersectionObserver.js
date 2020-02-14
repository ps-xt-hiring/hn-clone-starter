import React from 'react';
import fetch from '../../utils/fetch';

export default function withIntersectionObserver(Component) {
  class WithObserver extends React.PureComponent {
    static async fetchData(pageNumber) {
      const url = `https://hn.algolia.com/api/v1/search?page=${pageNumber}&hitsPerPage=50&numericFilters=num_comments>0`;
      const data = await fetch(url);
      return data;
    }

    constructor(props) {
      super(props);
      this.state = { pageNumber: 1, data: {} };
      this.positionY = 0;
      this.pageNumber = 1;
    }

    componentDidMount() {
      console.log('with observer component did mount called');
      const targetEl = document.getElementById('intersection-observer-target');
      const intersectionObserverCallback = async (entries) => {
        const {
          state: {
            pageNumber,
          },
        } = this;
        entries.forEach(async (entry) => {
          console.log('inside intersectionObserverCallback');
          if (entry.boundingClientRect.y > this.positionY) {
            console.log('scrolling down --->');
          } else {
            console.log('<---  scrolling up ');
            console.log('time to make ajax call');
            const data = await WithObserver.fetchData(pageNumber);
            console.log('data fetched through intersection observer callback ', data.hits);
            this.setState({
              pageNumber: pageNumber + 1,
              data: data.hits,
            });
          }
          console.log('this.pageNumber ', pageNumber);
          console.log('this.positionY', this.positionY);
          this.positionY = entry.boundingClientRect.y;
        });
      };
      console.log('target El ', targetEl);
      const intersectionObserverOptions = {
        thershold: 1.0,
        root: null,
        rootMargin: '0px',
      };
      const observer = new IntersectionObserver(
        intersectionObserverCallback, intersectionObserverOptions,
      );
      observer.observe(targetEl);
    }


    render() {
      const {
        props,
        state: {
          data,
        },
      } = this;
      console.log('this.positionY ---', this.pageNumber);
      return <>
        <Component {...props} data={data} />
        <hr id="intersection-observer-target" style={{ visibility: 'hidden' }} />
            </>;
    }
  }
  return WithObserver;
}
