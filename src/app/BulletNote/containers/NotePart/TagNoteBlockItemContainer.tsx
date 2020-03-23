import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import TagNoteBlockItem from 'app/BulletNote/components/TagNoteBlockItem';
import { TagNoteBlockItemContainerProps, TagNoteBlockItemContainerWithCtxProps } from '../types';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { toggleMessageIsDone } from 'app/BulletNote/actions/message-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from 'app/BulletNote/constants/context';

const TagNoteBlockItemContainer = (props: TagNoteBlockItemContainerProps) => {
  const handleToggleTodo = useCallback((id) => {
    return (e: any, checked: boolean) => {
      props.toggleTodoAction(id, checked);
    };
  }, [props]);

  return (
    <TagNoteBlockItem
      {...props}
      onToggleTodo={handleToggleTodo} />
  );
};

type OwnProps = TagNoteBlockItemContainerWithCtxProps

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  toggleTodoAction: TagNoteBlockItemContainerProps['toggleTodoAction']
}> = (dispatch) => {
  return ({
    toggleTodoAction: (id: string, isDone: boolean) => {
      const action = toggleMessageIsDone(id, isDone);
      dispatch(action);
    }
  });
};

const TagNoteBlockItemContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(TagNoteBlockItemContainer);

export default TagNoteBlockItemContainerWithCtx;