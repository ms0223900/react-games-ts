import React, { ChangeEvent } from 'react';
import { Box } from '@material-ui/core';




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
  return (
    <Box>
      
    </Box>
  );
};

export default LogIn;