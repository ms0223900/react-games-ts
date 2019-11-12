import * as TYPEs from './actionTypes';
import { UserInfo } from 'common-types';

export const addUser = (userInfo: UserInfo) => ({
  type: TYPEs.ADD_USER,
  payload: userInfo
});

export const removeUser = () => ({
  type: TYPEs.REMOVE_USER,
});