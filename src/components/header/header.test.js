

import React from 'react';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Header from './Header';
import HeaderNav from '../headerNav/HeaderNav';


describe("check if header renders",()=>{
    it('renders <Header /> components', () => {
        const wrapper = shallow(<Header  sortType="top" setSortType={jest.fn()}/>);
        //console.log(wrapper.debug());
        expect(wrapper.find(HeaderNav)).toHaveLength(1);
      });
});