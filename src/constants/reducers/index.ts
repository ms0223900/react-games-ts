import { composeReducers } from 'lib/fn';
import navBar from './navBar';

const reducers = composeReducers({
  ...navBar,
});

export default reducers;