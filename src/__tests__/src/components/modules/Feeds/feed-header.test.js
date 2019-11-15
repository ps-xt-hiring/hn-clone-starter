import React from 'react';
import { configure, shallow } from 'enzyme';
import { FeedHeader } from '../../../../../components/module/Feeds';

import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });

describe('Execute <FeedHeader /> Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<FeedHeader />);
  });

  it('renders feed header component', () => {
    expect(component).toBeTruthy();
  });

  it('renders .header-logo class', () => {
    expect(component.hasClass('header-container')).toBeTruthy();
  });

  it('renders two button', () => {
    expect(component.find('button').length).toEqual(2);
  });
});



