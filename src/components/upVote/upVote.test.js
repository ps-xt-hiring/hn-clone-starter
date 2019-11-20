import React from 'react';
import renderer from 'react-test-renderer';
import UpVote from './upVote';

describe('UpVote Component', () => {
  it('Should have score nad id as params', () => {
    const component = renderer.create(<UpVote score={200} id={20897} />);
    const componentInstance = component.root;
    expect(Object.prototype.hasOwnProperty.call(componentInstance.props, 'score')).toBeTruthy();
    expect(Object.prototype.hasOwnProperty.call(componentInstance.props, 'id')).toBeTruthy();
  });
});
