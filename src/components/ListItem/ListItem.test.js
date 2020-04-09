import React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';
import { listItemData } from '../../mockData';
const { index, item, updateVotesAction } = listItemData;

it('renders without crashing', () => {
  const component = shallow(
    <ListItem updateVotesAction={updateVotesAction} index={index} item={item} />
  );
});
