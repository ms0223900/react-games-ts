import { InputNameValue } from "common-types";
import { User } from "components/BasicUserWrapper/types";

export const inputNameValue: InputNameValue = {
  email: {
    label: 'Email',
    value: '',
    type: 'email',
    getMessageFn: (val: string) => {
      if(val.includes('google')) {
        return 'free mail ...!?';
      }
    }
  },
  pwd: {
    label: 'Password',
    value: '',
    type: 'password',
    validateFn: (x: string) =>  {
      if(!x) {
        return 'please enter password';
      }
      if(x.length < 4) {
        return 'password length too short!!';
      }
    }
  },
};

export const userProps: User = {
  name: 'Phantom0012',
  username: 'ppp',
  // userImageUrl: '',
};