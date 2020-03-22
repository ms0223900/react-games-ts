import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { MessageItemWrapperProps } from '../types';
import BasicMessageItem from '../BasicMessageItem';


const useStyles = makeStyles(theme => ({
  root: {
    // cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#eee',
    }
  }
}));


const MessageItemWrapper = (props: MessageItemWrapperProps) => {
  const classes = useStyles();
  return (
    <Box
      display={'flex'} 
      alignItems={'center'} 
      className={classes.root}
    >
      {props.children}
      <BasicMessageItem
        {...props} />
    </Box>
  );
};

export default MessageItemWrapper;  