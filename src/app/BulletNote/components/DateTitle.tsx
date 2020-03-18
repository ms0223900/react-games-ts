import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { DateTitleProps } from '../types';

const DateTitle = (props: DateTitleProps) => {
  const dateTitle = (new Date(props.date)).toLocaleDateString();
  return (
    <Typography variant={'h5'}>
      {dateTitle}
    </Typography>
  );
};

export default DateTitle;