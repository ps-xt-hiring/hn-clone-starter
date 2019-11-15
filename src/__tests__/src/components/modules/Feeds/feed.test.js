import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Feeds } from '../../../../../components/module/Feeds';

configure({adapter: new Adapter()});

describe('render <Feeds /> Component', () => {
    let Component;

    beforeEach(() => {
        Component = shallow(<Feeds />);
    });

    it('render component', () => {
        expect(Component).toBeTruthy();
    });

    
});