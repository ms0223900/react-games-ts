import React, { useState, ChangeEvent, useCallback, KeyboardEvent, useContext } from 'react';
import { ankaElementTypesString, SingleMessage, ID, UserInfo, SingleMessageData } from 'anka-types';
import { ankaElementTypes, socket } from '../config';
import AnkaTextArea from '../components/AnkaTextArea';
import { getRandomSingleAnkaEl, getNewMessage, verifyTextAreaValue } from '../fn';
import { AnkaPageProps } from '../components/AnkaPage';
import { user01_mockData } from '../storage/mockData';
import { useMutation } from '@apollo/react-hooks';
import { ADD_MESSAGE } from '../constants/API';
import ContextStore from 'constants/context';

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
type NewDataPayload = ReturnType<typeof getNewMessage>
type NewMessageDataAction = {
  payload: NewDataPayload & {
    postId: ID
  }
}
type NewPostDataAction = {
  payload: NewDataPayload
}
type NewMessagesReducer = (action: NewMessageAction, state: SingleMessage[]) => any
export type MesMutationPayload = {
  userId: ID
  username: string
  content: string
}
type MutationPayload = MesMutationPayload & {
  postId: ID
}

export const dispatchWithMutationFn = (
  state: any, 
  dispatch: ((x: any) => any) | undefined, 
  reducer: (state: any, action: any) => typeof state
) => (action: any) => {
  const newState = reducer(state, action);
  return dispatch && dispatch(newState);
};

export const checkIsLogin = (id: UserInfo['id'], username: UserInfo['username']) => {
  return (typeof id !== 'undefined' && !!username) ? username : false;
};
export const getAndCheckMutationPayload = (action: NewMessageDataAction, isMessage?: boolean) => {
  const { payload } = action;
  const { userId, username, content_string, postId } = payload;
  const loginedUsername = checkIsLogin(userId, username);
  if(loginedUsername) {
    const mutationPayload = {
      userId,
      username: loginedUsername,
      content: content_string,
      postId: isMessage ? postId : undefined
    };
    return mutationPayload;
  }
  return false;
};

type MutationFn = (x: MutationPayload | MesMutationPayload) => Promise<any>

export async function getNewActionFromMutation(state: SingleMessage[], action: any, mutationFn: MutationFn) {
  const { payload } = action;
  const mutationPayload = getAndCheckMutationPayload(action, true);
  let newAction: NewMessageAction;
  if(mutationPayload) {
    try {
      console.log(mutationPayload);
      const mutationRes = await mutationFn(mutationPayload);
      const { createAnkamessage, createAnkapost } = mutationRes.data;
      let id, created_at;
      if(createAnkamessage) {
        id = createAnkamessage.ankamessage.id;
        created_at = createAnkamessage.ankamessage.created_at;
      } else {
        id = createAnkapost.ankapost.id;
        created_at = createAnkapost.ankapost.created_at;
      }
      newAction = {
        payload: {
          ...payload,
          id,
          created_at,
        }
      };
    } catch(e) {
      console.log('network had something wrong, it is offline mode');
      newAction = {
        payload: {
          ...payload,
          id: state.length + 1,
          created_at: new Date()
        }
      };
    }
    return newAction;
  }
  
};

export const reducer_ankaTextAreaContainer = (state: SingleMessage[], action: NewMessageAction) => {
  const { payload } = action;
  console.log(state);
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
  
  const [hostUsedAnkaElements] = useState(initHostUsedAnkaElements());
  const [textAreaValue, setValue] = useState('');
  const setMessagesFnWithMiddleware = dispatchWithMutationFn(messages, setMessagesFn, reducer_ankaTextAreaContainer);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  const handlAddAnkaElement = useCallback((ankaEl: string) => {
    const ankaElementStr = `(_${ankaEl})`;
    setValue(val => val + ankaElementStr);
  }, []);
  const handleSendReply = useCallback(async () => {
    const mutationFn: MutationFn = (payload) => {
      return addMessage({
        variables: {
          payload: {
            data: payload
          }
        }
      });
    };
    const checkValueResult = verifyTextAreaValue(textAreaValue);
    const isLogin = !!userInfo.username;
    if(!isLogin) return window.alert('please log in / sign in~');
    if(checkValueResult) {
      const messageAction = { messages, textAreaValue, userInfo };
      const newestMessage = getNewMessage(messageAction);
      console.log(newestMessage);
      const action = {
        payload: {
          ...newestMessage,
          postId,
        }
      };
      const newAction = await getNewActionFromMutation(messages, action, mutationFn);
      if(newAction) {
        setMessagesFnWithMiddleware(newAction);
        setValue('');
        socket.emit('send_chat', [postId, newAction.payload]);
      } else {
        window.alert('please log in / sign in~');
      }
      
    }
  }, [addMessage, messages, postId, setMessagesFnWithMiddleware, textAreaValue, userInfo]);
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

export const AnkaTextAreaWithCtx = (props: AnkaTextAreaContainerProps) => {
  const { state } = useContext(ContextStore);
  return (
    <AnkaTextAreaContainer {...props} userInfo={state.userInfo} />
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