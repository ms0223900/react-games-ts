import React from 'react';
import { Box, FormControl, TextareaAutosize, Button, Checkbox, Typography, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import 'app/AnKa/styles/styles.scss';

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
  isUseAnka?: boolean
  setUseAnkaFn?: (x: any) => any
  inputTextAreaFn?: (x: any) => any
  textAreaValue?: string
  sendFn?: (x: any) => any
}
const AnkaTextArea = ({
  isUseAnka=false,
  setUseAnkaFn,
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
      <FormControlLabel control={
        <Checkbox 
          checked={isUseAnka}
          onChange={setUseAnkaFn} />
      } label={'use Anka'} />
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