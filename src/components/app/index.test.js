import React from 'react';
import { shallow } from 'enzyme';

import App from './index';

describe('App component', () => {
  it('shallow renders without crashing', () => {
    shallow(<App />);
  });

  it('renders loading', () => {
    const wrapper = shallow(<App />);
    const container = <main>Loading</main>;
    expect(wrapper).toContainReact(container);
  });
});
