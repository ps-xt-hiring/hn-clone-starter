import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import FeedHeader from '../components/feed/Header';


const categories = [
    {
      id: 1,
      active: true,
      key: "top",
      tag: "front_page"
    },
    {
      id: 2,
      active: false,
      key: "new",
      tag: null
    }
  ]
  afterEach(cleanup);
// it('Header renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<FeedHeader categories={categories}/>, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

const getNewsFeeds = jest.fn();
const { getByTestId, getAllByTestId} = render(<FeedHeader getNewsFeeds={getNewsFeeds} categories={categories}/>);

it('load navigation items',()=>{
expect(getByTestId("navigation").children.length).toBe(categories.length);
})

it('navigation item should click',()=>{
    const getNewsFeeds = jest.fn();
    const { getAllByTestId } = render(<FeedHeader getNewsFeeds={getNewsFeeds} categories={categories}/>);
    fireEvent.click(getAllByTestId('navigationItem')[0])
    expect(getNewsFeeds).toHaveBeenCalledTimes(1)
    })