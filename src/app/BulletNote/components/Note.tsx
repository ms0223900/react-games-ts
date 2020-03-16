import React from 'react';
import { Box } from '@material-ui/core';
import { NoteProps } from 'bullet-note';
import switchMessagesByType from '../functions/switchMessagesByType';

const Note = (props: NoteProps) => {
  return (
    <Box>
      {props.messageList.map(switchMessagesByType)}
    </Box>
  );
};

export default Note;