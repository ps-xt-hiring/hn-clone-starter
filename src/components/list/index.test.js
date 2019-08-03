import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import List from './index';
import Footer from '../footer'

const props = {
  feedData: []
};

describe('List component', () => {
  it('shallow renders without crashing', () => {
    shallow(<List {...props} />);
  });

  it('list should not change b/w renders', () => {
    const tree = renderer.create(<List {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('list should change on clicking more', () => {
    const tree = renderer.create(<ListItem {...props} />).toJSON();
    const footer = shallow(<Footer />);
    const moreBtn = wrapper.find('footer span');
    moreBtn.simulate('click');
    expect(tree).not.toMatchSnapshot();
  });
});
