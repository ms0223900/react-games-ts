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