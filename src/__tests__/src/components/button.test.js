import React from 'react'
//import Enzyme, { shallow } from 'enzyme';
//import EnzymeAdapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Button from '../../../components/module/button'

//Enzyme.configure({ adapter: new EnzymeAdapter(), disableLifecycleMethods: true });
configure({ adapter: new Adapter(), disableLifecycleMethods: true })

describe('Button Component', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Button />)
    })
    it('renders successfully', () => {
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
    it(('renders correctly'), () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
})
