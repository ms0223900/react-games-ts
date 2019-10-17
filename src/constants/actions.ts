import * as TYPEs from './actionTypes';

export const addUser = (username: string) => ({
  type: TYPEs.ADD_USER,
  payload: {
    username
  }
});

export const removeUser = () => ({
  type: TYPEs.REMOVE_USER,
});