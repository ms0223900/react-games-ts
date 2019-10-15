import React from 'react';
import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import { mealItemWidth } from 'config';


const useStyles = makeStyles<any, MealItemProps>({
  root: {
    position: 'relative',
    width: mealItemWidth,
    height: mealItemWidth,
    margin: 6,
    overflow: 'hidden',
    userSelect: 'none',
    '& :hover': {
      cursor: 'pointer',
    }
  },
  img: {
    width: mealItemWidth,
    height: mealItemWidth,
    backgroundImage: props => `url(${props.imgSrc})`,
    backgroundSize: 'cover',
  },
  infoPart: {
    position: 'absolute',
    bottom: 0,
    width: mealItemWidth,
    backgroundColor: '#fff',
  }
});

type MealItemProps = import('common-types').SingleMeal & {
  clickFn?: (x: any) => any
}
const MealItem = (props: MealItemProps) => {
  const { name, imgSrc, price, clickFn } = props;
  const classes = useStyles(props);
  return (
    <Paper className={classes.root} onClick={clickFn}>
      <Box className={classes.img}>
        <Box className={classes.infoPart}>
          <Typography>{name}</Typography>
          <Box component={'span'}>{`$${price}`}</Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default MealItem;