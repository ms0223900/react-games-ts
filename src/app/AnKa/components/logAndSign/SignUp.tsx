import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Paper, Typography, TextField, FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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

export const SignUpContainer = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [error, setErr] = useState<string>();
  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(form => ({
      ...form,
      [id]: value,
    }));
  };
  const handleSignUp = () => {

  };


  return (
    <SignUp 
      form={form}
      error={error}
      changeFormFn={handleChangeForm}
      signUpFn={handleSignUp} />
  );
};



export default SignUp;