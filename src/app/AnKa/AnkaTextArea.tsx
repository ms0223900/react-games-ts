import React, { useState } from 'react';
import { Box, FormControl, TextareaAutosize, Button, Checkbox, Typography, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ankaElementTypes } from './config';
import 'app/AnKa/styles/styles.scss';
import { HostUsedAnkaElements } from './AnkaPage';

const useStyles = makeStyles({
  root: {
    paddingTop: 16,
  },
  textArea: {
    resize: 'none',
    width: 400,
    height: 64,
    padding: 8,
    // border: 0,
    outline: 0,
    borderRadius: 4,
    fontSize: 20,
  }
});


type ButtonsPartProps = {
  isAnkaHost?: boolean
  hostUsedAnkaElements: HostUsedAnkaElements
  addAnkaElementFn?: (x: any) => any
}
export const ButtonsPart = ({
  isAnkaHost,
  hostUsedAnkaElements,
  addAnkaElementFn
}: ButtonsPartProps) => {
  let ankaElements = hostUsedAnkaElements;
  if(!isAnkaHost) {
    ankaElements = hostUsedAnkaElements.filter(el => {
      return el.type !== 'floor';
    });
  }
  const handleAddAnkaEl = (type: string) => {
    addAnkaElementFn && addAnkaElementFn(type);
  };
  return (
    <>
      {ankaElements.map((t, i) => {
        // const floorElemnt = hostUsedAnkaElements.find(el => el.type === 'floor');
        // const floorChecked = !!(floorElemnt && floorElemnt.checked);
        return (
          <Button
            variant={'contained'} 
            onClick={() => handleAddAnkaEl(t.type)}>
            {t.type}
          </Button>
        );
      })}
    </>
  );
};


export type AnkaTextAreaProps = {
  isAnkaHost?: boolean
  isUseAnka?: boolean
  setUseAnkaFn?: (x: any) => any
  hostUsedAnkaElements?: HostUsedAnkaElements
  addAnkaElementFn?: (x: any) => any
  inputTextAreaFn?: (x: any) => any
  textAreaValue?: string
  sendFn?: (x: any) => any
  sendByEnterFn?: (x: any) => any
}
const AnkaTextArea = (props: AnkaTextAreaProps) => {
  const {
    isAnkaHost,
    isUseAnka=false,
    setUseAnkaFn,
    addAnkaElementFn,
    hostUsedAnkaElements=[],
    inputTextAreaFn,
    textAreaValue='',
    sendFn,
    sendByEnterFn,
  } = props;
  const classes = useStyles();
  return (
    <Box 
      className={classes.root}
      display={'flex'} 
      alignItems={'center'}
    >
      <FormControl>
        <TextareaAutosize 
          className={classes.textArea}
          rowsMax={3}
          placeholder={'say something :)'}
          onChange={inputTextAreaFn}
          onKeyUp={sendByEnterFn}
          value={textAreaValue}  />
      </FormControl>
      <ButtonsPart 
        {...props}
        hostUsedAnkaElements={hostUsedAnkaElements}  />
      <Button 
        variant={'contained'} 
        color={'primary'}
        onClick={sendFn}
        disabled={textAreaValue.length === 0}
      >
        {'send'}
      </Button>
    </Box>
  );
};



export default AnkaTextArea;