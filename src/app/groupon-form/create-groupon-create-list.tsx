import React from 'react';
import { Box, Typography, Paper } from '@material-ui/core';
import { getAnotherDay, getDateString } from 'lib/fn';

const AddedMealPart = () => {
  return (
    <Paper>
      
    </Paper>
  );
};

type GrouponTitleProps = {
  title: string
  tag: string
}
const GrouponTitle = ({ title, tag }: GrouponTitleProps) => {
  return (
    <Box>
      <Box component={'span'}>{'飯團名稱: '}</Box>
      <Typography>{title}</Typography>
      <Box component={'span'}>{'#' + tag}</Box>
    </Box>
  );
};


type GrouponDateProps = {
  startDate: Date
  dayAmount: number
}
const GrouponDate = ({ startDate, dayAmount }: GrouponDateProps) => {
  const endDate = getAnotherDay(startDate, dayAmount);
  return (
    <Box>
      <Typography>
        {`${getDateString(startDate)} - ${getDateString(endDate)}`}
      </Typography>
      <Typography>{`共: ${dayAmount}天`}</Typography>
    </Box>
  );
};
const SelectedDetailsPart = () => {
  return (
    <Paper>

    </Paper>
  );
};


const HomePage = () => {
  return (
    <Box>
      <Typography>{'您發起的飯團詳情'}</Typography>

    </Box>
  );
};

export default HomePage;