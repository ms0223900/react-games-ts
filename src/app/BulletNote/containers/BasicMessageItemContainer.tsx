import React, { useCallback, ChangeEvent } from 'react';
import { Box } from '@material-ui/core';
import BasicMessageItem from '../components/BasicMessageItem';
import { BasicMessageItemContainerProps, BasicMessageItemContainerWithCtxProps } from './types';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { editMessage } from '../actions/message-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from '../constants/context';

const BasicMessageItemContainer = (props: BasicMessageItemContainerProps) => {
  const {
    editActionFn,
    message
  } = props;

  const handleEdit = useCallback((e: ChangeEvent<HTMLElement>) => {
    const { innerText } = e.target;
    const { id } = message;
    console.log(id, innerText);
    editActionFn(id, innerText);
  }, [editActionFn, message]);

  return (
    <BasicMessageItem
      {...props}
      onEditMessage={handleEdit} />
  );
};

interface OwnProps extends BasicMessageItemContainerWithCtxProps {}

const mapDispatchToProps: MapDispatchToProps<OwnProps, {
  editActionFn: BasicMessageItemContainerProps['editActionFn']
}> = (dispatch) => {
  return ({
    editActionFn: (id: string, newMessage: string) => {
      const action = editMessage(id, newMessage);
      dispatch(action);
    }
  });
};

const BasicMessageItemContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(BasicMessageItemContainer);

export default BasicMessageItemContainerWithCtx;