import React, { useState, ChangeEvent, useCallback, KeyboardEvent } from 'react';
import { ankaElementTypesString, UserInfo, SinglePost } from 'anka-types';
import { ankaElementTypes } from '../config';
import AnkaTextArea from '../components/AnkaTextArea';
import { getNewMessage, verifyTextAreaValue } from '../fn';
import { user01_mockData } from '../storage/mockData';
import { useMutation } from '@apollo/react-hooks';
import { ADD_POST } from '../constants/API';
import { MesMutationPayload, dispatchWithMutationFn, reducer_ankaTextAreaContainer, getNewActionFromMutation } from './AnkaTextAreaContainer';

export type HostUsedAnkaElements = {
  type: ankaElementTypesString
  checked: boolean
}[]




const initHostUsedAnkaElements = (): HostUsedAnkaElements => Object.keys(ankaElementTypes).map(t => ({
  type: t as ankaElementTypesString,
  checked: false,
}));


type PostTextAreaContainerProps = {
  userInfo?: UserInfo
  posts: SinglePost[]
  setPostsFn?: (x: SinglePost[]) => any
}
const PostTextAreaContainer = (props: PostTextAreaContainerProps) => {
  const {
    userInfo=user01_mockData,
    posts,
    setPostsFn
  } = props;
  const [addPost] = useMutation(ADD_POST);
  const [hostUsedAnkaElements] = useState(initHostUsedAnkaElements());
  const [textAreaValue, setValue] = useState('');
  const setPostsFnWithMiddleware = dispatchWithMutationFn(posts, setPostsFn, reducer_ankaTextAreaContainer);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  const handlAddAnkaElement = useCallback((ankaEl: string) => {
    const ankaElementStr = `(_${ankaEl})`;
    setValue(val => val + ankaElementStr);
  }, []);
  const handleAddPost = useCallback(async () => {
    const mutationFn = (payload: MesMutationPayload) => {
      return addPost({
        variables: {
          payload: {
            data: payload
          }
        }
      });
    };
    const checkValueResult = verifyTextAreaValue(textAreaValue);
    if(checkValueResult) {
      const messageAction = { messages: posts, textAreaValue, userInfo };
      const newestMessage = getNewMessage(messageAction);
      const action = {
        payload: {
          ...newestMessage,
          // postId: '',
        }
      };
      const newAction = await getNewActionFromMutation(posts, action, mutationFn);
      console.log(action);
      setPostsFnWithMiddleware(newAction);
    }
  }, [addPost, posts, setPostsFnWithMiddleware, textAreaValue, userInfo]);
  const handlePostByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    e.preventDefault();
    if(keyCode === 13 && !e.shiftKey) {
      handleAddPost();
    }
  };

  return (
    <AnkaTextArea
      {...props}
      hostUsedAnkaElements={hostUsedAnkaElements}
      addAnkaElementFn={handlAddAnkaElement}
      textAreaValue={textAreaValue} 
      inputTextAreaFn={handleInput}
      sendFn={handleAddPost}
      sendByEnterFn={handlePostByEnter} />
  );
};

export default PostTextAreaContainer;