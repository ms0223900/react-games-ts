import React from 'react';
import { shallow, mount } from 'enzyme';
import { 
  splitSingleMessage, 
  parsedSingleMessage,
  convertContent,
  getConvertContentFromTypes,
} from 'app/AnKa/fn';
import { message_input_mockData } from 'app/AnKa/storage/mockData';

describe('test functions', () => {
  it('test parsedSingleMessage', () => {
    // splitSingleMessage();
  });

  it('test parsedSingleMessage', () => {
    const splitSingleMessage_mockData = splitSingleMessage();
    parsedSingleMessage(splitSingleMessage_mockData);
  });

  it('test convertContent function', () => {
    const convertedContent = convertContent(message_input_mockData, 2);
    console.log(convertedContent);
  });

  it('test getConvertContentFromTypes function', () => {
    
  });
});