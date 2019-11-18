import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../../../components/module/button'

configure({ adapter: new Adapter() });


describe('Button Component', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Button />)
    })
    it('Component renders', () => {
        expect(component).toBeTruthy();
    })
    it('text show', () => {
        component = shallow(<Button>show</Button>)
        expect(component.props().children).toEqual('show');
    })
    it('text hide', () => {
        component = shallow(<Button>hide</Button>)
        expect(component.props().children).toEqual('hide');
    })
})
