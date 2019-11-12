import React, { useContext } from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import ContextStore from 'constants/context';
import { UserInfo } from 'common-types';
import { addUser, removeUser } from 'constants/actions';
import { user_mockData } from 'storage/mockData';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#eee',
    height: 60,  
  }
});

type NavBarprops = {
  dispatch?: (x: any) => any
  userInfo: UserInfo
}
const NavBar = ({ dispatch, userInfo }: NavBarprops) => {
  const classes = useStyles();
  const { username } = userInfo;

  const handleLogin = () => {
    dispatch && dispatch(addUser(userInfo));
    localStorage.setItem('username', user_mockData);
  };
  const handleLogout = () => {
    dispatch && dispatch(removeUser());
    localStorage.removeItem('username');
  };

  return (
    <Box className={classes.root} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
      <Typography>{username}</Typography>
      <Button variant={'contained'} onClick={!username ? handleLogin : handleLogout}>
        {!username ? 'log in': `log out`}
      </Button>
    </Box>
  );
};

const ContextedNavBar = () => {
  const { dispatch, state } = useContext(ContextStore);
  return (
    <NavBar dispatch={dispatch} userInfo={state.userInfo}  />
  );
};

export default ContextedNavBar;