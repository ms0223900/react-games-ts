import React from 'react';
import TodoMessageItem from '../components/TodoMessageItem';
import { MessageItem, MESSAGE_TYPE, TagNoteBlockItemProps } from '../types';

const switchMessagesByType = ({
  index, 
  messageItemProps,
  onToggleTodo,
}: {
  messageItemProps: MessageItem, 
  index: number, 
  onToggleTodo: TagNoteBlockItemProps['onToggleTodo']
}) => {
  switch (messageItemProps.type) {
    
  case MESSAGE_TYPE.TODO: {
    return (
      <TodoMessageItem
        key={index}
        {...messageItemProps}
        onToggleTodo={onToggleTodo(messageItemProps.message.id)}
      />
    );
  }
  
  default:
    return null;
  }
};

export default switchMessagesByType;