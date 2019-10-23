import React, { useState, ChangeEvent, useCallback } from 'react';
import { Box } from '@material-ui/core';
import { ankaElementTypesString, SingleMessage, ID, SingleAnkaElement } from 'anka-types';
import { ankaElementTypes, socket } from '../config';
import AnkaTextArea from '../AnkaTextArea';
import { getRandomSingleAnkaEl } from '../fn';
import { AnkaPageProps } from '../AnkaPage';
import { user01_mockData } from '../storage/mockData';

export type HostUsedAnkaElements = {
  type: ankaElementTypesString
  checked: boolean
}[]

const initHostUsedAnkaElements = (): HostUsedAnkaElements => Object.keys(ankaElementTypes).map(t => ({
  type: t as ankaElementTypesString,
  checked: false,
}));
export class fn {
  static getLatestAnkaHost = (messages: SingleMessage[], ankaHostId: ID): SingleMessage | undefined => {
    const hostMessages = messages.filter(mes => {
      return mes.userId === ankaHostId && mes.ankaElements.length > 0;
    });
    return hostMessages[hostMessages.length - 1];
  };

  static getLatestAnkaHostElementsTypes = (messages: SingleMessage[], ankaHostId: ID) => {
    const latestHostMessages = fn.getLatestAnkaHost(messages, ankaHostId);
    if(latestHostMessages) {
      const { ankaElements } = latestHostMessages;
      return ankaElements.map(el => el.type);
    }
    return [];
  };

  static getAnkaHostElementsOfReply = (hostUsedAnkaElements: ReturnType<typeof initHostUsedAnkaElements>, newId: number) => {
    const usedAnkaElements = hostUsedAnkaElements.filter(el => el.checked);
    return usedAnkaElements.map(el => getRandomSingleAnkaEl(el.type, newId));
  };

  static getAnkaElementsOfReply = (messages: SingleMessage[], ankaHostId: ID, replyUseAnka: boolean) => {
    const latestAnkaHostElementsTypes = fn.getLatestAnkaHostElementsTypes(messages, ankaHostId);
    const randAnkaElements = latestAnkaHostElementsTypes.map(type => getRandomSingleAnkaEl(type));
    return (replyUseAnka) ? randAnkaElements : [];
  };
}

type AnkaTextAreaContainerProps = AnkaPageProps & {
  isAnkaHost: boolean
  messages: SingleMessage[]
  ankaHostId: ID
  setMessagesFn: (x: SingleMessage[]) => any
}
const AnkaTextAreaContainer = (props: AnkaTextAreaContainerProps) => {
  const {
    ankaPageId,
    userInfo=user01_mockData,
    isAnkaHost,
    messages,
    ankaHostId,
    setMessagesFn
  } = props;
  const [hostUsedAnkaElements, setHostUsedAnkaElements] = useState(initHostUsedAnkaElements());
  const [replyUseAnka, setUseAnka] = useState(false);
  const [textAreaValue, setValue] = useState('');

  const handleSetUseAnka = () => {
    setUseAnka(a => !a);
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  const handleSetAnkaHostUseAnkaElements = useCallback((index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newEls = [...hostUsedAnkaElements];
    // const { value } = e.target;
    newEls[index].checked = !newEls[index].checked;
    setHostUsedAnkaElements(newEls);
  }, [hostUsedAnkaElements]);
  const handleSendReply = useCallback(() => {
    const newId = messages.length + 1;
    let ankaElements: SingleAnkaElement[];
    // if(isAnkaHost) {
    //   ankaElements = fn.getAnkaHostElementsOfReply(hostUsedAnkaElements, newId);
    // } else {
    //   ankaElements = fn.getAnkaElementsOfReply(messages, ankaHostId, replyUseAnka);
    // }
    ankaElements = fn.getAnkaHostElementsOfReply(hostUsedAnkaElements, newId);
    const newestMessage = {
      id: newId,
      userId: userInfo.id,
      username: userInfo.username,
      content: textAreaValue,
      created_at: new Date(),
      ankaElements,
    };
    setMessagesFn([
      ...messages,
      newestMessage
    ]);
    socket.emit('send_chat', [ankaPageId, newestMessage]);
    setValue('');
  }, [ankaPageId, hostUsedAnkaElements, messages, setMessagesFn, textAreaValue, userInfo.id, userInfo.username]);

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