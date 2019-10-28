import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { SinglePost } from 'anka-types';
import { ContentHeader } from './Reply';
import { makeStyles } from '@material-ui/styles';
import { basicHoverEffectStyle } from 'app/AnKa/styles/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    ...basicHoverEffectStyle('#eee'),
    padding: 8,
  }
});

const SinglePostItem = (props: SinglePost) => {
  const classes = useStyles();
  return (
    <Box>
      <Paper elevation={6} className={classes.root}>
        <ContentHeader {...props} />
        <Box>
          <Typography variant={'body1'} style={{fontSize: 18,}}>{props.title}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SinglePostItem;