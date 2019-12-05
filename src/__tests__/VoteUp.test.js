import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { VoteUp } from '../components/News/ListUtils';

Enzyme.configure({ adapter: new Adapter() });

describe("VoteUp Component", () => {
    let wrapper;
    const parentincreaseVoteCount = jest.fn();
    parentincreaseVoteCount.mockReturnValue(1);
    const increaseVoteCount = jest.fn(() => parentincreaseVoteCount()
   );
    beforeEach(() => {
        wrapper = shallow(<VoteUp increaseVoteCount={increaseVoteCount} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it("Testing Vote Up", () => {
        wrapper.find(".newList__voteUp").first().simulate("click");
        expect(increaseVoteCount).toBeCalled();
        expect(increaseVoteCount.mock.results[0].value).toBe(1);
     });
});