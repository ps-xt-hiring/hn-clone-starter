import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent, wait, getAllByTestId } from '@testing-library/react';
import {fetchFeedsData as mockFeedDataApi} from '../actions/feed';
import '@testing-library/jest-dom'
import FeedContainer from '../container/feed/Feed';

  afterEach(cleanup);
jest.mock('../actions/feed.js', () => {
    return {
        fetchFeedsData: jest.fn(subject =>
        Promise.resolve({ hits:[{
 created_at: "2020-02-16T11:53:16.000Z",
title: "1-on-1 meeting questions",
url: "https://github.com/VGraupera/1on1-questions",
author: "yankit",
points: 672,
story_text: null,
comment_text: null,
num_comments: 218,
story_id: null,
story_title: null,
story_url: null,
parent_id: null,
created_at_i: 1581853996,
objectID: "22341138"
        }]}),
      ),
    }
  })

  test('loads feeds data',  async () => {

  const {getByLabelText, getByText, queryByTestId, getByTestId, container} = render(<FeedContainer/>)
    expect(getByTestId('loader')).toBeTruthy();
    expect(mockFeedDataApi).toHaveBeenCalledTimes(1);
    expect(mockFeedDataApi).toHaveBeenCalledWith(0, "front_page");
     await wait(() => expect(getByText("yankit")).toBeTruthy());
      expect(getByTestId('feedItems').children.length).toBe(1);
  })


// upvote click handler
test('upvote feeds works correctly',  async () => {
const {getByLabelText, getByText, queryByTestId, getByTestId, container} = render(<FeedContainer/>)
let data = localStorage.getItem('upvotedFeeds') || [];
data = JSON.parse(data);
await wait(() => expect(getByText("yankit")).toBeTruthy());
fireEvent.click(getByTestId('upvoteFeed'));
let data1 = JSON.parse(localStorage.getItem('upvotedFeeds'));
expect(data1.length).toBe(data.length + 1);
})



// hide button click test
test('hide feeds works correctly',  async () => {
  const {getByLabelText, getByText, queryByTestId, getByTestId, container} = render(<FeedContainer/>)
let data = localStorage.getItem('hiddenFeeds') || [];
data = JSON.parse(data);
await wait(() => expect(getByText("yankit")).toBeTruthy());
fireEvent.click(getByTestId('hideFeed'));
let data1 = JSON.parse(localStorage.getItem('hiddenFeeds'));
expect(data1.length).toBe(data.length + 1);
})


