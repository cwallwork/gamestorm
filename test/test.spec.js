import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Game from '../source/javascripts/game';

describe('<Game/>', function () {
  it('should have a current game state', function () {
    const wrapper = shallow(<Game/>);
    expect(wrapper.state.currentGame).to.be.defined;
  });
});