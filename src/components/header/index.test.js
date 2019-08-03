import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Header from './index';

describe('Header component', () => {
  it('shallow renders without crashing', () => {
    shallow(<Header />);
  });

  it('renders top link', () => {
    const wrapper = shallow(<Header />);
    const text = wrapper.find('span.top').text();
    expect(text).toEqual('top');
  });

  it('renders new link', () => {
    const wrapper = shallow(<Header />);
    const text = wrapper.find('span.new').text();
    expect(text).toEqual('new');
  });

  it('header should not change b/w renders', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
