import React from 'react';
import { Box } from '@material-ui/core';
import { NotePartProps } from '../types';
import NoteBlockList from '../NoteBlockList';

const NotePart = (props: NotePartProps) => {
  return (
    <Box>
      <NoteBlockList
        {...props} />
    </Box>
  );
};

export default NotePart;