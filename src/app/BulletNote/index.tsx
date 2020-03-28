import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import ContextWrapper from './constants/context';
import InputPartContainerWithCtx from './containers/InputPart/InputPartContainer';
import { messageList } from 'stories/__mocks/bulletNote-mock';
import NotePartContainerWithCtx from './containers/NotePart/NotePartContainer';
import 'app/BulletNote/styles/style.scss';

const useStyles = makeStyles(theme => ({
  root: {
    '&::-webkit-scrollbar': {
      width: 8,
    }
  },
  notePart: {
    maxHeight: 'calc(100vh - 80px)',
    overflow: 'auto',
  },
  inputPart: {
    position: 'fixed',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
  }
}));

const BulletNote = () => {
  const classes = useStyles();
  return (
    <ContextWrapper customInitState={{
      // messageList: messageList
    }}>
      <Box padding={1} className={classes.root}>
        <Box className={classes.notePart}>
          <NotePartContainerWithCtx />
        </Box>
        <Box className={classes.inputPart}>
          <InputPartContainerWithCtx />
        </Box>
      </Box>
    </ContextWrapper>
  );
};



export default BulletNote;