import React from 'react';
import { Box, Typography, Paper } from '@material-ui/core';
import { getAnotherDay, getDateString } from 'lib/fn';
import MealItem from 'app/common-components/mealItem';


type AddedMealPartProps = {
  meals: import('common-types').SingleMeal[]
}
const AddedMealPart = ({ meals }: AddedMealPartProps) => {
  return (
    <Paper>
      <Typography>{'您選擇的餐點'}</Typography>
      <Box>
        {meals.map((meal, i) => (
          <MealItem {...meal} />
        ))}
      </Box>
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


type BonusAreaProps = {
  peopleRequired: number
  gottenBonus: number
}
const BonusArea = ({ peopleRequired, gottenBonus }: BonusAreaProps) => {
  return (
    <Box>
      <Box>
        <Typography>{'購物金門檻'}</Typography>
        <Typography>
          {`${peopleRequired}人`}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {`達到後 前${peopleRequired}人每人可獲得: ${gottenBonus}`}
        </Typography>
      </Box>
    </Box>
  );
};


type SelectedDetailsPartProps = GrouponTitleProps & GrouponDateProps & BonusAreaProps
const SelectedDetailsPart = (props: SelectedDetailsPartProps) => {
  return (
    <Paper>
      <GrouponTitle {...props} />
      <GrouponDate {...props} />
      <BonusArea {...props} />
    </Paper>
  );
};


type CreateGrouponCreateListProps = SelectedDetailsPartProps & AddedMealPartProps
const CreateGrouponCreateList = (props: CreateGrouponCreateListProps) => {
  return (
    <Box>
      <Typography>{'您發起的飯團詳情'}</Typography>
      <AddedMealPart {...props} />
      <SelectedDetailsPart {...props} />
    </Box>
  );
};

export default CreateGrouponCreateList;