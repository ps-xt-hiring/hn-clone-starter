import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ListItem from './index';

const props = {
  data: {}, upvoteHandler: () => { }, hideItemHandler: () => { }
};

describe('ListItem component', () => {
  it('shallow renders without crashing', () => {
    shallow(<ListItem {...props} />);
  });

  it('item should not change b/w renders', () => {
    const tree = renderer.create(<ListItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
