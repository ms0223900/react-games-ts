import React from 'react';
import { MessageItem, MESSAGE_TYPE } from "bullet-note";
import TodoMessageItem from '../components/TodoMessageItem';

const switchMessagesByType = (messageItem: MessageItem, index: number) => {
  switch (messageItem.type) {
  case MESSAGE_TYPE.TODO:
    return (
      <TodoMessageItem
        key={index}
        {...messageItem}
      />
    );
  
  default:
    return null;
  }
};

export default switchMessagesByType;