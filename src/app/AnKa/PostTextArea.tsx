import React from 'react';
import { Box, Fab, TextField, TextareaAutosize } from '@material-ui/core';
import { Add } from '@material-ui/icons';



export const AddButton = ({clickFn}: {
  clickFn?: (x: any) => any
}) => {
  return (
    <Fab color={'primary'} style={{margin: 8}} onClick={clickFn}>
      <Add />
    </Fab>
  );
};


type Props = {
  value: string
  changeFn?: (x: any) => any
  sendFn?: (x: any) => any
}
const PostTextArea = (props: Props) => {
  return (
    <Box>
      <TextareaAutosize 
        value={props.value} 
        onChange={props.changeFn} 
        placeholder={'add a Anka'} />
      <AddButton clickFn={props.sendFn} />
    </Box>
  );
};

export default PostTextArea;