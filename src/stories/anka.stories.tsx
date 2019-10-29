import React from 'react';
import Reply from 'app/AnKa/components/Reply';
import { reply_mockData, ankaElement_dice_mockData, ankaElement_color_mockData, replies_mockData, user03_host_mockData, ankaElement_floor_mockData, reply_longContent_mockData } from 'app/AnKa/storage/mockData';
import { Typography } from '@material-ui/core';
import SingleAnkaElement from 'app/AnKa/components/AnkaElement';
import AnkaTextArea from 'app/AnKa/components/AnkaTextArea';
import AnkaPage, { initHostUsedAnkaElements } from 'app/AnKa/components/AnkaPage';
import MultiUserPage from 'app/common-components/MultiUserPage';
import ReplyContent from 'app/AnKa/components/ReplyContent';
import { splitSingleMessage, parsedSingleMessage } from 'app/AnKa/fn';
import SinglePostItem from 'app/AnKa/components/SingleAnkaPost';
import PostTextArea from 'app/AnKa/components/PostTextArea';
import PostTextAreaContainer from 'app/AnKa/containers/PostTextAreaContainer';
import AnkaPostsPage from 'app/AnKa/components/AnkaPostsPage';
import RoutePage from 'app/AnKa/containers/RoutePage';

export default {
  title: 'Anka components'
};

export const reply = () => {
  return (
    <>
      <Typography>{'normal(not anka host) reply'}</Typography>
      <Reply {...reply_mockData} />
      <br />
      <Typography>{'anka host'}</Typography>
      <Reply {...reply_mockData} isAnkaHost={true} />
    </>
    
  );
};

export const ankaElement = () => {
  return (
    <>
      <Typography>{'dice type'}</Typography>
      <SingleAnkaElement {...ankaElement_dice_mockData}/>
      <br />
      <Typography>{'color type'}</Typography>
      <SingleAnkaElement {...ankaElement_color_mockData}/>
      <br />
      <Typography>{'floor type'}</Typography>
      <SingleAnkaElement {...ankaElement_floor_mockData}/>
    </>
  );
};

export const parsedAnkaReplyContent = () => {
  const splitMes = splitSingleMessage();
  const parsedMessages = parsedSingleMessage(splitMes);
  return (
    <>
      <ReplyContent parsedMessages={parsedMessages} />
    </>
  );
};

export const textArea = () => {
  return (
    <>
      <Typography>{'repliers(not host)'}</Typography>
      <AnkaTextArea />
      <br />
      <Typography>{'host'}</Typography>
      <AnkaTextArea 
        isAnkaHost={true}
        hostUsedAnkaElements={initHostUsedAnkaElements} />
    </>
    
  );
};

export const ankaPage = () => {
  return (
    <AnkaPage 
      ankaHostId={user03_host_mockData.id}
      queriedMessages={replies_mockData} 
    />
  );
};

export const ankaPageWithUserWrapper = () => {
  return (
    <MultiUserPage>
      <AnkaPage 
        ankaHostId={user03_host_mockData.id}
        queriedMessages={replies_mockData} 
      />
    </MultiUserPage>
  );
};

export const singlePost = () => {
  return (
    <SinglePostItem 
      {...reply_mockData} />
  );
};

export const postTextArea = () => {
  return (
    <PostTextAreaContainer posts={[reply_mockData]} />
  );
};

export const ankaPostPage = () => {
  return (
    <MultiUserPage>
      <AnkaPostsPage
        queriedPosts={[
          ...replies_mockData,
          reply_longContent_mockData,
        ]} 
      />
    </MultiUserPage>
  );
};

export const routePage = () => {
  return (
    <RoutePage />
  );
};
