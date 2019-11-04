import React, { useState, ChangeEvent, useCallback, KeyboardEvent } from 'react';
import { ankaElementTypesString, SingleMessage, ID, UserInfo, SingleMessageData } from 'anka-types';
import { ankaElementTypes, socket } from '../config';
import AnkaTextArea from '../components/AnkaTextArea';
import { getRandomSingleAnkaEl, getNewMessage, verifyTextAreaValue } from '../fn';
import { AnkaPageProps } from '../components/AnkaPage';
import { user01_mockData } from '../storage/mockData';
import { useMutation } from '@apollo/react-hooks';
import { ADD_MESSAGE } from '../constants/API';

export type HostUsedAnkaElements = {
  type: ankaElementTypesString
  checked: boolean
}[]

const initHostUsedAnkaElements = (): HostUsedAnkaElements => Object.keys(ankaElementTypes).map(t => ({
  type: t as ankaElementTypesString,
  checked: false,
}));


type NewMessageAction = { 
  payload: SingleMessage 
}
type NewMessageDataAction = {
  payload: ReturnType<typeof getNewMessage> & {
    postId: ID
  }
}
type NewMessagesReducer = (action: NewMessageAction, state: SingleMessage[]) => any
type MutationPayload = {
  userId: ID
  username: string
  content: string
  postId: ID
}


export const dispatchNewMessagesWithMiddleware = (dispatch: (x: SingleMessage[]) => any, mutationFn: (x: MutationPayload) => Promise<any>) => (reducer: NewMessagesReducer) => async(action: NewMessageDataAction, state: SingleMessage[]) => {
  const { payload } = action;
  const { userId, username, content_string, postId } = payload;
  const mutationPayload = {
    postId,
    userId,
    username,
    content: content_string
  };
  const mutationRes = await mutationFn(mutationPayload);
  console.log(mutationRes);
  let newAction: NewMessageAction;
  if(mutationRes) {
    const { ankamessage } = mutationRes.data.createAnkamessage;
    newAction = {
      payload: {
        ...payload,
        id: ankamessage.id as ID,
        created_at: ankamessage.created_at as string
      }
    };
  } else {
    newAction = {
      payload: {
        ...payload,
        id: state.length + 1,
        created_at: new Date()
      }
    };
  }
  const newState = reducer(newAction, state);
  return dispatch(newState);
};


const reducer = (action: NewMessageAction, state: SingleMessage[]) => {
  const { payload } = action;
  return [
    ...state,
    payload
  ];
};
type AnkaTextAreaContainerProps = AnkaPageProps & {
  isAnkaHost: boolean
  messages: SingleMessage[]
  // ankaHostUserId: ID
  setMessagesFn: (x: SingleMessage[]) => any
}
const AnkaTextAreaContainer = (props: AnkaTextAreaContainerProps) => {
  const {
    postId='1',
    userInfo=user01_mockData,
    messages,
    setMessagesFn
  } = props;
  const [addMessage] = useMutation(ADD_MESSAGE);
  const mutationFn = (payload: MutationPayload) => {
    return addMessage({
      variables: {
        payload: {
          data: payload
        }
      }
    });
  };
  const [hostUsedAnkaElements] = useState(initHostUsedAnkaElements());
  const [textAreaValue, setValue] = useState('');
  const setMessagesFnWithMiddleware = dispatchNewMessagesWithMiddleware(setMessagesFn, mutationFn);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  const handlAddAnkaElement = useCallback((ankaEl: string) => {
    const ankaElementStr = `(_${ankaEl})`;
    setValue(val => val + ankaElementStr);
  }, []);
  const handleSendReply = useCallback(() => {
    const checkValueResult = verifyTextAreaValue(textAreaValue);
    if(checkValueResult) {
      const messageAction = { messages, textAreaValue, userInfo };
      const newestMessage = getNewMessage(messageAction);
      console.log(newestMessage);
      setMessagesFnWithMiddleware(reducer)({
        payload: {
          ...newestMessage,
          postId,
        }
      }, messages);
      setValue('');
      // socket.emit('send_chat', [postId, newestMessage]);
    }
    // const messageAction = { messages, textAreaValue, userInfo };
    // const newestMessage = getNewMessage({ messages, textAreaValue, userInfo });
    // console.log(newestMessage);
    // if(newestMessage) {
    //   setMessagesFnWithMiddleware({
    //     ...messageAction,
    //     textAreaValue: newestMessage.content_string,
    //   }, messages)(reducer);
    //   setValue('');
    //   socket.emit('send_chat', [postId, newestMessage]);
    // }
    
  }, [messages, postId, setMessagesFnWithMiddleware, textAreaValue, userInfo]);
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