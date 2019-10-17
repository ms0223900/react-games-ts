import React from 'react';
import { Box, makeStyles, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalPart: {
    padding: 8,
    width: 300,
  }
});


type ModalProps = {
  isModal: boolean
  closeFn?: (x?: any) => any
  children: React.ReactNode
}
const Modal = ({isModal, closeFn, ...props }: ModalProps) => {
  const classes = useStyles();
  return (
    <>
      {isModal && (
        <Box className={classes.root} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Paper className={classes.modalPart}>
            {props.children}
            <Button onClick={closeFn}>{'confirm'}</Button>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default Modal;