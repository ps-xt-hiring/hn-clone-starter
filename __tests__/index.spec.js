import 'regenerator-runtime/runtime';
import * as React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import fetch from 'node-fetch';
import Router from 'next/router';
const routerPushed = jest.fn();
const mockedRouter = {
  push: (path) => {
    routerPushed(path);
    return new Promise((resolve, reject) => resolve());
  }
};
Router.router = mockedRouter;

configure({ adapter: new Adapter() });
import IndexPage, {getServerSideProps} from '../pages/index'

describe('Pages', () => {
  describe('Index', () => {
    let hits = [
      {
        "created_at": "2018-03-14T03:50:30.000Z", "title": "Stephen Hawking has died",
        "url": "http://www.bbc.com/news/uk-43396008", "author": "Cogito", "points": 6015,
        "story_text": null, "comment_text": null, "num_comments": 436, "story_id": null,
        "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1520999430,
        "relevancy_score": 8012, "_tags": ["story", "author_Cogito", "story_16582136"],
        "objectID": "16582136", "_highlightResult": {
          "title": { "value": "Stephen Hawking has died", "matchLevel": "none", "matchedWords": [] },
          "url": { "value": "http://www.bbc.com/news/uk-43396008", "matchLevel": "none", "matchedWords": [] },
          "author": { "value": "Cogito", "matchLevel": "none", "matchedWords": [] }
        }
      },
    ];
    let params = {
      data: { hits: [] },
      page: 0
    };

    it('should render without throwing an error', function () {
      const wrap = mount(<IndexPage {...{ data: { hits: [] }, page: 0 }} />);
      expect(wrap.find('article')).toHaveLength(0);
    });

    // it('should server side props be equal', async () => {
    //   // Inject anything you want to test
    //   let page = 0;
    //   let params = {
    //     query: { page }
    //   }
    //   const res = await fetch(`http://hn.algolia.com/api/v1/search?query=&page=${page}`)
    //   const data = await res.json();
    //   let responseData = { props: { data, page } };
    //   const props = await getServerSideProps(params);
    //   expect(props).toEqual(responseData);
    // });

    it('Load more should change url accordingly', async () => {
      let page = 2;
      let params = {
        query: { page }
      }
      const props = await getServerSideProps(params);
      const wrap = mount(<IndexPage {...props.props} />);
      let loadMoreBtn = wrap.find('a.load-more');
      loadMoreBtn.simulate('click');
      expect(routerPushed).toHaveBeenCalledWith(`/?page=${page + 1}`);
    });

    describe('vote button click', () => {

      let paramsWithData = Object.assign({}, params);
      paramsWithData.data.hits = hits;

      it('should render one row', function () {
        const wrap = mount(<IndexPage {...paramsWithData} />);
        expect(wrap.find('article')).toHaveLength(1);
      });

      it('upvote button click should update state', function () {
        const wrap = mount(<IndexPage {...paramsWithData} />);
        let upvoteButton = wrap.find('button.vote-btn');
        upvoteButton.simulate('click');
        console.log(upvoteButton.find('img').prop('title'));
        expect(upvoteButton).toHaveLength(1);
      });

      it('should hide on button click', function () {
        const wrap = mount(<IndexPage {...paramsWithData} />);
        let upvoteButton = wrap.find('button.hide-btn');
        upvoteButton.simulate('click');
        expect(upvoteButton).toHaveLength(1);
      })
    });

  })
})