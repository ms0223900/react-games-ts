import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { BasicMessage } from '../types';
import BulletTagList from './BullteTagList';

const regDateToString = (date: Date | string) => {
  if(typeof date === 'string') return date;
  return date.toLocaleDateString();
};

const BasicMessageItem = (props: BasicMessage) => {
  const {
    content,
    // dateTagList,
    createdAt,
  } = props;

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography variant={'subtitle1'} contentEditable={true}>
        {content}
      </Typography>
      <BulletTagList
        tagList={props.tagList} />
      <Typography variant={'body1'} color={'textSecondary'}>
        {regDateToString(createdAt)}
      </Typography>
    </Box>
  );
};

export default BasicMessageItem;