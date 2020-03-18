import React from 'react';
import { Box } from '@material-ui/core';
import { NoteBlockItemProps } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import DateTitle from './DateTitle';

const NoteBlockItem = (props: NoteBlockItemProps) => {
  const {
    date,
    messageList,
  } = props;
  
  return (
    <>
      <Box padding={0.5} paddingBottom={2} style={{
        borderRadius: 4,
        backgroundColor: props.selected ? '#eee' : '#fff'
      }}>
        <Box paddingBottom={1}>
          <DateTitle
            date={date} />
        </Box>
        {messageList.map(switchMessagesByType)}
      </Box>
      {/* <hr /> */}
    </>
  );
};

export default NoteBlockItem;