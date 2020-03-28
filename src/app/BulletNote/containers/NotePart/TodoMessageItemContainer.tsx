import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { TodoMessageItemContainerProps, TodoMessageItemContainerWithCtxProps } from '../types';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import TodoMessageItem from 'app/BulletNote/components/TodoMessageItem';
import { toggleMessageIsDone } from 'app/BulletNote/actions/message-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from 'app/BulletNote/constants/context';

const TodoMessageItemContainer = (props: TodoMessageItemContainerProps) => {
  const {
    message,
    toggleTodoActionFn,
  } = props;
  const {
    id
  } = message;

  const handleToggleTodo = useCallback((e: any, isDone: boolean) => {
    return toggleTodoActionFn(id, isDone);
  }, [id, toggleTodoActionFn]);

  return (
    <TodoMessageItem
      {...props}
      onToggleTodo={handleToggleTodo} />
  );
};

type OwnProps = TodoMessageItemContainerWithCtxProps

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  toggleTodoActionFn: TodoMessageItemContainerProps['toggleTodoActionFn']
}> = (dispatch) => {
  return ({
    toggleTodoActionFn: (id: string, isDone: boolean) => {
      const action = toggleMessageIsDone(id, isDone);
      dispatch(action);
    },
  });
};

const TodoMessageItemContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(TodoMessageItemContainer);

export default TodoMessageItemContainerWithCtx;