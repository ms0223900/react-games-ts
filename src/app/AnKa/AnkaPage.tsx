/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, ChangeEvent, useRef, useEffect } from 'react';
import { Box, Container, Divider, makeStyles, RootRef, Typography, Button } from '@material-ui/core';
import Reply from './Reply';
import { ID, SingleMessage, SingleAnkaElement, ankaElementTypesString } from 'anka-types';
import { user01_mockData } from 'app/AnKa/storage/mockData';
import { scrollToBottom } from 'lib/fn';
import { UserInfo } from 'anka-types';
import { getRandomSingleAnkaEl, checkIsAnkaed, checkIsAnkaElementMatched } from './fn';
import { ankaElementTypes, socket } from './config';
import AnkaTextAreaContainer from './containers/AnkaTextAreaContainer';
import SingleAnkaElementItem from './AnkaElement';
import { KeyboardArrowDown } from '@material-ui/icons';


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


export type HostUsedAnkaElements = {
  type: ankaElementTypesString
  checked: boolean
}[]
export const initHostUsedAnkaElements: HostUsedAnkaElements = Object.keys(ankaElementTypes).map(t => ({
  type: t as ankaElementTypesString,
  checked: false,
}));


export type AnkaPageProps = {
  userInfo?: UserInfo
  ankaPageId?: ID
  ankaHostId: ID
  queriedMessages?: SingleMessage[]
}
const AnkaPage = (props: AnkaPageProps) => {
  const {
    userInfo=user01_mockData, 
    ankaPageId='1',
    ankaHostId, 
    queriedMessages=[] 
  } = props;
  const classes = useStyles();
  const isAnkaHostInThisAnka = ankaHostId === userInfo.id;
  const replyRef = useRef<HTMLElement | null>();
  const setReplyRef = (el: HTMLElement | null) => {
    replyRef.current = el;
  };

  const [ankaIsFulfilled, setFulfilled] = useState(false);
  const [latestAnkaHostEls, setLatestEls] = useState<SingleAnkaElement[]>([]);
  const [ankaMatchedIds, setAnkaMatchedIds] = useState<ID[]>([]);
  const [messages, setMessages] = useState(queriedMessages);

  const handleDownToBottom = () => {
    if(replyRef) {
      // console.log(replyRef.current);
      const el = replyRef.current;
      scrollToBottom(el);
    }
  };
  useEffect(() => {
    socket.emit('join', ankaPageId);
    socket.on('get_chat', (message: SingleMessage) => {
      console.log(message, 'socket get chat');
      setMessages(mes => [
        ...mes,
        message
      ]);
    });
  }, [ankaPageId]);
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
      <Typography variant={'h4'}>
        {`Anka Host Id: ${ankaHostId}`}
      </Typography>
      {ankaIsFulfilled && (
        <Typography>
          {'anka reply is fulfilled now :)'}
        </Typography>
      )}
      <Box display={'flex'}>
        <Typography>
          {'latest anka host elements: '}
        </Typography>
        {latestAnkaHostEls.map((el, i) => (
          <SingleAnkaElementItem key={i} {...el} />
        ))}
      </Box>
      <Box position={'relative'}>
        <Box className={classes.mesContainer}>
          <div ref={setReplyRef}>
            {messages.map((mes, i) => {
              const isAnkaHost = ankaHostId === mes.userId;
              const isAnkaed = !!ankaMatchedIds.find(id => id === mes.id);
              return (
                <Reply 
                  key={i}
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

export default AnkaPage;