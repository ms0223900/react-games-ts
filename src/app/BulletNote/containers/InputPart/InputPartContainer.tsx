import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import useInput from 'lib/customHooks/useInput';
import InputPart from 'app/BulletNote/components/InputPart/InputPart';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { InputPartContainerProps } from '../types';
import { addMessage } from 'app/BulletNote/actions/inputPart-actions';
import { connectCtx } from 'react-function-helpers';
import { ContextStore } from '../../constants/context';

const InputPartContainer = (props: InputPartContainerProps) => {
  const {
    value,
    setVal,
    handleChange,
  } = useInput();

  const handleSendMessage = useCallback(() => {
    props.addMessageFn(value);
    setVal('');
  }, [props, setVal, value]);

  return (
    <InputPart
      value={value}
      onChange={handleChange}
      onSendMessage={handleSendMessage} />
  );
};

interface OwnProps {}

const mapDispatchToProps: MapDispatchToProps<OwnProps, InputPartContainerProps> = (dispatch) => {
  return ({
    addMessageFn: (rawMessage: string) => {
      const action = addMessage(rawMessage);
      dispatch(action);
    }
  });
};

const InputPartContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(InputPartContainer);

export default InputPartContainerWithCtx;