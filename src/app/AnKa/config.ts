import openSocket from 'socket.io-client';

const apiUrl = 
  process.env.NODE_ENV === 'production' ? 
    'https://intense-brushlands-46000.herokuapp.com' : 
    process.env.STORYBOOK_API || 'http://localhost:1337'; 

export const socket = openSocket(apiUrl);

export type ankaElementTypesString = 'dice' | 'color' | 'floor';
export const ankaElementTypes: {[x in ankaElementTypesString]: any} = {
  'dice': {
    type: 'dice',
    minNumber: 1,
    maxNumber: 6
  },
  'color': {
    type: 'color',
    minNumber: 0,
    maxNumber: 3
  },
  'floor': {
    type: 'floor',
    minNumber: 0, //from latest anka host floor
    maxNumber: 10
  },
};

