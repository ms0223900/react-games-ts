import React, { useContext, useState } from 'react';
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
  closeFn?: (x?: any) => any
}
export const InputPopup = (props: InputPopupProps) => {
  const classes = useStyles_inputPopup(props);
  const {
    isSignUp,
    isLogin,
    closeFn,
  } = props;
  const isDisplay = isSignUp || isLogin;
  const close = () => { closeFn && closeFn(); };
  return (
    <>
      {isDisplay && (
        <Box 
          className={ classes.back }
        >
          <Box className={ classes.backBG } onClick={close} />
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


type SetPopupFn = (popupType: 'signUp' | 'login') => (x?: boolean) => any
type Props = {
  userInfo: UserInfo
  setPopupFn?: SetPopupFn
  logOutFn?: () => any
} & InputPopupProps
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
              onClick={() => { setPopupFn && setPopupFn('signUp')(true); }}
            >
              { 'sign up' }
            </Button>
            <Button 
              onClick={() => { setPopupFn && setPopupFn('login')(true); }}
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
      <InputPopup {...props} />
    </Container>
  );
};


const initPopupState = {
  'login': false,
  'signUp': false
};
const usePopup = (): [typeof initPopupState, SetPopupFn] => {
  const [popup, setPopup] = useState(initPopupState);
  const handlePopup: SetPopupFn = (type) => (isOpen=false) => {
    setPopup(p => ({
      ...initPopupState,
      [type]: isOpen
    }));
  };
  return [popup, handlePopup];
};

export const NavBarContainer = (props: {
  userInfo: UserInfo
}) => {
  const [popup, setPopup] = usePopup();
  return (
    <NavBar 
      {...props} 
      setPopupFn={setPopup}
      isSignUp={popup.signUp}
      isLogin={popup.login}
      closeFn={setPopup('signUp')} />
  );
};

export const NavBarWithCtx = () => {
  const { state } = useContext(ContextStore);
  const { userInfo } = state;
  return (
    <NavBarContainer userInfo={userInfo} />
  );
};

export default NavBar;