import React, { useContext } from 'react';
import { Box, Container, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { UserInfo } from 'anka-types';
import ContextStore from 'constants/context';
import { SignUpContainer } from  'app/AnKa/components/log-and-sign/SignUpItem';

const useStyles = makeStyles({
  root: {
    // height: 60,
    // position: 'fixed',
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


export type SignUpForm = {
  email: string
  username: string
  password: string
}

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
            <SignUpContainer />
          )}
          {/* {isLogin && (
            <LogIn />
          )} */}
        </Box>
      )}
    </>
  );
};



type Props = {
  userInfo: UserInfo
  setPopupFn?: (popupType: 'signUp' | 'login') => (x?: any) => any
  logOutFn?: () => any
}
const NavBar = (props: Props) => {
  const classes = useStyles(props);
  const {
    userInfo,
    setPopupFn,
    logOutFn,
  } = props;
  const { username } = userInfo;
  return (
    <Container>
      <Box display={ 'flex' } className={ classes.root }>
        {!username && (
          <>
            <Button 
              onClick={setPopupFn && setPopupFn('signUp')}
            >
              { 'sign up' }
            </Button>
            <Button 
              onClick={setPopupFn && setPopupFn('login')}
            >
              { 'log in' }
            </Button>
          </>
        )}
        {username && (
          <>
            <Box>
              <Typography variant={ 'h5' }>
                { username }
              </Typography>
            </Box>
            <Button onClick={ logOutFn }>{ 'log out' }</Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export const NavBarWithCtx = () => {
  const { state } = useContext(ContextStore);
  const { userInfo } = state;
  return (
    <NavBar userInfo={userInfo} />
  );
};

export default NavBar;