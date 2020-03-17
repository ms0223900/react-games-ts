import React from 'react';
import { Box } from '@material-ui/core';
import { NoteBlockItemProps } from 'bullet-note';
import switchMessagesByType from '../functions/switchMessagesByType';
import DateTitle from './DateTitle';

const NoteBlockItem = (props: NoteBlockItemProps) => {
  const {
    date,
    messageList,
  } = props;
  
  return (
    <Box>
      <Box paddingBottom={1}>
        <DateTitle
          date={date} />
      </Box>
      {messageList.map(switchMessagesByType)}
      <hr />
    </Box>
  );
};

export default NoteBlockItem;