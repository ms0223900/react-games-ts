import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { red, green, blue, deepPurple, grey } from '@material-ui/core/colors';
import { SingleAnkaElement } from 'anka-types';
type ankaElementTypesString = import('./config').ankaElementTypesString

const elWidth = 32;

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: elWidth,
    height: elWidth,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 4,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: `${elWidth}px`,
  },
  floor: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #333',
  }
});

const getColor = (number: number) => {
  if(number === 0) return red[400];
  if(number === 1) return green[400];
  if(number === 2) return blue[400];
  if(number === 3) return deepPurple[400];
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
  case 'floor':
    return (
      <Box className={`${classes.root} ${classes.floor}`}>
        {`${number}F`}
      </Box>
    );
  default:
    return (
      <Box></Box>
    );
  }
};

export default SingleAnkaElementItem;