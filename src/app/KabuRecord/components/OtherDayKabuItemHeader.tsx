import React from 'react';
import { Box, ListItem, ListItemText } from '@material-ui/core';

const OtherDayKabuItemHeader = () => {
  return (
    <ListItem>
      <ListItemText>
        {'日期'}
      </ListItemText>
      <ListItemText>
        {'上午(8:00~11:59)'}
      </ListItemText>
      <ListItemText>
        {'上午(12:00~22:00)'}
      </ListItemText>
    </ListItem>
  );
};

export default OtherDayKabuItemHeader;