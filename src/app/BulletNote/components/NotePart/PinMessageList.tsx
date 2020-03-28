import React from 'react';
import { Box, Typography, Divider, Paper } from '@material-ui/core';
import { MessageList } from 'app/BulletNote/types';
import { PinMessageListProps } from '../types';
import switchMessagesByType from 'app/BulletNote/functions/switchMessagesByType';

export const filterPinedMessageList = (messageList: MessageList) => {
  return messageList.filter(m => m.message.isPin);
};

const PinMessageList = (props: PinMessageListProps) => {
  const filteredPinMessageList = filterPinedMessageList(props.messageList);

  return (
    <Paper elevation={2}>
      <Typography>
        {'Pin Messages'}
      </Typography>
      {filteredPinMessageList.map((m, index) => (
        switchMessagesByType({
          index,
          messageItemProps: m
        })
      ))}
      <Divider />
    </Paper>
  );
};

export default PinMessageList;