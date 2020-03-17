import React from 'react';
import TodoMessageItem from '../components/TodoMessageItem';
import { MessageItem, MESSAGE_TYPE } from 'app/BulletNote/types';

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