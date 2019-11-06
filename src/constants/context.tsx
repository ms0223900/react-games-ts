import React, { createContext, useReducer } from 'react';
import { Box } from '@material-ui/core';
import reducers from 'constants/reducers';
import { UserInfo } from 'common-types';

export type State = {
  userInfo: typeof initUserInfo
}
type Context = {
  dispatch: (x: any) => any
  state: State
}

export const initUserInfo: UserInfo = {
  id: undefined,
  username: localStorage.getItem('username')
};
const initState = {
  userInfo: initUserInfo
};


export const ContextValue = () => {
  const [state, dispatch] = useReducer(reducers, initState);
  return ({
    dispatch,
    state,
  });
};

const ContextStore = createContext<Context>({
  dispatch: (x: any) => {},
  state: initState,
});

export const ContextWrapper = (props: any) => {
  const value = ContextValue();
  return (
    <ContextStore.Provider value={value}>
      {props.children}
    </ContextStore.Provider>
  );
};

export default ContextStore;