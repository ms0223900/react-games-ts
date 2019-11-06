import React, { ChangeEvent, FormEvent, useState, useEffect, useCallback } from 'react';
import { Box, Paper, Typography, TextField, FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_SAMENAME_USER, signUp } from 'app/AnKa/constants/API';
import { UserInfo } from 'anka-types';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 120,
    right: 0,
    left: 0,
    padding: 10,
    maxWidth: 300,
    height: 230,
    margin: 'auto',
    textAlign: 'center',
    
    '& .MuiTextField-root': {
      display: 'block',
      margin: 10,
    }
  }
});


export type SignUpForm = {
  email: string
  username: string
  password: string
}
type Props = {
  form: SignUpForm
  error?: string
  changeFormFn?: (e: ChangeEvent<HTMLInputElement>) => any
  signUpFn?: (x?: any) => any
}
const SignUp = (props: Props) => {
  const classes = useStyles(props);
  const {
    form,
    changeFormFn,
    signUpFn,
    error,
  } = props;
  return (
    <Box>
      <Paper className={ classes.root }>
        <Typography variant={'subtitle1'}>{ 'Sign UP' }</Typography>
        <form>
          <TextField 
            id={ 'email' }
            margin="normal"
            value={form.email}
            onChange={changeFormFn}
            autoComplete={ 'email' } 
            placeholder={ 'email' } />
          <TextField 
            id={ 'username' }
            margin="normal"
            value={ form.username  }
            onChange={changeFormFn}
            placeholder={ 'username' } />
          <TextField 
            id={ 'password' }
            margin="normal"
            value={ form.password  }
            onChange={changeFormFn}
            type={ 'password' } 
            placeholder={ 'password' } />
        </form>
        <Button variant={'contained'} onClick={ signUpFn }>
          { 'Sign Up' }
        </Button>
        <Typography color={ 'error' }>{error}</Typography>
      </Paper>
    </Box>
  );
};


type SignUpContainerProps = {
  setUserInfoFn?: (x: UserInfo) => any
}
export const SignUpContainer = (props: SignUpContainerProps) => {
  const {
    setUserInfoFn
  } = props;
  const [getSameNameUser, { data }] = useLazyQuery(QUERY_SAMENAME_USER);
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState<string>();
  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(form => ({
      ...form,
      [id]: value,
    }));
  };
  const handleSignUp = useCallback(() => {
    const queryUserFn = (username: string) => {
      return getSameNameUser({
        variables: {
          userWhere: {
            username
          }
        }
      });
    };
    queryUserFn(form.username);
  }, [form.username, getSameNameUser]);
  useEffect(() => {
    const checkNoSameUser = data && data.users && data.users.length === 0;
    if(checkNoSameUser) {
      signUp(form)
        .then(res => {
          const user = res.user as UserInfo;
          setUserInfoFn && setUserInfoFn({
            id: user.id,
            username: user.username,
          });
        })
        .catch(e => setError(e.message));
    }
  }, [data, form, setUserInfoFn]);

  return (
    <SignUp 
      form={form}
      error={error}
      changeFormFn={handleChangeForm}
      signUpFn={handleSignUp} />
  );
};

export default SignUp;