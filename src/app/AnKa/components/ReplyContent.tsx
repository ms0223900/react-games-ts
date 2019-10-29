import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { ParsedMessage_message, ParsedMessage_element } from 'anka-types';
import SingleAnkaElementItem from './AnkaElement';


const useStyles = makeStyles({
  root: {
    verticalAlign: 'top'
  }
});

type ReplyContentProps = {
  parsedMessages: (ParsedMessage_element|ParsedMessage_message)[]
}
const ReplyContent = ({ parsedMessages }: ReplyContentProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {parsedMessages.map((mes, i) => {
        return (
          mes.mesType === 'message' ? (
            mes.message
          ) : (
            <SingleAnkaElementItem key={i} {...mes} />
          )
        );
      })}
    </Box>
  );
};

export default ReplyContent;