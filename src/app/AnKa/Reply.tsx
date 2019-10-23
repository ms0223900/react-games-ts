import React from 'react';
import { Box, Typography, Paper, makeStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { getDateAndTime } from 'lib/fn';
import { SingleMessage } from 'anka-types';
import SingleAnkaElementItem from './AnkaElement';
import { splitSingleMessage, parsedSingleMessage } from './fn';
import ReplyContent from './ReplyContent';

const useStyles = makeStyles<any, MessageProps>({
  wrapper: {
    padding: 4,
    paddingLeft: props => props.isAnkaHost ? 0 : 32,
  },
  root: {
    padding: 4,
    boxSizing: 'border-box',
    borderColor: '#00a',
    borderStyle: 'solid',
    borderEndEndRadius: 24,
    borderWidth: props => props.isAnkaed ? '0px 0px 0px 4px': '0px',
  },
  replyContainer: {
    width: 600,
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
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: '1.25em',
    lineHeight: '1.5em',
    // backgroundColor: props => props.isAnkaHost ? '#555' : '#fff',
    // color: props => props.isAnkaHost ? '#fff' : '#111'
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
    ankaElements
  } = props;
  const classes = useStyles(props);
  const splitContent = content.split('\n');
  return (
    <Box className={classes.wrapper}>
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
            <Box className={classes.contentPart}>
              {splitContent.map((content, i) => {
                const splitContent = splitSingleMessage(content);
                const parsed = parsedSingleMessage(splitContent);
                return (
                  <>
                    <ReplyContent key={i} parsedMessages={parsed} />
                    {/* <br /> */}
                  </>
                );
              })}
            </Box>
            {ankaElements.map((el, i) => (
              <SingleAnkaElementItem key={i} {...el}/>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Reply;