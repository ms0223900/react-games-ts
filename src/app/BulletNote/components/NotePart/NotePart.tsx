import React from 'react';
import { Box } from '@material-ui/core';
import { NotePartProps } from '../types';
import NoteBlockList from '../NoteBlockList';
import DownloadMessageListWithCtx from '../DownloadMessageList';
import RestoreBackup from '../RestoreBackup';

const NotePart = (props: NotePartProps) => {
  return (
    <Box>
      <>
        <DownloadMessageListWithCtx />
        <RestoreBackup />
      </>
      <NoteBlockList
        {...props} />
    </Box>
  );
};

export default NotePart;