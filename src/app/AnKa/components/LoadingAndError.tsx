import React from 'react';
import { Box, Typography } from '@material-ui/core';

const getLoadingAndError = (loading: any, error: any) => {
  if(loading) {
    return (
      <Typography>{'loading...'}</Typography>
    );
  }
  if(error) {
    return (
      <Typography>{`Error: ${error.message}`}</Typography>
    );
  }
  return (
    <Typography>{'something unknown get wrong :('}</Typography>
  );
};

export default getLoadingAndError;