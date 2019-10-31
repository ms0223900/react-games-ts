import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { getDateAndTime } from 'lib/fn';
import { SingleMessage } from 'anka-types';
import SingleAnkaElementItem from './AnkaElement';
import { ParsedSingleLineContent } from '../fn';
import ReplyContent from './ReplyContent';

const useStyles = makeStyles<any, MessageProps>({
  wrapper: {
    padding: 8,
    paddingLeft: props => props.isAnkaHost ? 0 : 32,
  },
  root: {
    paddingLeft: 4,
    boxSizing: 'border-box',
    borderColor: '#00a',
    borderStyle: 'solid',
    borderEndEndRadius: 24,
    borderWidth: props => props.isAnkaed ? '0px 0px 0px 4px': '0px',
  },
  replyContainer: {
    // width: 500,
  },
  contentPart: {
    width: 500,
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


const useStyles_header = makeStyles({
  root: {
    color: '#888',
    paddingBottom: 4,
    borderBottom: '1px solid #ddd',
    // '&:hover': {
    //   color: '#111'
    // }
  },
  userImg: {
    width: 16,
    height: 16,
    marginRight: 8,
    // backgroundColor: '#ddd',
    // borderRadius: '50%'
  },
});

type ContentHeaderProps = {
  username: SingleMessage['username']
  created_at: SingleMessage['created_at']
}
export const ContentHeader = (props: ContentHeaderProps) => {
  const classes = useStyles_header();
  const {
    username,
    created_at,
  } = props;
  return (
    <Box
      className={classes.root} 
      display={'flex'} 
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box display={'flex'} alignItems={'center'}>
        {/* <Box className={classes.userImg}>
          <AccountCircle />
        </Box> */}
        <Typography>{username}</Typography>
      </Box>
      <Typography>{getDateAndTime(created_at)}</Typography>
    </Box>
  );
};

export const getContents = (parsedContentLists: ParsedSingleLineContent[]) => {
  return (
    <>
      {parsedContentLists.map((content, i) => {
        return (
          <>
            <ReplyContent key={i} parsedMessages={content} />
            {/* <br /> */}
          </>
        );
      })}
    </>
  );
};


export type MessageProps = SingleMessage & {
  isAnkaHost?: boolean
  isAnkaed?: boolean
}
const Reply = (props: MessageProps) => {
  const { 
    id, 
    content, 
    // isAnkaHost,
    // isAnkaed,
    ankaElements
  } = props;
  const classes = useStyles(props);
  return (
    <Box className={classes.wrapper}>
      <Box 
        className={classes.root} 
        display={'flex'} 
        alignItems={'center'}
      >
        <Box className={classes.replyContainer}>
          <Box display={'flex'} alignItems={'center'}>
            <Box className={classes.contentPart}>
              <ContentHeader {...props}/>
              {getContents(content)}
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <Typography style={{padding: 4}}>
                {`${id}F`}
              </Typography>
              {ankaElements.map((el, i) => (
                <SingleAnkaElementItem key={i} {...el}/>
              ))}
              
            </Box>
          </Box>
          
        </Box>
      </Box>
    </Box>
  );
};

export default Reply;