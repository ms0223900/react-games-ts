import React from 'react';
import TodoMessageItem from '../components/TodoMessageItem';
import { MessageItem, MESSAGE_TYPE } from '../types';

const switchMessagesByType = (messageItemProps: MessageItem, index: number) => {
  switch (messageItemProps.type) {
    
  case MESSAGE_TYPE.TODO:
    return (
      <TodoMessageItem
        key={index}
        {...messageItemProps}
      />
    );
  
  default:
    return null;
  }
};

export default switchMessagesByType;