import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import R from 'ramda';

import Game from '../source/javascripts/game';


const goodCard = {type: "actor", id: 99, text: "an actor"};

describe('<Game/>', function () {
  const wrapper = shallow(<Game/>);

  it('should have a current game state', function () {
    expect(wrapper.state.currentGame).to.be.defined;
  });
  it('should have a get3cards method', function () {
  	expect(wrapper.instance().get3Cards).to.be.defined;
  });
});


describe('<Game/>.get3Cards', function () {
  const wrapper = shallow(<Game/>);

	it('should return 3 items from a longer array', function () {
		const array = [1,2,3,4,5,6];
		expect(wrapper.instance().get3Cards(array).length).to.equal(3);
	});
});


describe('<Game/>.addCard', function () {
  const wrapper = shallow(<Game/>);
	const testChallenge = {id: 99, challenge: ["test-intro", {type: "actor"}, {type: "tool"}, "test-ending"]};

	it('should add the card to the slot if the types match', function () {
    wrapper.instance().addCard(1, goodCard, testChallenge);
		expect(wrapper.instance().
	});
});


describe('<Game/>.selectCard', function () {
  const wrapper = shallow(<Game/>);
  it('should add the clicked card if the selection is empty', function () {
    wrapper.instance().selectCard(goodCard);
    expect(wrapper.instance().state.cardSelected).to.equal(goodCard);
  });

  it('should replace the current card when a different card is selected', function () {
    wrapper.instance().selectCard(goodCard);
    const differentCard = {type: "tool", id: 98, text: "a tool"};
    wrapper.instance().selectCard(differentCard);
    expect(wrapper.instance().state.cardSelected).to.equal(differentCard);
  });

  it('should return the currently selected card to the users hand', function () {
    let actorsHand = [{type: "actor", id: 97, text: "another actor"}]
    wrapper.instance().state.currentGame.actors = actorsHand;
    wrapper.instance().selectCard(goodCard);
    expect(wrapper.instance().state.currentGame.actors).to.eql(actorsHand);
  });
});


describe('<Game/>.returnUserCard', function () {
  const wrapper = shallow(<Game/>);
  const toolCard = {type: "tool", id: 1, text: "A Tool"};

  it('should remove the currently selected card', () => {
    wrapper.instance().selectCard(goodCard);
    wrapper.instance().returnUserCard(wrapper.instance().state.cardSelected);
    expect(wrapper.instance().state.cardSelected).to.be.empty;
  });

  it('should return an actor card to the actor hand', () => {
    expect(wrapper.instance().state.currentGame.actors).to.eql([goodCard]);
  });
    
  it('should return a tool card to the tool hand', () => {
    wrapper.instance().returnUserCard(toolCard);
    expect(wrapper.instance().state.currentGame.tools).to.eql([toolCard]);
  });

});

describe('<Game/>.removeCardFromHand', function () {
  const wrapper = shallow(<Game/>);
  const aTool = {type: "tool", id:1, text: "a tool"};
  const anotherActor = {type: "actor", id: 1, text: "actor 1"};
  
  wrapper.instance().setState({
    currentGame: {
      actors: [anotherActor],
      tools: [aTool]
    }
  });

  it('should remove the given card from a users hand', function () {
    wrapper.instance().removeCardFromHand(anotherActor);

    expect(wrapper.instance().state.currentGame.actors).not.include(anotherActor);
   });

  it('should not alter the other hand', () => expect(wrapper.instance().state.currentGame.tools).to.eql([aTool]));
});

describe('<Game/>.removeSelection', () => {
  const wrapper = shallow(<Game/>);
  it('should empty the selected card', () => {
    wrapper.instance().setState({cardSelected: goodCard});
    wrapper.instance().removeSelection();
    expect(wrapper.instance().state.cardSelected).to.eql({});  
  })
  

})

