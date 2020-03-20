import React from 'react';
import { Box } from '@material-ui/core';
import ContextWrapper from './constants/context';
import InputPartContainerWithCtx from './containers/InputPart/InputPartContainer';
import NotePartWithCtx from './components/NotePart/NotePart';
import { messageList } from 'stories/__mocks/bulletNote-mock';

const BulletNote = () => {
  return (
    <ContextWrapper customInitState={{
      messageList: messageList
    }}>
      <NotePartWithCtx />
      <InputPartContainerWithCtx />
    </ContextWrapper>
  );
};



export default BulletNote;