import React from 'react';
import { Box } from '@material-ui/core';
import { NotePartProps } from '../types';
import NoteBlockList from '../NoteBlockList';
import { BulletNoteState, ContextStore } from 'app/BulletNote/constants/context';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { connectCtx } from 'react-function-helpers';

const NotePart = (props: NotePartProps) => {
  return (
    <Box>
      <NoteBlockList
        {...props} />
    </Box>
  );
};

interface OwnProps {}

const mapStateToProps: MapStateToProps<BulletNoteState, OwnProps, NotePartProps> = (state) => {
  return ({
    messageList: state.messageList,
  });
};

const NotePartWithCtx = connectCtx(ContextStore)(mapStateToProps)(NotePart);

export default NotePartWithCtx;