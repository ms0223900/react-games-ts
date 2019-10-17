import React from 'react';
import { Box, Typography, makeStyles, Divider } from '@material-ui/core';
import { createList_mockData } from 'storage/create-form-mocks';
import { GrouponDate } from './create-groupon-create-list';
import { peopleAndBonusText, totalPriceText } from 'config';
import MealItem from 'app/common-components/mealItem';
import { getPriceFromMeals } from 'lib/fn';
import { UserInfo } from 'common-types';

const discountRatio = 0.8;
const useStyles = makeStyles({
  root: {
    maxHeight: 400,
    overflowY: 'scroll'
  }
});


type GrouponResultContentProps = typeof createList_mockData
const GrouponResultContent = (props: GrouponResultContentProps & UserInfo) => {
  const {
    username,
    title,
    tag,
    peopleRequired,
    gottenBonus,
    meals,
  } = props;
  const classes = useStyles();
  const mealTotalPrice = getPriceFromMeals(meals, discountRatio);
  return (
    <Box className={classes.root}>
      <Typography>
        {`user: ${username}`}
      </Typography>
      <Divider />
      <Typography variant={'h3'}>{title}</Typography>
      <Typography variant={'body1'}>{`# ${tag}`}</Typography>
      <Divider />
      <GrouponDate {...props}/>
      <Typography variant={'h4'}>
        {peopleAndBonusText(peopleRequired, gottenBonus)}
      </Typography>
      <Divider />
      <Box>
        {meals.map((m, i) => (
          <MealItem key={i} {...m} />
        ))}
      </Box>
      <Divider />
      <Typography variant={'h4'}>
        {totalPriceText(mealTotalPrice, discountRatio)}
      </Typography>
    </Box>
  );
};

export default GrouponResultContent;