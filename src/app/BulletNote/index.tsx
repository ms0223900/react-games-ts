import React from 'react';
import { Box } from '@material-ui/core';
import ContextWrapper from './constants/context';
import InputPartContainerWithCtx from './containers/InputPart/InputPartContainer';
import { messageList } from 'stories/__mocks/bulletNote-mock';
import NotePartContainerWithCtx from './containers/NotePart/NotePartContainer';

const BulletNote = () => {
  return (
    <ContextWrapper customInitState={{
      // messageList: messageList
    }}>
      <NotePartContainerWithCtx />
      <InputPartContainerWithCtx />
    </ContextWrapper>
  );
};



export default BulletNote;