import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { KabuTrendTypePredictionProps } from './types';
import { kabuTrends } from '../config';

const KabuTrendTypePrediction = (props: KabuTrendTypePredictionProps) => {
  const trendsStr = props.kabuTrendTypes.map(
    trend => kabuTrends[trend]
  ).join(' / ');
  
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography>
        {'目前可能趨勢: '}
      </Typography>
      <Typography variant={'h6'}>
        {`${trendsStr}`}
      </Typography>
    </Box>
  );
};

export default KabuTrendTypePrediction;