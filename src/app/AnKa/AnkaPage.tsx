/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, ChangeEvent, useRef, useEffect } from 'react';
import { Box, Container, Divider, makeStyles, RootRef, Typography } from '@material-ui/core';
import Reply from './Reply';
import { ID, SingleMessage, SingleAnkaElement, ankaElementTypesString } from 'anka-types';
import AnkaTextArea from './AnkaTextArea';
import { user01_mockData } from 'app/AnKa/storage/mockData';
import { scrollToBottom } from 'lib/fn';
import { UserInfo } from 'anka-types';
import { getRandomSingleAnkaEl } from './fn';
import { ankaElementTypes } from './config';

// const getSingleAnkaEl = () => {
//   const number = ~~(Math.random() * 4);
//   const type = 'dice';
//   return ({
//     type,
//     number
//   });
// };

const checkIsAnkaed = (messages: SingleMessage[], messageIndex: number, hostIndexNow=0) => {
  const hostMes = messages[hostIndexNow];
  const hostMesAnkaEls = hostMes.ankaElements;
  const comparedMes = messages[messageIndex];
  const comparedMesAnkaEls = comparedMes.ankaElements;
  const checkHaveMesAndElements = 
    messages.length > 0 &&
    comparedMes &&
    hostMes.ankaElements.length > 0 &&
    comparedMes.ankaElements.length > 0;
  const checkObjTypeAndNumberEquality = (obj1: SingleAnkaElement, obj2: SingleAnkaElement) => (
    obj1.type === obj2.type && obj1.number === obj2.number
  ); 
  const checkElementTypeAndNumberMatched = () => {
    let matchedRes = {
      id: comparedMes.id,
      mathed: false as boolean,
      matchedEls: [] as SingleAnkaElement[]
    };
    if(checkHaveMesAndElements) {
      for (let i = 0; i < comparedMesAnkaEls.length; i++) {
        const comparedEl = comparedMesAnkaEls[i];
        const checkRes = hostMesAnkaEls.find(hostEl => checkObjTypeAndNumberEquality(hostEl, comparedEl));
        if(checkRes) {
          matchedRes = {
            id: comparedMes.id,
            mathed: true,
            matchedEls: [
              ...matchedRes.matchedEls,
              comparedEl
            ]
          };
        }
      }
    }
    return matchedRes;
  };
  return checkElementTypeAndNumberMatched();
};

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
    return ankaElements.map(el => el.type);
  }
  return [];
};

const useStyles = makeStyles({
  mesContainer: {
    backgroundColor: '#eee',
    padding: 16,
    height: 400,
    overflowY: 'scroll',
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
  ankaHostId: ID
  queriedMessages?: SingleMessage[]
}
const AnkaPage = (props: AnkaPageProps) => {
  const {
    userInfo=user01_mockData, 
    ankaHostId, 
    queriedMessages=[] 
  } = props;
  const isAnkaHostInThisAnka = ankaHostId === userInfo.id;
  const replyRef = useRef<HTMLElement | null>();
  const classes = useStyles();

  const [ankaIsFulfilled, setFulfilled] = useState(false);
  const [messages, setMessages] = useState(queriedMessages);
  const [replyUseAnka, setUseAnka] = useState(false);
  const [hostUsedAnkaElements, setHostUsedAnkaElements] = useState(initHostUsedAnkaElements);
  const [textAreaValue, setValue] = useState('');
  const setReplyRef = (el: HTMLElement | null) => {
    replyRef.current = el;
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  const handleSendReply = useCallback(() => {
    const newId = messages.length + 1;
    const latestAnkaHostElementsTypes = getLatestAnkaHostElementsTypes(messages, ankaHostId);
    const randAnkaElements = latestAnkaHostElementsTypes.map(type => getRandomSingleAnkaEl(type));
    let ankaElements = (replyUseAnka) ? randAnkaElements : [];

    if(isAnkaHostInThisAnka) {
      const usedAnkaElements = hostUsedAnkaElements.filter(el => el.checked);
      ankaElements = usedAnkaElements
        .map(el => getRandomSingleAnkaEl(el.type, newId));
    }
    const newMessage: SingleMessage = {
      id: newId,
      userId: userInfo.id,
      username: userInfo.username,
      content: textAreaValue,
      created_at: new Date(),
      ankaElements,
    };
    setMessages(mes => [
      ...mes,
      newMessage,
    ]);
    setValue('');
  }, [ankaHostId, hostUsedAnkaElements, isAnkaHostInThisAnka, messages, replyUseAnka, textAreaValue, userInfo.id, userInfo.username]);
  const handleSetUseAnka = () => {
    setUseAnka(a => !a);
  };
  const handleSetAnkaHostUseAnkaElements = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newEls = [...hostUsedAnkaElements];
    // const { value } = e.target;
    newEls[index].checked = !newEls[index].checked;
    setHostUsedAnkaElements(newEls);
  };
  

  useEffect(() => {
    //scroll to bottom
    if(replyRef && messages.length > 0) {
      // console.log(replyRef.current);
      const el = replyRef.current;
      scrollToBottom(el);
    }
    //check is anka reply now is fulfilled
    for (let i = 0; i < messages.length; i++) {
      if(checkIsAnkaed(messages, i)) 
        return setFulfilled(true);
    }
  }, [messages]);

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
                isAnkaed={isAnkaed.mathed} 
                isAnkaHost={ankaHostId === mes.userId} />
            );
          })}
        </div>
      </Box>
      {/* </RootRef> */}
      <Divider />
      <AnkaTextArea 
        isAnkaHost={isAnkaHostInThisAnka}
        hostUsedAnkaElements={hostUsedAnkaElements}
        setAnkaHostUseAnkaFn={handleSetAnkaHostUseAnkaElements}
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