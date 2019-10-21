import React, { useState } from 'react';
import { Box, FormControl, TextareaAutosize, Button, Checkbox, Typography, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ankaElementTypes } from './config';
import 'app/AnKa/styles/styles.scss';
import { HostUsedAnkaElements } from './AnkaPage';

const useStyles = makeStyles({
  textArea: {
    resize: 'none',
    height: 64,
    // border: 0,
    outline: 0,
    borderRadius: 4,
    fontSize: 16,
  }
});

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
const AnkaTextArea = ({
  isAnkaHost,
  isUseAnka=false,
  setUseAnkaFn,
  setAnkaHostUseAnkaFn,
  hostUsedAnkaElements=[],
  inputTextAreaFn,
  textAreaValue='',
  sendFn
}: AnkaTextAreaProps) => {
  const classes = useStyles();
  return (
    <Box display={'flex'} alignItems={'center'}>
      <FormControl>
        <TextareaAutosize 
          className={classes.textArea}
          rowsMax={3}
          placeholder={'say something :)'}
          onChange={inputTextAreaFn}
          value={textAreaValue}  />
      </FormControl>
      {isAnkaHost ? (
        <>
          {hostUsedAnkaElements.map((t, i) => (
            <FormControlLabel 
              key={i}
              label={`use ${t.type}`}
              control={
                <Checkbox 
                  checked={t.checked}
                  onChange={setAnkaHostUseAnkaFn && setAnkaHostUseAnkaFn(i)} />
              }  />
          ))}
        </>
      ) : (
        <FormControlLabel control={
          <Checkbox 
            checked={isUseAnka}
            onChange={setUseAnkaFn} />
        } label={'use Anka'} />
      )}
      
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