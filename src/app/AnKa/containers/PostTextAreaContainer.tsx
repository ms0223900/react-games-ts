import React, { useState, ChangeEvent, useCallback, KeyboardEvent } from 'react';
import { ankaElementTypesString, SingleMessage, ID, UserInfo, SinglePost } from 'anka-types';
import { ankaElementTypes, socket } from '../config';
import AnkaTextArea from '../components/AnkaTextArea';
import { convertContent, recoverElementToStr } from '../fn';
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
    const newId = posts.length + 1;
    // let ankaElements: SingleAnkaElement[];
    let { ankaElements, content } = convertContent(textAreaValue, newId);
    const contentLength = content.trim().length;
    const checkContentIsEmpty = contentLength === 0;
    const checkLackStringExpectAnkaElementsInContent = () => {
      const recoveredStringOfElements = ankaElements.map(el => recoverElementToStr(el));
      const stringLength = recoveredStringOfElements.join('').length;
      return stringLength === contentLength;
    };
    if(checkLackStringExpectAnkaElementsInContent()) 
      return window.alert('please input some message expect anka elements!');
    const newPost = {
      id: newId,
      userId: userInfo.id,
      username: userInfo.username,
      created_at: new Date(),
      content,
      ankaElements,
    };
    if(!checkContentIsEmpty) {
      setPostsFn && setPostsFn([
        ...posts,
        newPost
      ]);
      setValue('');
    }
    
  }, [posts, setPostsFn, textAreaValue, userInfo.id, userInfo.username]);
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