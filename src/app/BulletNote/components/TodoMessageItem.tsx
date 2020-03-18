import React from 'react';
import { Box, Checkbox } from '@material-ui/core';
import { ToDoMessageItemProps } from '../types';
import BasicMessageItem from './MessageItem';

const TodoMessageItem = (props: ToDoMessageItemProps) => {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Checkbox />
      <BasicMessageItem
        {...props.message} />
    </Box>
  );
};

export default TodoMessageItem;