import React from 'react';
import { Box } from '@material-ui/core';
import { NoteBlockListProps } from 'bullet-note';
import HandleMessageList from '../functions/handleMessageListToMessageWithDateList';
import NoteBlockItem from './NoteBlockItem';

const NoteBlockList = (props: NoteBlockListProps) => {
  console.log(props.messageList);
  const messageListWithDate = HandleMessageList.convertToMessageWithDateList(props.messageList);
  return (
    <Box>
      {messageListWithDate.map((m, i) => (
        <NoteBlockItem
          key={i}
          {...m} />
      ))}
    </Box>
  );
};

export default NoteBlockList;