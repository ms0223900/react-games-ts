import React, { useState, ChangeEvent, useCallback, KeyboardEvent } from 'react';
import { Box } from '@material-ui/core';
import { ankaElementTypesString, SingleMessage, ID, SingleAnkaElement } from 'anka-types';
import { ankaElementTypes, socket, splitElementStringRegExp } from '../config';
import AnkaTextArea from '../components/AnkaTextArea';
import { getRandomSingleAnkaEl, ankaElsInMessageRegExp, insertStringAfterIndex, convertContent, splitSingleMessage, recoverElementToStr } from '../fn';
import { AnkaPageProps } from '../components/AnkaPage';
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
  const [textAreaValue, setValue] = useState('');

  
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  
  const handlAddAnkaElement = useCallback((ankaEl: string) => {
    const ankaElementStr = `(_${ankaEl})`;
    setValue(val => val + ankaElementStr);
  }, []);
  const handleSendReply = useCallback(() => {
    const newId = messages.length + 1;
    // let ankaElements: SingleAnkaElement[];
    let { ankaElements, content } = convertContent(textAreaValue, newId);
    const checkContentIsEmpty = content.trim().length === 0;
    const checkLackStringExpectAnkaElementsInContent = () => {
      const recoveredStringOfElements = ankaElements.map(el => recoverElementToStr(el));
      const stringLength = recoveredStringOfElements.join('').length;
      return stringLength === content.trim().length;
    };
    if(checkLackStringExpectAnkaElementsInContent()) 
      return window.alert('please input some message expect anka elements!');
    const newestMessage = {
      id: newId,
      userId: userInfo.id,
      username: userInfo.username,
      created_at: new Date(),
      content,
      ankaElements,
    };
    if(!checkContentIsEmpty) {
      setMessagesFn([
        ...messages,
        newestMessage
      ]);
      setValue('');
      socket.emit('send_chat', [ankaPageId, newestMessage]);
    }
    
  }, [ankaPageId, messages, setMessagesFn, textAreaValue, userInfo.id, userInfo.username]);
  const handleSendByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    e.preventDefault();
    if(keyCode === 13 && !e.shiftKey) {
      handleSendReply();
    }
  };

  return (
    <AnkaTextArea
      {...props}
      hostUsedAnkaElements={hostUsedAnkaElements}
      addAnkaElementFn={handlAddAnkaElement}
      textAreaValue={textAreaValue} 
      inputTextAreaFn={handleInput}
      sendFn={handleSendReply}
      sendByEnterFn={handleSendByEnter} />
  );
};

export default AnkaTextAreaContainer;