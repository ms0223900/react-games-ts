import React, { useState, useCallback, ChangeEvent, useRef, useEffect } from 'react';
import { Box, Container, Divider, makeStyles, RootRef, Typography } from '@material-ui/core';
import Reply from './Reply';
import { ID, SingleMessage, SingleAnkaElement } from 'anka-types';
import AnkaTextArea from './AnkaTextArea';
import { user01_mockData } from 'app/AnKa/storage/mockData';
import { scrollToBottom } from 'lib/fn';

const getSingleAnkaEl = () => {
  const number = ~~(Math.random() * 4);
  const type = 'dice';
  return ({
    type,
    number
  });
};

const checkIsAnkaed = (messages: SingleMessage[], messageIndex: number, hostIndexNow=0) => {
  const hostMes = messages[hostIndexNow];
  const comparedMes = messages[messageIndex];
  if(
    messages.length > 0 &&
    comparedMes &&
    hostMes.ankaElement &&
    comparedMes.ankaElement &&
    hostMes.ankaElement.type === comparedMes.ankaElement.type &&
    hostMes.ankaElement.number === comparedMes.ankaElement.number
  ) return true;
  return false;
};


const useStyles = makeStyles({
  mesContainer: {
    backgroundColor: '#eee',
    padding: 16,
    height: 600,
    overflowY: 'scroll',
  }
});

type AnkaPageProps = {
  ankaHostId: ID
  queriedMessages?: SingleMessage[]
}
const AnkaPage = ({ ankaHostId, queriedMessages=[] }: AnkaPageProps) => {
  const replyRef = useRef<HTMLElement | null>();
  const classes = useStyles();
  const [ankaIsFulfilled, setFulfilled] = useState(false);
  const [messages, setMessages] = useState(queriedMessages);
  const [replyUseAnka, setUseAnka] = useState(false);
  const [textAreaValue, setValue] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  const handleSendReply = useCallback(() => {
    const randAnkaElement = getSingleAnkaEl();
    const newMessage: SingleMessage = {
      id: messages.length + 1,
      userId: user01_mockData.id,
      username: user01_mockData.username,
      content: textAreaValue,
      created_at: new Date(),
      ankaElement: replyUseAnka ? randAnkaElement : undefined,
    };
    setMessages(mes => [
      ...mes,
      newMessage,
    ]);
    setValue('');
  }, [messages.length, replyUseAnka, textAreaValue]);
  const handleSetUseAnka = () => {
    setUseAnka(a => !a);
  };

  const setReplyRef = (el: HTMLElement | null) => {
    replyRef.current = el;
  };

  useEffect(() => {
    //scroll to bottom
    if(replyRef && messages.length > 0) {
      console.log(replyRef.current);
      const el = replyRef.current;
      scrollToBottom(el);
    }
    //check is anka reply now is fulfilled
    for (let i = 0; i < messages.length; i++) {
      if(checkIsAnkaed(messages, i)) 
        return setFulfilled(true);
    }
  }, [messages]);

  // const isAnkaHost = ankaHostId === mes.userId;
  return (
    <Container>
      {ankaIsFulfilled && (
        <Typography variant={'h3'}>
          {'anka reply is fulfilled now :)'}
        </Typography>
      )}
      {/* <RootRef rootRef={setReplyRef}> */}
      <Box className={classes.mesContainer}>
        <div ref={setReplyRef}>
          {messages.map((mes, i) => {
            const isAnkaed = checkIsAnkaed(messages, i);
            return (
              <Reply 
                key={i}
                {...mes}
                isAnkaed={isAnkaed} 
                isAnkaHost={ankaHostId === mes.userId} />
            );
          })}
        </div>
      </Box>
      {/* </RootRef> */}
      <Divider />
      <AnkaTextArea 
        isUseAnka={replyUseAnka}
        setUseAnkaFn={handleSetUseAnka}
        inputTextAreaFn={handleInput}
        textAreaValue={textAreaValue}
        sendFn={handleSendReply}
      />
    </Container>
  );
};

export default AnkaPage;