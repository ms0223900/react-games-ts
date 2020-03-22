import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { BasicMessage } from '../types';
import BulletTagList from './BullteTagList';
import { BasicMessageItemProps } from './types';
import MessageItemButtons from './MessageItemButtons';

const regDateToString = (date: Date | string) => {
  if(typeof date === 'string') return date;
  return date.toLocaleDateString();
};

const BasicMessageItem = (props: BasicMessageItemProps) => {
  const {
    content,
    // dateTagList,
    tagList,
    createdAt,
  } = props.message;

  return (
    <Box 
      display={'flex'} 
      alignItems={'center'} 
    >
      <Typography variant={'subtitle1'} contentEditable={true}>
        {content}
      </Typography>
      <BulletTagList
        tagList={tagList} />
      <Typography variant={'body1'} color={'textSecondary'}>
        {regDateToString(createdAt)}
      </Typography>
      <MessageItemButtons
        onDelete={props.onDelete} />
    </Box>
  );
};

export default BasicMessageItem;