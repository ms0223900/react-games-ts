import React from 'react';
import { Box, ListItem, ListItemText } from '@material-ui/core';
import { OtherDayKabuItemProps } from './types';
import InputItemContainer from '../containers/InputItemContainer';

const OtherDayKabuItem = (props: OtherDayKabuItemProps) => {
  const {
    dayAndTime,
    dayTimePrices,
  } = props;

  return (
    <ListItem divider={true}>
      <ListItemText>
        {props.dayAndTime.day}
      </ListItemText>
      <InputItemContainer
        id={`${dayAndTime.day}-${'morning'}`}
        day={dayAndTime.day}
        dayTime={'morning'}
        value={String(dayTimePrices.morning)}
        onChange={props.onChange} />
      <InputItemContainer
        id={`${dayAndTime.day}-${'afternoon'}`}
        day={dayAndTime.day}
        dayTime={'afternoon'}
        value={String(dayTimePrices.afternoon)}
        onChange={props.onChange} />
    </ListItem>
  );
};

export default OtherDayKabuItem;