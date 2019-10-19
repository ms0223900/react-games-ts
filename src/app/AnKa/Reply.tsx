import React from 'react';
import { Box, Typography, Paper, makeStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { getDateAndTime } from 'lib/fn';
import { SingleMessage } from 'anka-types';
import SingleAnkaElementItem from './AnkaElement';

const useStyles = makeStyles<any, MessageProps>({
  root: {
    paddingLeft: props => props.isAnkaHost ? 0 : 32,
    padding: 8,
    borderRadius: 8,
    borderColor: '#aaa',
    borderStyle: 'dashed',
    borderWidth: props => props.isAnkaed ? '3px': '0px',
  },
  replyContainer: {
    minWidth: 600,
  },
  userImg: {
    width: 16,
    height: 16,
    marginRight: 8,
    // backgroundColor: '#ddd',
    // borderRadius: '50%'
  },
  contentPart: {
    width: '100%',
    whiteSpace: 'pre-wrap',
    padding: 8,
    backgroundColor: props => props.isAnkaHost ? '#555' : '#fff',
    color: props => props.isAnkaHost ? '#fff' : '#111'
  }
});

export type MessageProps = {
  isAnkaHost?: boolean
  isAnkaed?: boolean
} & SingleMessage
const Reply = (props: MessageProps) => {
  const { 
    id, 
    username, 
    content, 
    created_at, 
    // isAnkaHost,
    // isAnkaed,
    ankaElement
  } = props;
  const classes = useStyles(props);
  return (
    <Box 
      className={classes.root} 
      display={'flex'} 
      alignItems={'center'}
    >
      <Typography >{`${id}F`}</Typography>
      <Box className={classes.replyContainer}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'center'}>
            <Box className={classes.userImg}>
              <AccountCircle />
            </Box>
            <Typography>{username}</Typography>
          </Box>
          <Typography>{getDateAndTime(created_at)}</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Paper className={classes.contentPart}>
            {content}
          </Paper>
          {ankaElement && (
            <SingleAnkaElementItem {...ankaElement}/>
          )}
        </Box>
        
      </Box>
      
    </Box>
  );
};

export default Reply;