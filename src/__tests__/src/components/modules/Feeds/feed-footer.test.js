import React from 'react';
import { shallow, configure } from 'enzyme';
import { FeedFooter } from '../../../../../components/module/Feeds';

import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('render <FeeFooter/> Component', () => {
    let component;
    
    beforeEach(() => {
        component = shallow(<FeedFooter/>);
    });

    it('renders feed footer component', () => {
        expect(component).toBeTruthy();
    });

    it('renders .feed-footer class', () => {
        expect(component.hasClass('feed-footer')).toBeTruthy();
    });
});