import React from 'react';
import TagNoteBlockItem from 'app/BulletNote/components/TagNoteBlockItem';
import { TagNoteBlockItemContainerProps } from '../types';

const TagNoteBlockItemContainer = (props: TagNoteBlockItemContainerProps) => {
  return (
    <TagNoteBlockItem
      {...props} />
  );
};

export default TagNoteBlockItemContainer;