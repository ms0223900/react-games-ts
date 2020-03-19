import React from 'react';
import { Box } from '@material-ui/core';
import { NoteBlockItemProps } from '../types';
import switchMessagesByType from '../functions/switchMessagesByType';
import DateTitle from './DateTitle';
import HandleTagSortMessage from '../functions/handleTagSortMessage';
import TagNoteBlockItem from './TagNoteBlockItem';

const NoteBlockItem = (props: NoteBlockItemProps) => {
  const {
    date,
    messageList,
  } = props;

  const tagNoteBlockObj = HandleTagSortMessage.getTagNoteBlockObj(messageList);
  const tags = Object.keys(tagNoteBlockObj);
  
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
        {tags.map((t, i) => (
          <TagNoteBlockItem
            key={i}
            {...tagNoteBlockObj[t]} />
        ))}
      </Box>
      {/* <hr /> */}
    </>
  );
};

export default NoteBlockItem;