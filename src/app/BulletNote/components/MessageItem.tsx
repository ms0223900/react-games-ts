import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { BasicMessage } from 'bullet-note';

const BasicMessageItem = (props: BasicMessage) => {
  const {
    content,
    // dateTagList,
    createdAt,
  } = props;
  
  return (
    <Box display={'flex'}>
      <Typography variant={'subtitle1'}>
        {content}
      </Typography>
      <Typography variant={'body1'}>
        {createdAt}
      </Typography>
    </Box>
  );
};

export default BasicMessageItem;