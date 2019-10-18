import React from 'react';
import Reply from 'app/AnKa/Reply';
import { reply_mockData, ankaElement_dice_mockData, ankaElement_color_mockData, replies_mockData, user03_host_mockData } from 'app/AnKa/storage/mockData';
import { Typography } from '@material-ui/core';
import SingleAnkaElement from 'app/AnKa/AnkaElement';
import AnkaTextArea from 'app/AnKa/AnkaTextArea';
import AnkaPage from 'app/AnKa/AnkaPage';

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
    </>
  );
};

export const textArea = () => {
  return (
    <AnkaTextArea />
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