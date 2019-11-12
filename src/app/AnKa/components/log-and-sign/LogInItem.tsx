import React, { ChangeEvent, useCallback, useState, useContext } from 'react';
import { Box, makeStyles, Paper, Typography, TextField, Button } from '@material-ui/core';
import { useForm } from './SignUpItem';
import { logIn } from 'app/AnKa/constants/API';
import { UserInfo } from 'common-types';
import ContextStore from 'constants/context';
import { addUser } from 'constants/actions';



const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 120,
    // bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    maxWidth: 300,
    height: 180,
    margin: 'auto',
    textAlign: 'center',
    '& .MuiTextField-root': {
      display: 'block',
      margin: 10,
    }
  }
});

export type LogInForm = {
  username: string
  password: string
}
type Props = {
  form: LogInForm
  error?: string
  changeFormFn: (e: ChangeEvent<HTMLInputElement>) => any
  logInFn?: (x?: any) => any
}
const LogIn = (props: Props) => {
  const {
    form,
    error,
    changeFormFn,
    logInFn,
  } = props;
  const classes = useStyles();
  return (
    <Paper className={ classes.root }>
      <Typography variant={'subtitle1'}>{ 'Log In' }</Typography>
      <form>
        <TextField 
          id={'username'}
          margin="normal"
          value={form.username}
          onChange={changeFormFn}
          placeholder={ 'username' } />
        <TextField 
          id={ 'password' }
          margin="normal"
          value={form.password}
          onChange={changeFormFn}
          type={'password'} 
          placeholder={ 'password' } />
      </form>
      <Button variant={'contained'} onClick={ logInFn }>
        { 'Log In' }
      </Button>
      <Typography color={ 'error' }>{ error }</Typography>
    </Paper>
  );
};

type LogInContainerProps = {
  setUserInfoFn?: (userInfo: UserInfo) => any
}
export const LogInContainer = ({ setUserInfoFn }: LogInContainerProps) => {
  const [error, setError] = useState<string>();
  const [form, handleChangeForm] = useForm<LogInForm>({
    username: '',
    password: ''
  });

  const handleLogin = useCallback(() => {
    logIn(form)
      .then(res => {
        let user = res.user as UserInfo;
        user = {
          ...user,
          id: String(user.id)
        };
        setUserInfoFn && setUserInfoFn(user);
        setError('');
      })
      .catch(e => setError(e.message));
  }, [form, setUserInfoFn]);
  return (
    <LogIn
      form={form}
      changeFormFn={handleChangeForm}
      error={error}
      logInFn={handleLogin} />
  );
};

export const LogInWithCtx = () => {
  const { dispatch } = useContext(ContextStore);
  const setUserInfo = (userInfo: UserInfo) => dispatch( addUser(userInfo) );
  return (
    <LogInContainer setUserInfoFn={setUserInfo} />
  );
};

export default LogIn;