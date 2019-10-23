import React from 'react';
import { shallow, mount } from 'enzyme';
import { splitSingleMessage, parsedSingleMessage } from 'app/AnKa/fn';

describe('test functions', () => {
  it('test parsedSingleMessage', () => {
    // splitSingleMessage();
  });

  it('test parsedSingleMessage', () => {
    const splitSingleMessage_mockData = splitSingleMessage();
    parsedSingleMessage(splitSingleMessage_mockData);
  });
});