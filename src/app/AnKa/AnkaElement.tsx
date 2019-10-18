import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { red, green, blue, grey } from '@material-ui/core/colors';
import { SingleAnkaElement } from 'anka-types';

const elWidth = 32;

const useStyles = makeStyles({
  root: {
    width: elWidth,
    height: elWidth,
    borderRadius: 4,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: `${elWidth}px`,
  }
});

const getColor = (number: number) => {
  if(number === 0) return red[400];
  if(number === 1) return green[400];
  if(number === 2) return blue[400];
  return grey[400];
};

export type SingleAnkaElementProps = SingleAnkaElement
const SingleAnkaElementItem = ({ type, number}: SingleAnkaElementProps) => {
  const classes = useStyles();
  switch (type) {
  case 'dice':
    return (
      <Box className={classes.root}>{number}</Box>
    );
  case 'color':
    return (
      <Box className={classes.root} style={{ backgroundColor: getColor(number) }}></Box>
    );
  default:
    return (
      <Box></Box>
    );
  }
};

export default SingleAnkaElementItem;