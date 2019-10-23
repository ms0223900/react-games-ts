/* eslint-disable no-useless-escape */
import { ankaElementTypes, ankaElementTypesString } from './config';
import { SingleMessage, SingleAnkaElement } from 'anka-types';

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

export const checkIsAnkaed = (messages: SingleMessage[], messageIndex: number, hostIndexNow=0) => {
  const hostMes = messages[hostIndexNow];
  const hostMesAnkaEls = hostMes.ankaElements;
  const comparedMes = messages[messageIndex];
  const comparedMesAnkaEls = comparedMes.ankaElements;
  const checkHaveMesAndElements = 
    messages.length > 0 &&
    comparedMes &&
    hostMes.ankaElements.length > 0 &&
    comparedMes.ankaElements.length > 0;
  const checkObjTypeAndNumberEquality = (obj1: SingleAnkaElement, obj2: SingleAnkaElement) => (
    obj1.type === obj2.type && obj1.number === obj2.number
  ); 
  const checkElementTypeAndNumberMatched = () => {
    let matchedRes = {
      id: comparedMes.id,
      matched: false as boolean,
      matchedEls: [] as SingleAnkaElement[]
    };
    if(checkHaveMesAndElements) {
      for (let i = 0; i < comparedMesAnkaEls.length; i++) {
        const comparedEl = comparedMesAnkaEls[i];
        const checkRes = hostMesAnkaEls.find(hostEl => checkObjTypeAndNumberEquality(hostEl, comparedEl));
        if(checkRes) {
          matchedRes = {
            id: comparedMes.id,
            matched: true,
            matchedEls: [
              ...matchedRes.matchedEls,
              comparedEl
            ]
          };
        }
      }
    }
    return matchedRes;
  };
  return checkElementTypeAndNumberMatched();
};

export const checkIsAnkaElementMatched = (hostLatestEls: SingleAnkaElement[], comparedMes: SingleMessage) => {
  let matchedRes = {
    id: comparedMes.id,
    matched: false as boolean,
    matchedEls: [] as SingleAnkaElement[]
  };
  const { ankaElements } = comparedMes;
  const checkUseFloorAnkaEl = hostLatestEls.find(el => el.type === 'floor');
  const newMatchedRes = (matchedEl: SingleAnkaElement) => ({
    ...matchedRes,
    matched: true,
    matchedEls: [
      ...matchedRes.matchedEls,
      matchedEl
    ]
  });
  if(checkUseFloorAnkaEl) {
    if(Number(comparedMes.id) === checkUseFloorAnkaEl.number) {
      matchedRes = newMatchedRes(checkUseFloorAnkaEl);
    }
  } else {
    for (let i = 0; i < ankaElements.length; i++) {
      const el = ankaElements[i];
      const checkHostMatched = hostLatestEls.find(hostEl => {
        return hostEl.type === el.type && hostEl.number === el.number;
      });
      if(checkHostMatched) {
        matchedRes = newMatchedRes(checkHostMatched);
      }
    }
  }
  return matchedRes;
};

const ankaElementString_mockData = '(_dice_2)';
const message_input_mockData = 'Hisjdakjd;ak(_dice)\nfasfa';
const message_queried_mockData = ['(_dice_2)Hisjdakjd;ak(_dice_2)(_color_1)(_sdad)', 'fasfa'];
const ankaElsInMessageRegExp = (allEls: boolean, ankaEl?: ankaElementTypesString, ) => {
  const els = Object.keys(ankaElementTypes);
  const conditionEls = els.join('|');
  if(allEls) return new RegExp(`(\\(_(?:${conditionEls})_\\d+\\))`, 'g');
  return allEls ? 
    new RegExp(`(${conditionEls})_\\d+?`, 'g') : 
    new RegExp(`(${ankaEl})+?`, 'g');
};

const splitElRegExp = /\(_|\)/g;
export const parsedSingleMessage = (message: string=message_queried_mockData[0]) => {
  const regExp = ankaElsInMessageRegExp(true);
  const splitMessages = message.split(regExp);
  console.log(splitMessages);
  
};