import React from 'react';
import { shallow } from 'enzyme';
import ListWrapper from './ListWrapper';
import { listWrapperData } from '../../mockData';
const {
  isFetching,
  error,
  pageNo,
  news,
  updateVotesAction,
  fetchNewsForFirstPage,
} = listWrapperData;

it('renders without crashing', () => {
  const component = shallow(
    <ListWrapper
      isFetching={isFetching}
      error={error}
      pageNo={pageNo}
      news={news}
      updateVotesAction={updateVotesAction}
      fetchNewsForFirstPage={fetchNewsForFirstPage}
    />
  );
  expect(component).toMatchSnapshot();
});
