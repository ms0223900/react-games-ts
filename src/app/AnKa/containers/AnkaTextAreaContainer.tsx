import React, { useState, ChangeEvent, useCallback } from 'react';
import { Box } from '@material-ui/core';
import { ankaElementTypesString, SingleMessage, ID, SingleAnkaElement } from 'anka-types';
import { ankaElementTypes } from '../config';
import AnkaTextArea from '../AnkaTextArea';
import { getRandomSingleAnkaEl } from '../fn';
import { AnkaPageProps } from '../AnkaPage';
import { user01_mockData } from '../storage/mockData';

export type HostUsedAnkaElements = {
  type: ankaElementTypesString
  checked: boolean
}[]

export const initHostUsedAnkaElements: HostUsedAnkaElements = Object.keys(ankaElementTypes).map(t => ({
  type: t as ankaElementTypesString,
  checked: false,
}));
export const getLatestAnkaHost = (messages: SingleMessage[], ankaHostId: ID): SingleMessage | undefined => {
  const hostMessages = messages.filter(mes => {
    return mes.userId === ankaHostId && mes.ankaElements.length > 0;
  });
  return hostMessages[hostMessages.length - 1];
};
export const getLatestAnkaHostElementsTypes = (messages: SingleMessage[], ankaHostId: ID) => {
  const latestHostMessages = getLatestAnkaHost(messages, ankaHostId);
  if(latestHostMessages) {
    const { ankaElements } = latestHostMessages;
    return ankaElements.map(el => el.type);
  }
  return [];
};
export const getAnkaHostElementsOfReply = (hostUsedAnkaElements: typeof initHostUsedAnkaElements, newId: number) => {
  const usedAnkaElements = hostUsedAnkaElements.filter(el => el.checked);
  return usedAnkaElements.map(el => getRandomSingleAnkaEl(el.type, newId));
};
export const getAnkaElementsOfReply = (messages: SingleMessage[], ankaHostId: ID, replyUseAnka: boolean) => {
  const latestAnkaHostElementsTypes = getLatestAnkaHostElementsTypes(messages, ankaHostId);
  const randAnkaElements = latestAnkaHostElementsTypes.map(type => getRandomSingleAnkaEl(type));
  return (replyUseAnka) ? randAnkaElements : [];
};


type AnkaTextAreaContainerProps = AnkaPageProps & {
  isAnkaHost: boolean
  messages: SingleMessage[]
  ankaHostId: ID
  sendFn: (x: any) => any
}
const AnkaTextAreaContainer = (props: AnkaTextAreaContainerProps) => {
  const {
    userInfo=user01_mockData,
    isAnkaHost,
    messages,
    ankaHostId,
    sendFn
  } = props;
  const [hostUsedAnkaElements, setHostUsedAnkaElements] = useState(initHostUsedAnkaElements);
  const [replyUseAnka, setUseAnka] = useState(false);
  const [textAreaValue, setValue] = useState('');

  const handleSetUseAnka = () => {
    setUseAnka(a => !a);
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  const handleSetAnkaHostUseAnkaElements = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newEls = [...hostUsedAnkaElements];
    // const { value } = e.target;
    newEls[index].checked = !newEls[index].checked;
    setHostUsedAnkaElements(newEls);
  };
  const handleSendReply = useCallback(() => {
    const newId = messages.length + 1;
    let ankaElements: SingleAnkaElement[];
    if(isAnkaHost) {
      ankaElements = getAnkaHostElementsOfReply(hostUsedAnkaElements, newId);
    } else {
      ankaElements = getAnkaElementsOfReply(messages, ankaHostId, replyUseAnka);
    }
    const newestMessage = {
      id: newId,
      userId: userInfo.id,
      username: userInfo.username,
      content: textAreaValue,
      created_at: new Date(),
      ankaElements,
    };
    sendFn(newestMessage);
  }, [ankaHostId, hostUsedAnkaElements, isAnkaHost, messages, replyUseAnka, sendFn, textAreaValue, userInfo.id, userInfo.username]);

  return (
    <AnkaTextArea
      {...props}
      hostUsedAnkaElements={hostUsedAnkaElements}
      setAnkaHostUseAnkaFn={handleSetAnkaHostUseAnkaElements}
      isUseAnka={replyUseAnka}
      setUseAnkaFn={handleSetUseAnka}
      textAreaValue={textAreaValue} 
      inputTextAreaFn={handleInput}
      sendFn={handleSendReply} />
  );
};

export default AnkaTextAreaContainer;