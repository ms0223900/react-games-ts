/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Divider, makeStyles, Typography, Button } from '@material-ui/core';
import Reply from './Reply';
import { ID, SingleMessage, SingleAnkaElement, ankaElementTypesString, SingleMessageData } from 'anka-types';
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


const getLatestAnkaHost = (messages: SingleMessage[], ankaHostId: ID): SingleMessage | undefined => {
  const hostMessages = messages.filter(mes => {
    return mes.userId === ankaHostId && mes.ankaElements.length > 0;
  });
  return hostMessages[hostMessages.length - 1];
};
const getLatestAnkaHostElementsTypes = (messages: SingleMessage[], ankaHostId: ID) => {
  const latestHostMessages = getLatestAnkaHost(messages, ankaHostId);
  if(latestHostMessages) {
    const { ankaElements } = latestHostMessages;
    return ankaElements;
  }
  return [];
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
  ankaHostId,
  latestAnkaHostEls,
}: {
  ankaHostId: ID
  latestAnkaHostEls: SingleAnkaElement[]
}) => {
  return (
    <>
      <Typography variant={'h4'}>
        {`Anka Host Id: ${ankaHostId}`}
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
  ankaHostId: ID
  queriedParsedMessages?: SingleMessage[]
}
const AnkaPage = (props: AnkaPageProps) => {
  const {
    userInfo=user01_mockData, 
    postId='1',
    ankaHostId, 
    queriedParsedMessages=[] 
  } = props;
  const classes = useStyles();
  const isAnkaHostInThisAnka = ankaHostId === userInfo.id;
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
    for (let i = 0; i < messages.length; i++) {
      const mes = messages[i];
      // if(checkIsAnkaed(messages, i)) 
      //   return setFulfilled(true);
      let latestAnkaHostElsNow = latestAnkaHostEls;
      const checkedLatestAnkaHostEls = getLatestAnkaHostElementsTypes(messages, ankaHostId);
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
  }, [ankaHostId, latestAnkaHostEls, messages]);


  return (
    <Container>
      <Header {...props} latestAnkaHostEls={latestAnkaHostEls} />
      <Typography>{'postId: ' + postId}</Typography>
      <Box position={'relative'}>
        
        <Box className={classes.mesContainer}>
          {/* just mock */}
          {/* {postId && (
            <Reply {...replies_mockData[Number(postId) - 1]} isAnkaHost={true} />
          )} */}
          <Divider />
          <div ref={setReplyRef}>
            {messages.map((mes, i) => {
              const isAnkaHost = ankaHostId === mes.userId;
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
        isAnkaHost={isAnkaHostInThisAnka}
        messages={messages}
        setMessagesFn={setMessages}
      />
    </Container>
  );
};


export const AnkaPageWithQuery = (props: AnkaPageProps) => {
  const { postId } = props;
  let parsedMessages;
  const {data, loading, error} = useQuery(QUERY_MESSAGES, {
    variables: {
      whichPost: {
        postId
      },
      whichPostInPost: {
        id: postId
      }
    }
  });
  if(loading) {
    return (
      <Typography>{'loading...'}</Typography>
    );
  }
  if(data) {
    const messagesData = data.ankamessages as SingleMessageData[];
    console.log(data);
    parsedMessages = messagesData.map(data => getParseMessagesFromQuery(data));
  }
  return (
    <AnkaPage 
      {...props} 
      queriedParsedMessages={parsedMessages} />
  );
};

export const AnkaPageWithRouter = (props: AnkaPageProps) => {
  const { id: postId } = useParams();
  return (
    <AnkaPageWithQuery {...props} postId={postId} />
  );
};

export default AnkaPage;