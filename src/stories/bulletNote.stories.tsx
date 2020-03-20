import React from 'react';
import NoteBlockList from "app/BulletNote/components/NoteBlockList";
import { todoMessageItemProps, messageList } from "./__mocks/bulletNote-mock";
import BulletNote from 'app/BulletNote';

export default ({
  title: 'bullet note'
});

export const noteBlockList = () => (
  <NoteBlockList
    messageList={messageList} />
);

export const bulletNote = () => (
  <BulletNote />
);