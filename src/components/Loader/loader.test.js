import React from 'react';
import Loader from './Loader';
import renderer from 'react-test-renderer';

describe("Loader Component", () => {
  it("Should have loading parameter", () => {
    let component = renderer.create(<Loader loading={null} />);
    let componentInstance = component.root;
    expect(Object.prototype.hasOwnProperty.call(componentInstance.props, 'loading')).toBeTruthy();;
  });

  it("Should not return any ouput on false", () => {
    let component = renderer.create(<Loader loading={false} />);
    let componentInstance = component.root;
    expect(componentInstance.props.loading).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it("Should return on true", () => {
    let component = renderer.create(<Loader loading={true} />);
    let componentInstance = component.root;
    expect(componentInstance.props.loading).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
