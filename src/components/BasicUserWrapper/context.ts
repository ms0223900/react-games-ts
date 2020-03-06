import { createContextValueFn, createContextStore } from 'react-function-helpers/lib/functions/contextHelpers';
import ContextWrapperFn from 'react-function-helpers/lib/functions/ContextWrapper';
import { User } from './types';

export interface UserState<CustomUser extends User=User> {
  user: CustomUser
}

const initUserState = {
  user: {
    username: '',
    name: '',
  }
};

const defaultReducer = (s: UserState) => s;

export const ContextValue = createContextValueFn(initUserState, defaultReducer);
const ContextStore = createContextStore(initUserState);

export default ContextStore;

export const ContextWrapper = ContextWrapperFn(ContextValue, ContextStore);



