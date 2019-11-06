/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Divider, makeStyles, Typography, Button } from '@material-ui/core';
import Reply from './Reply';
import { ID, SingleMessage, SingleAnkaElement, ankaElementTypesString, SingleMessageData, SinglePostData, SinglePost } from 'anka-types';
import { user01_mockData, replies_mockData } from 'app/AnKa/storage/mockData';
import { scrollToBottom } from 'lib/fn';
import { UserInfo } from 'anka-types';
import { checkIsAnkaElementMatched, getParseMessagesFromQuery } from '../fn';
import { ankaElementTypes, socket } from '../config';
import AnkaTextAreaContainer from '../containers/AnkaTextAreaContainer';
import SingleAnkaElementItem from './AnkaElement';
import { KeyboardArrowDown } from '@material-ui/icons';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_MESSAGES } from '../constants/API';
import getLoadingAndError from './LoadingAndError';


const getLatestAnkaHost = (messages: SingleMessage[], ankaHostUserId?: ID): SingleMessage | undefined => {
  // console.log(messages, ankaHostUserId);
  const hostMessages = messages.filter(mes => {
    return Number(mes.userId) === Number(ankaHostUserId) && 
      mes.ankaElements.length > 0;
  });
  return hostMessages[hostMessages.length - 1];
};
const getLatestAnkaHostElementsTypes = (messages: SingleMessage[], ankaHostUserId?: ID) => {
  const latestHostMessages = getLatestAnkaHost(messages, ankaHostUserId);
  return latestHostMessages ? latestHostMessages.ankaElements : [];
};






const useStyles = makeStyles({
  mesContainer: {
    // position: 'relative',
    backgroundColor: '#eee',
    padding: 8,
    height: 400,
    overflowY: 'scroll',
  },
  arrowDown: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  }
});

export const Header = ({
  ankaHostUserId,
  latestAnkaHostEls,
}: {
  ankaHostUserId?: ID
  latestAnkaHostEls: SingleAnkaElement[]
}) => {
  return (
    <>
      <Typography variant={'h4'}>
        {`Anka Host Id: ${ankaHostUserId}`}
      </Typography>
      <Box display={'flex'}>
        <Typography>
          {'latest anka host elements: '}
        </Typography>
        {latestAnkaHostEls.map((el, i) => (
          <SingleAnkaElementItem key={i} {...el} />
        ))}
      </Box>
    </>
  );
};



export type HostUsedAnkaElements = {
  type: ankaElementTypesString
}[]
export const initHostUsedAnkaElements: HostUsedAnkaElements = Object.keys(ankaElementTypes).map(t => ({
  type: t as ankaElementTypesString,
}));


export type AnkaPageProps = {
  userInfo?: UserInfo
  postId?: ID
  ankaHostUserId: ID
  queriedParsedMessages?: SingleMessage[]
  queriedParsedPost?: SinglePost
}
const AnkaPage = (props: AnkaPageProps) => {
  const {
    userInfo=user01_mockData, 
    postId='1',
    // ankaHostUserId, 
    queriedParsedMessages=[],
    queriedParsedPost, 
  } = props;
  const classes = useStyles();
  const ankaHostUserId = queriedParsedPost ? queriedParsedPost.userId : undefined;
  const isAnkaHostInThisAnka = ankaHostUserId === userInfo.id;
  const replyRef = useRef<HTMLElement | null>();
  const setReplyRef = (el: HTMLElement | null) => {
    replyRef.current = el;
  };

  const [latestAnkaHostEls, setLatestEls] = useState<SingleAnkaElement[]>([]);
  const [ankaMatchedIds, setAnkaMatchedIds] = useState<ID[]>([]);
  const [messages, setMessages] = useState(queriedParsedMessages);

  const handleDownToBottom = () => {
    if(replyRef) {
      // console.log(replyRef.current);
      const el = replyRef.current;
      scrollToBottom(el);
    }
  };
  useEffect(() => {
    socket.emit('join', postId);
    socket.on('get_chat', (message: SingleMessage) => {
      console.log(message, 'socket get chat');
      setMessages(mes => [
        ...mes,
        message
      ]);
    });
  }, [postId]);
  useEffect(() => {
    //scroll to bottom
    handleDownToBottom();
    //check is anka reply now is fulfilled
    let latestAnkaHostElsNow = latestAnkaHostEls;
    for (let i = 0; i < messages.length; i++) {
      const mes = messages[i];
      const checkedLatestAnkaHostEls = getLatestAnkaHostElementsTypes(messages, ankaHostUserId);
      if(checkedLatestAnkaHostEls.length > 0) {
        latestAnkaHostElsNow = checkedLatestAnkaHostEls;
        setLatestEls(latestAnkaHostElsNow);
      }
      const checkResult = checkIsAnkaElementMatched(latestAnkaHostElsNow, mes);
      checkResult.matched && setAnkaMatchedIds(ids => [
        ...ids,
        checkResult.id
      ]);
    }
  }, [ankaHostUserId, latestAnkaHostEls, messages]);


  return (
    <Container>
      <Header 
        {...props}
        ankaHostUserId={ankaHostUserId} 
        latestAnkaHostEls={latestAnkaHostEls} />
      <Typography>{'postId: ' + postId}</Typography>
      <Box position={'relative'}>
        
        <Box className={classes.mesContainer}>
          {/* just mock */}
          {queriedParsedPost && (
            <Reply 
              key={-1} 
              index={-1} 
              {...queriedParsedPost} 
              isAnkaHost={true} />
          )}
          <Divider />
          <div ref={setReplyRef}>
            {messages.map((mes, i) => {
              const isAnkaHost = ankaHostUserId === mes.userId;
              const isAnkaed = !!ankaMatchedIds.find(id => id === mes.id);
              return (
                <Reply 
                  key={i}
                  index={i}
                  {...mes}
                  isAnkaed={!isAnkaHost && isAnkaed} 
                  isAnkaHost={isAnkaHost} />
              );
            })}
          </div>
        </Box>
        <Button onClick={handleDownToBottom} className={classes.arrowDown}>
          <KeyboardArrowDown />
        </Button>
      </Box>
      <Divider />
      <AnkaTextAreaContainer 
        {...props}
        postId={postId}
        isAnkaHost={isAnkaHostInThisAnka}
        messages={messages}
        setMessagesFn={setMessages}
      />
    </Container>
  );
};


export const getParsedDataFromQuery = (data: any) => {
  const messagesData = data.ankamessages as SingleMessageData[];
  const postData = data.ankaposts[0] as SinglePostData;
  console.log(data);
  const queriedParsedMessages = messagesData.map(data => getParseMessagesFromQuery(data));
  const queriedParsedPost = getParseMessagesFromQuery(postData);
  return {
    queriedParsedMessages,
    queriedParsedPost
  };
};
const queryVariables = (postId?: ID) => ({
  variables: {
    whichPost: {
      postId
    },
    whichPostInPost: {
      id: postId
    }
  }
});
export const AnkaPageWithQuery = (props: AnkaPageProps) => {
  const { postId } = props;
  const {data, loading, error} = useQuery(QUERY_MESSAGES, queryVariables(postId));
  if(data) {
    const parsedDatas = getParsedDataFromQuery(data);
    return (
      <AnkaPage 
        {...props}
        {...parsedDatas}
      />
    );
  } else {
    return getLoadingAndError(loading, error);
  }
};

export const AnkaPageWithRouter = (props: AnkaPageProps) => {
  const { id: postId } = useParams();
  return (
    <AnkaPageWithQuery {...props} postId={postId} />
  );
};

export default AnkaPage;