import React, { useState, ChangeEvent, useCallback, KeyboardEvent } from 'react';
import { ankaElementTypesString, UserInfo, SinglePost } from 'anka-types';
import { ankaElementTypes } from '../config';
import AnkaTextArea from '../components/AnkaTextArea';
import { getNewMessage } from '../fn';
import { user01_mockData } from '../storage/mockData';

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
  const [hostUsedAnkaElements] = useState(initHostUsedAnkaElements());
  const [textAreaValue, setValue] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };
  
  const handlAddAnkaElement = useCallback((ankaEl: string) => {
    const ankaElementStr = `(_${ankaEl})`;
    setValue(val => val + ankaElementStr);
  }, []);
  const handleAddPost = useCallback(() => {
    // const newPost = getNewMessage({messages: posts, textAreaValue, userInfo});
    // if(newPost) {
    //   setPostsFn && setPostsFn([
    //     ...posts,
    //     newPost
    //   ]);
    //   setValue('');
    // }
    
  }, []);
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