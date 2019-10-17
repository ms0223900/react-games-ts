import { Action } from "common-types";
import * as TYPEs from 'constants/actionTypes';
import { State, initUserInfo } from "constants/context";

export const userInfo = (state: State, action: Action): State => {
  const { type } = action;
  switch (type) {
  case TYPEs.ADD_USER:
    return ({
      ...state,
      userInfo: {
        ...action.payload
      }
    });
  case TYPEs.REMOVE_USER:
    return ({
      ...state,
      userInfo: initUserInfo
    });
  default:
    return state;
  }
};

export default ({
  userInfo,
});