import { ankaElementTypes, ankaElementTypesString } from './config';

export const getRandomSingleAnkaEl = (type: ankaElementTypesString,ankaHostFloorNow?: number) => {
  // const types = Object.keys(ankaElementTypes);
  // const randTypeIndex = ~~(Math.random() * (types.length + 1));
  // const type = types[randTypeIndex] as ankaElementTypesString;
  const randRange = ankaElementTypes[type].maxNumber - ankaElementTypes[type].minNumber;
  let number = ~~(Math.random() * randRange) + ankaElementTypes[type].minNumber;
  if(type === 'floor' && ankaHostFloorNow) {
    number += (ankaHostFloorNow + 1);
  }
  return ({
    type,
    number
  });
};