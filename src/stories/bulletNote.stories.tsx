import React from 'react';
import NoteBlockList from "app/BulletNote/components/NoteBlockList";
import { todoMessageItemProps } from "./__mocks/bulletNote-mock";

export default ({
  title: 'bullet note'
});

export const noteBlockList = () => (
  <NoteBlockList
    messageList={[
      todoMessageItemProps,
      {
        ...todoMessageItemProps,
        message: {
          ...todoMessageItemProps.message,
          content: '《在狹窄空間打鬥》是款擁有獨特美術風格的回合制策略遊戲，融入了多部經典電影中的戰鬥動作，而玩家要善用這些動作擊退敵人。',
        }
      },
      {
        ...todoMessageItemProps,
        message: {
          ...todoMessageItemProps.message,
          createdAt: '2020-03-20 11:20',
        }
      },
      {
        ...todoMessageItemProps,
        message: {
          ...todoMessageItemProps.message,
          createdAt: '2020-03-23 09:20',
        }
      },
    ]} />
);