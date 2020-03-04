import React from 'react';
import Reply from 'app/AnKa/components/Reply';
import { ankaElement_dice_mockData, ankaElement_color_mockData, user03_host_mockData, ankaElement_floor_mockData, parsedMessagesFromData } from 'app/AnKa/storage/mockData';
import { Typography } from '@material-ui/core';
import SingleAnkaElement from 'app/AnKa/components/AnkaElement';
import AnkaTextArea from 'app/AnKa/components/AnkaTextArea';
import AnkaPage, { initHostUsedAnkaElements } from 'app/AnKa/components/AnkaPage';
import MultiUserPage from 'app/common-components/MultiUserPage';
import ReplyContent from 'app/AnKa/components/ReplyContent';
import { splitSingleMessage, parsedSingleMessage } from 'app/AnKa/fn';
import SinglePostItem from 'app/AnKa/components/SingleAnkaPost';
import PostTextAreaContainer from 'app/AnKa/containers/PostTextAreaContainer';
import AnkaPostsPage from 'app/AnKa/components/AnkaPostsPage';
import RoutePage from 'app/AnKa/containers/RoutePage';
import withApolloWrapper from './decorators/withApolloWrapper';

export default {
  title: 'Anka components',
  decorators: [
    withApolloWrapper,
  ]
};

export const reply = () => {
  return (
    <>
      <Typography>{'normal(not anka host) reply'}</Typography>
      <Reply index={0} {...parsedMessagesFromData[0]} />
      <br />
      <Typography>{'anka host'}</Typography>
      <Reply index={0} {...parsedMessagesFromData[0]} isAnkaHost={true} />
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
      <ReplyContent parsedMessages={parsedMessages.parsedContent} />
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
      ankaHostUserId={user03_host_mockData.id}
      queriedParsedMessages={parsedMessagesFromData} 
    />
  );
};

export const ankaPageWithUserWrapper = () => {
  return (
    <MultiUserPage>
      <AnkaPage 
        ankaHostUserId={user03_host_mockData.id}
        queriedParsedMessages={parsedMessagesFromData} 
      />
    </MultiUserPage>
  );
};

export const singlePost = () => {
  return (
    <SinglePostItem 
      {...parsedMessagesFromData[0]} />
  );
};

export const postTextArea = () => {
  return (
    <PostTextAreaContainer posts={parsedMessagesFromData} />
  );
};

export const ankaPostPage = () => {
  return (
    <MultiUserPage>
      <AnkaPostsPage
        queriedParsedPosts={parsedMessagesFromData} 
      />
    </MultiUserPage>
  );
};

export const routePage = () => {
  return (
    <RoutePage />
  );
};
