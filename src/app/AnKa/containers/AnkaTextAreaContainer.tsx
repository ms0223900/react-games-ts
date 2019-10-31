import React, { useState, ChangeEvent, useCallback, KeyboardEvent } from 'react';
import { ankaElementTypesString, SingleMessage, ID, UserInfo, SingleMessageData } from 'anka-types';
import { ankaElementTypes, socket } from '../config';
import AnkaTextArea from '../components/AnkaTextArea';
import { getRandomSingleAnkaEl, getNewMessage, NewMessageAction } from '../fn';
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


const storeMessagesData_localStorage = (data: SingleMessageData) => {
  const messagesLS = 'anka-messages';
  const originData_str = localStorage.getItem(messagesLS);
  !originData_str && localStorage.setItem(messagesLS, JSON.stringify([]));
  const originData = originData_str ? JSON.parse(originData_str) : [];
  const newData = [
    ...originData,
    data,
  ];
  localStorage.setItem(messagesLS, JSON.stringify(newData));
};

export const dispatchNewMessagesWithMiddleware = (dispatch: (x: SingleMessage[]) => any) => (action: NewMessageAction, state: SingleMessage[]) => (reducer: (action: NewMessageAction, state: SingleMessage[]) => any) => {
  const {
    messages,
    textAreaValue,
    userInfo,
  } = action;
  const newId = messages.length + 1;
  const data: SingleMessageData = {
    id: newId,
    userId: userInfo.id,
    username: userInfo.username,
    created_at: new Date(),
    content: textAreaValue,
  };
  storeMessagesData_localStorage(data);
  const newState = reducer(action, state);
  return dispatch(newState);
};



type AnkaTextAreaContainerProps = AnkaPageProps & {
  isAnkaHost: boolean
  messages: SingleMessage[]
  ankaHostId: ID
  setMessagesFn: (x: SingleMessage[]) => any
}
const AnkaTextAreaContainer = (props: AnkaTextAreaContainerProps) => {
  const {
    postId,
    userInfo=user01_mockData,
    messages,
    setMessagesFn
  } = props;
  const [hostUsedAnkaElements] = useState(initHostUsedAnkaElements());
  const [textAreaValue, setValue] = useState('');
  const setMessagesFnWithMiddleware = dispatchNewMessagesWithMiddleware(setMessagesFn);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  const handlAddAnkaElement = useCallback((ankaEl: string) => {
    const ankaElementStr = `(_${ankaEl})`;
    setValue(val => val + ankaElementStr);
  }, []);
  const handleSendReply = useCallback(() => {
    const messageAction = { messages, textAreaValue, userInfo };
    const reducer = (mesAction: NewMessageAction, messages: SingleMessage[]) => {
      const newestMessage = getNewMessage(mesAction);
      return [
        ...messages,
        newestMessage
      ];
    };
    const newestMessage = getNewMessage({ messages, textAreaValue, userInfo });
    if(newestMessage) {
      setMessagesFnWithMiddleware({
        ...messageAction,
        textAreaValue: newestMessage.content_string,
      }, messages)(reducer);
      setValue('');
      socket.emit('send_chat', [postId, newestMessage]);
    }
    
  }, [messages, textAreaValue, userInfo, setMessagesFnWithMiddleware, postId]);
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