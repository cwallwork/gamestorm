import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Game from '../source/javascripts/game';

describe('<Game/>', function () {
  it('should have a current game state', function () {
    const wrapper = shallow(<Game/>);
    expect(wrapper.state.currentGame).to.be.defined;
  });
  it('should have a get3cards method', function () {
  	const wrapper = shallow(<Game/>);
  	expect(wrapper.instance().get3Cards).to.be.defined;
  });
});

describe('<Game/>.get3Cards', function () {
	it('should return 3 items from a longer array', function () {
		const wrapper = shallow(<Game/>);
		const array = [1,2,3,4,5,6];
		expect(wrapper.instance().get3Cards(array).length).to.equal(3);
	});
});

describe('<Game/>.makeChallenge', function () {
	const testChallenge = {id: 99, challenge: ["test-intro", {type: "actor"}, {type: "tool"}, "test-ending"]};
	it('should return current challenge if slot type is not the same', function () {
		const wrapper = shallow(<Game/>);
		const badCard = {type: "bad", id: 99, text: "bad card"};
		expect(wrapper.instance().addCard(0,badCard,testChallenge)).to.equal(testChallenge);	
	});
	it('should add the card to the slot if the types match', function () {
		const wrapper = shallow(<Game/>);
		const goodCard = {type: "actor", id: 99, text: "an actor"};
		expect(wrapper.instance().addCard(1, goodCard, testChallenge)[1]).to.equal(goodCard);
	});
});