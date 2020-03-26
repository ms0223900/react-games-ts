import React, { useCallback, ChangeEvent } from 'react';
import { Box } from '@material-ui/core';
import BasicMessageItem from '../components/BasicMessageItem';
import { BasicMessageItemContainerProps, BasicMessageItemContainerWithCtxProps } from './types';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { editMessage, toggleMessageIsStar } from '../actions/message-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from '../constants/context';

const BasicMessageItemContainer = (props: BasicMessageItemContainerProps) => {
  const {
    editActionFn,
    starActionFn,
    message
  } = props;

  const handleEdit = useCallback((e: ChangeEvent<HTMLElement>) => {
    const { innerText } = e.target;
    const { id } = message;
    console.log(id, innerText);
    editActionFn(id, innerText);
  }, [editActionFn, message]);

  const handleToggleStarMessage = useCallback((isStar: boolean | undefined) => {
    const { id } = message;
    console.log(id, isStar);
    starActionFn(id, isStar);
  }, [message, starActionFn]);

  return (
    <BasicMessageItem
      {...props}
      onStarMessage={handleToggleStarMessage}
      onEditMessage={handleEdit} />
  );
};

interface OwnProps extends BasicMessageItemContainerWithCtxProps {}

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  editActionFn: BasicMessageItemContainerProps['editActionFn'],
  starActionFn: BasicMessageItemContainerProps['starActionFn']
}> = (dispatch) => {
  return ({
    editActionFn: (id: string, newMessage: string) => {
      const action = editMessage(id, newMessage);
      dispatch(action);
    },
    starActionFn: (id, isStar) => {
      const action = toggleMessageIsStar(id, isStar);
      dispatch(action); 
    }
  });
};

const BasicMessageItemContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(BasicMessageItemContainer);

export default BasicMessageItemContainerWithCtx;