import React, { useState, ChangeEvent, useCallback } from 'react';
import { Box, TextField, Button, Typography } from '@material-ui/core';

type UserInfo = import('anka-types').UserInfo
const initUser: UserInfo = {
  id: '1',
  username: ''
};
const MultiUserPage = (props: any) => {
  const [users, setUsers] = useState([{...initUser}]);
  const [userNow, setUserNow] = useState<UserInfo>();

  const children = React.Children.map(props.children, child => React.cloneElement(child, {
    ...props,
    userInfo: userNow
  }));
  const handleInputUser = useCallback((e: ChangeEvent<HTMLInputElement>, index: number) => {
    let newUsers = [...users];
    const { value } = e.target;
    newUsers[index].username = value;
    setUsers(newUsers);
  }, [users]);
  const handleAddUser = () => {
    const newUser: UserInfo = {
      id: String(users.length + 1),
      username: ''
    };
    setUsers(u => [
      ...u,
      newUser
    ]);
  };
  const handleSetUserNow = useCallback((index: number) => {
    setUserNow(users[index]);
  }, [users]);

  return (
    <Box>
      {userNow && (
        <Typography>
          {`id: ${userNow.id}, username: ${userNow.username}`}
        </Typography>
      )}
      <Box display={'flex'}>
        {users.map((u, i) => (
          <Box key={i}>
            <TextField
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputUser(e, i)} 
              value={u.username}  />
            <Button onClick={() => handleSetUserNow(i)}>{'set this user'}</Button>
          </Box>
        ))}
        <Button variant={'contained'} onClick={handleAddUser}>
          {'add user'}
        </Button>
      </Box>
      {children}
    </Box>
  );
};

export default MultiUserPage;