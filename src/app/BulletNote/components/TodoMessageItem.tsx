import React from 'react';
import { Box } from '@material-ui/core';
import { ToDoMessageItemProps } from 'bullet-note';
import BasicMessageItem from './MessageItem';

const TodoMessageItem = (props: ToDoMessageItemProps) => {
  return (
    <Box>
      <BasicMessageItem
        {...props.message} />
    </Box>
  );
};

export default TodoMessageItem;