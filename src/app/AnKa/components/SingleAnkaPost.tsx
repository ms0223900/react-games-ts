import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { SinglePost } from 'anka-types';
import { ContentHeader, getContents } from './Reply';
import { makeStyles } from '@material-ui/styles';
import { basicHoverEffectStyle } from 'app/AnKa/styles/styles';

const useStyles = makeStyles({
  wrapper: {
    padding: 8,
  },
  root: {
    maxWidth: 600,
    ...basicHoverEffectStyle('#eee'),
    padding: 8,
  },
  textPart: {
    display: '-webkit-box',
    paddingTop: 8,
    fontSize: 18,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  }
});

const SinglePostItem = (props: SinglePost) => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Paper elevation={6} className={classes.root}>
        <ContentHeader {...props} />
        <Box className={classes.textPart}>
          {getContents(props.content)}
        </Box>
      </Paper>
    </Box>
  );
};

export default SinglePostItem;