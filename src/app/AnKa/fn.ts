/* eslint-disable no-useless-escape */
import { ankaElementTypes, ankaElementTypesString } from './config';
import { SingleMessage, SingleAnkaElement, ParsedMessage_element, ParsedMessage_message, SingleMessageData, UserInfo, SinglePostData } from 'anka-types';
import { message_queried_mockData } from './storage/mockData';

export const getRandomSingleAnkaEl = (type: ankaElementTypesString,ankaHostFloorNow?: number) => {
  // const types = Object.keys(ankaElementTypes);
  // const randTypeIndex = ~~(Math.random() * (types.length + 1));
  // const type = types[randTypeIndex] as ankaElementTypesString;
  const randRange = ankaElementTypes[type].maxNumber - ankaElementTypes[type].minNumber;
  let number: number = ~~(Math.random() * randRange) + ankaElementTypes[type].minNumber;
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

const conditionElRegExp = (conditionEls: string, isFromInput=false) => (
  isFromInput ? (
    new RegExp(`(\\(_(?:${conditionEls})\\))`, 'g')
  ) : (
    new RegExp(`(\\(_(?:${conditionEls})_\\d+\\))`, 'g')
  )
);

export const ankaElsInMessageRegExp = (isFromInput: boolean, ankaEl?: ankaElementTypesString) => {
  const els = Object.keys(ankaElementTypes);
  const conditionEls = els.join('|');
  return conditionElRegExp(conditionEls, isFromInput);
  // if(allEls) return conditionElRegExp(conditionEls, false);
  // return allEls ? 
  //   new RegExp(`(${conditionEls})_\\d+?`, 'g') : 
  //   new RegExp(`(${ankaEl})+?`, 'g');
};

export const recoverElementToStr = (ankaElement: SingleAnkaElement) => (
  `(_${ankaElement.type}_${ankaElement.number})`
);
const splitElementStringRegExp = /\(_|_|\)/g;
export const splitSingleMessage = (message: string=message_queried_mockData[0]) => {
  const regExp = ankaElsInMessageRegExp(false);
  const splitMessages = message.split(regExp).filter(t => t !== '');
  const matchedElements = message.match(regExp);
  // console.log(splitMessages, matchedElements);
  return {
    splitMessages,
    matchedElements,
  };
};

export const getElementType = (elementStr: string) => (
  elementStr.split(splitElementStringRegExp).filter(t => t !== '')
);

export type ParsedSingleLineContent = (ParsedMessage_element | ParsedMessage_message)[]
export type ParsedContents = {
  parsedContent: ParsedSingleLineContent
  ankaElements: SingleAnkaElement[]
}
export const parsedSingleMessage = (messageAndMatches: {
  splitMessages: string[]
  matchedElements: string[] | null,
}): ParsedContents => {
  const {
    splitMessages,
    matchedElements,
  } = messageAndMatches;
  let res: ParsedContents = {
    parsedContent: [],
    ankaElements: []
  };
  splitMessages.forEach(mes => {
    const checkIsElement = matchedElements && matchedElements.find(el => el === mes);
    if(checkIsElement) {
      const el = getElementType(mes);
      const ankaElement = {
        type: el[0] as ankaElementTypesString,
        number: parseInt(el[1]),
      };
      // console.log(el);
      res.parsedContent = [...res.parsedContent, {
        mesType: 'ankaElement',
        ...ankaElement,
      }];
      res.ankaElements = [
        ...res.ankaElements,
        ankaElement,
      ];
    } else {
      res.parsedContent = [...res.parsedContent, {
        mesType: 'message',
        message: mes
      }];
    }
  });
  // console.log(res);
  return res;
};

export const insertStringAfterIndex = (str: string, addStr: string, index: number) => {
  const start = str.substring(0, index + 1);
  const end = str.substring(index + 1);
  return start + addStr + end;
};


export function getConvertContentFromTypes(content: string, elementTypes: ankaElementTypesString[], newId: number) {
  let newContent = content;
  let ankaElements = [] as SingleAnkaElement[];
  let stringSearchPos = 0;
  elementTypes.forEach(type => {
    const ankaElement = getRandomSingleAnkaEl(type, newId);
    ankaElements = [
      ...ankaElements,
      ankaElement
    ];
    const typeStr = `(_${type})`;
    const numberStr = String(ankaElement.number);
    const indexOfType = newContent.indexOf(typeStr, stringSearchPos);
    const endIndexOfType = indexOfType + (typeStr.length - 1) - 1;
    const addNumber = '_' + numberStr;
    newContent = insertStringAfterIndex(newContent, addNumber, endIndexOfType);
    // console.log(newContent, indexOfType, endIndexOfType);
    stringSearchPos = endIndexOfType + 1 + addNumber.length;
  });
  return { newContent, ankaElements };
}


type ParsedContentsFromData = {
  parsedContent: ParsedSingleLineContent[]
  ankaElements: SingleAnkaElement[]
}
export const parseContents = (content: string): ParsedContentsFromData => {
  let res: ParsedContentsFromData = {
    parsedContent: [],
    ankaElements: [],
  };
  const splitContent = content.split('\n');
  splitContent.forEach(cnt => {
    const splitStr = splitSingleMessage(cnt);
    const parsed = parsedSingleMessage(splitStr);
    const {
      parsedContent,
      ankaElements
    } = parsed;
    res.parsedContent = [
      ...res.parsedContent,
      parsedContent
    ];
    res.ankaElements = [
      ...res.ankaElements,
      ...ankaElements
    ];
  });
  return res;
};

export const getParseMessagesFromQuery = (singleMessageData: SingleMessageData | SinglePostData) => {
  const {
    parsedContent,
    ankaElements,
  } = parseContents(singleMessageData.content);
  return {
    ...singleMessageData,
    content: parsedContent,
    ankaElements,
  };
};




export const convertContent = (content: string, newId: number) => {
  let res = {
    content_string: content,
    content: [] as ParsedSingleLineContent[],
    ankaElements: [] as SingleAnkaElement[]
  };
  const regExp = ankaElsInMessageRegExp(true);
  const elements = content.match(regExp);
  if(elements) {
    //element types
    const elementTypes = elements.map(el => getElementType(el)[0] as ankaElementTypesString);
    //elements and insert number into content
    const { newContent, ankaElements } = getConvertContentFromTypes(content, elementTypes, newId);
    res = {
      ...res,
      content_string: newContent,
      ankaElements: [
        ...res.ankaElements,
        ...ankaElements,
      ],
    };
  }
  res = {
    ...res,
    content: parseContents(res.content_string).parsedContent,
  };
  //
  return res;
};


export type NewMessageAction = {
  messages: SingleMessage[]
  textAreaValue: string
  userInfo: UserInfo
}

export const checkLackAnkaElementsInContent = (textAreaValue: string) => {
  const regExp = ankaElsInMessageRegExp(true);
  const removeAnkaElementString = textAreaValue.replace(regExp, '');
  return removeAnkaElementString.length === 0;
};
export const verifyTextAreaValue = (textAreaValue: string) => {
  const stringLength = textAreaValue.trim().length;
  if(stringLength === 0) {
    return undefined;
  }
  const checkContentIsLack = checkLackAnkaElementsInContent(textAreaValue);
  if(checkContentIsLack) {
    window.alert('please input some message expect anka elements!');
    return undefined;
  }
  return true;
};


export const getNewMessage = ({messages, textAreaValue, userInfo}: NewMessageAction) => {
  const newId = messages.length + 1;
  // let ankaElements: SingleAnkaElement[];
  let {
    ankaElements,
    content,
    content_string, 
  } = convertContent(textAreaValue, newId);
  const newestMessage = {
    userId: userInfo.id,
    username: userInfo.username,
    content,
    content_string,
    ankaElements,
  };
  return newestMessage;
};

