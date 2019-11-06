import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    // height: 60,
    position: 'fixed',
    justifyContent: 'flex-end',
    top: 0,
    left: 0,
    width: '100%',
    height: 48,
    backgroundColor: '#ddd',
    '& h5': {
      padding: 6,
    }
  },
});
const useStyles_inputPopup = makeStyles({
  back: {
    position: 'fixed',
    top: 48,
    left: 0,
    width: '100%',
    height: '100vh'
    // opacity: 0.3,
  },
  backBG: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: 'auto',
    backgroundColor: '#ddd',
    opacity: 0.6
  },
});

type InputPopupProps = {
  isSignUp: boolean
  isLogin: boolean
  handleClose?: (x?: any) => any
}
export const InputPopup = (props: InputPopupProps) => {
  const classes = useStyles_inputPopup(props);
  const {
    isSignUp,
    isLogin,
    handleClose,
  } = props;
  const isDisplay = isSignUp || isLogin;
  return (
    <>
      {isDisplay && (
        <Box 
          className={ classes.back }
        >
          <Box className={ classes.backBG } onClick={ handleClose } />
          {isSignUp && (
            <SignUp />
          )}
          {isLogin && (
            <LogIn />
          )}
        </Box>
      )}
    </>
  );
};



type Props = {

}
const NavBar = (props: Props) => {
  const classes = useStyles(props);
  return (
    <Box>

    </Box>
  );
};

export default NavBar;