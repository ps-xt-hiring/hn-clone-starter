import React from 'react';
import renderer from 'react-test-renderer';
import Loader from './Loader';

describe('Loader Component', () => {
  it('Should have loading parameter', () => {
    const component = renderer.create(<Loader loading={null} />);
    const componentInstance = component.root;
    expect(Object.prototype.hasOwnProperty.call(componentInstance.props, 'loading')).toBeTruthy();
  });

  it('Should not return any ouput on false', () => {
    const component = renderer.create(<Loader loading={false} />);
    const componentInstance = component.root;
    expect(componentInstance.props.loading).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('Should return on true', () => {
    const component = renderer.create(<Loader loading />);
    const componentInstance = component.root;
    expect(componentInstance.props.loading).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
