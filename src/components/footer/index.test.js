import React from 'react';
import { shallow } from 'enzyme';

import Footer from './index';

describe('Footer component', () => {
  it('shallow renders without crashing', () => {
    shallow(<Footer />);
  });

  it('renders more link', () => {
    const wrapper = shallow(<Footer />);
    const text = wrapper.find('footer span').text();
    expect(text).toEqual('More');
  });

  xit('renders loading', () => {
    const wrapper = shallow(<Footer />);
    const container = <footer className="footer-container"><span onClick={handleMore}>More</span></footer>;
    expect(wrapper).toContainReact(container);
  });
});
