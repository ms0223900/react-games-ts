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


type CheckBoxesPartProps = {
  isAnkaHost?: boolean
  hostUsedAnkaElements: HostUsedAnkaElements
  setAnkaHostUseAnkaFn?: (x: any) => any
}
export const CheckBoxesPart = ({
  isAnkaHost,
  hostUsedAnkaElements,
  setAnkaHostUseAnkaFn
}: CheckBoxesPartProps) => {
  let ankaElements = hostUsedAnkaElements;
  if(!isAnkaHost) {
    ankaElements = hostUsedAnkaElements.filter(el => {
      return el.type !== 'floor';
    });
  }
  return (
    <>
      {ankaElements.map((t, i) => {
        const floorElemnt = hostUsedAnkaElements.find(el => el.type === 'floor');
        const floorChecked = !!(floorElemnt && floorElemnt.checked);
        return (
          <FormControlLabel 
            key={i}
            label={`use ${t.type}`}
            control={
              <Checkbox 
                checked={t.checked}
                disabled={floorChecked && t.type !== 'floor'}
                onChange={setAnkaHostUseAnkaFn && setAnkaHostUseAnkaFn(i)} />
            }  />
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
  setAnkaHostUseAnkaFn?: (x: any) => any
  inputTextAreaFn?: (x: any) => any
  textAreaValue?: string
  sendFn?: (x: any) => any
}
const AnkaTextArea = (props: AnkaTextAreaProps) => {
  const {
    isAnkaHost,
    isUseAnka=false,
    setUseAnkaFn,
    setAnkaHostUseAnkaFn,
    hostUsedAnkaElements=[],
    inputTextAreaFn,
    textAreaValue='',
    sendFn
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
          value={textAreaValue}  />
      </FormControl>
      <CheckBoxesPart 
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