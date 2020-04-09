import React from 'react';
import { shallow } from 'enzyme';
import HackerNews from './HackerNews';
import { HackerNewsData } from '../mockData';
const { pageNo, isFetching, error, news, updateVotesAction } = HackerNewsData;

describe('HackerNews Component', () => {
  let wrapper;
  const mockfetchNewsFirstPage = jest.fn();
  beforeEach(() => {
    mockfetchNewsFirstPage.mockClear();
    wrapper = shallow(
      <HackerNews
        fetchNewsForFirstPage={mockfetchNewsFirstPage}
        isFetching={isFetching}
        pageNo={pageNo}
        error={error}
        news={news}
        updateVotesAction={updateVotesAction}
      />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the mock fetchNewsForFirstPage function on Mount', () => {
    expect(mockfetchNewsFirstPage.mock.calls.length).toBe(1);
  });
});
