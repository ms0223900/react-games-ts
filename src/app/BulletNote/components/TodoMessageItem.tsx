import React from 'react';
import { Checkbox } from '@material-ui/core';
import { ToDoMessageItemProps } from './types';
import MessageItemWrapperContainerWithCtx from '../containers/wrappers/MessageItemWrapperContainer';

const TodoMessageItem = (props: ToDoMessageItemProps) => {
  return (
    <MessageItemWrapperContainerWithCtx
      {...props}>
      <Checkbox />
    </MessageItemWrapperContainerWithCtx>
  );
};

export default TodoMessageItem;