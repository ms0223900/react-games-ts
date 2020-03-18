import React from 'react';
import { Box } from '@material-ui/core';
import { NoteBlockListProps } from '../types';
import HandleMessageList from '../functions/handleMessageListToMessageWithDateList';
import NoteBlockItem from './NoteBlockItem';
import checkDateIsToday from '../functions/checkDateIsToday';

const NoteBlockList = (props: NoteBlockListProps) => {
  console.log(props.messageList);
  const messageListWithDate = HandleMessageList.convertToMessageWithDateList(props.messageList);
  return (
    <Box>
      {messageListWithDate.map((m, i) => (
        <NoteBlockItem
          key={i}
          selected={checkDateIsToday(m.date)}
          {...m} />
      ))}
    </Box>
  );
};

export default NoteBlockList;