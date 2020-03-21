import { MESSAGE_TYPE, TagItem, BasicMessage, TodoMessageStatus, MessageItem } from "../types";

class HandleParseMessage {
  static todoReg = /(\[\]\s)?/
  static reviewReg = /(\*(\s)?)?/g
  static tagReg = /#\w+(\s)?/g
  static defaultTag: TagItem = {
    id: 'notDefinedTag',
    name: '未分類'
  }

  static removeSpaceInStr(str: string) {
    return str.replace(/\s/g, '');
  }

  static makeBasicMessage({
    content,
    tagList,
    rawMessage,
  }: {
    content: string, tagList: TagItem[], rawMessage: string
  }): BasicMessage {
    let handledTagList = tagList;
    if(tagList.length === 0) {
      handledTagList = [this.defaultTag];
    }

    return ({
      rawMessage,
      content,
      tagList: handledTagList,
      createdAt: new Date(),
      dateTagList: [],
    });
  }

  static makeTodoStatus(): TodoMessageStatus {
    return ({
      name: '',
      isDone: false,
      dueTime: undefined,
    });
  }

  static getTagItem(_tagName: string): TagItem {
    const tagName = this.removeSpaceInStr(_tagName);
    return ({
      id: tagName,
      name: tagName,
    });
  }

  static getTagListFromRawMessage(rawMessage: string): TagItem[] {
    const matchedRes = rawMessage.match(this.tagReg);
    if(!!matchedRes) {
      return matchedRes.map(r => this.getTagItem(r));
    }
    return [];
  }

  static getMessageType(rawMessage: string) {
    const isTodoType = rawMessage.match(this.todoReg);
    const isReviewType = rawMessage.match(this.reviewReg);

    if(isTodoType) {
      return MESSAGE_TYPE.TODO;
    }
    else if(isReviewType) {
      return MESSAGE_TYPE.REVIEW;
    }
    return MESSAGE_TYPE.DEFAULT; 
  }

  static getRemovedTypeAndTagsMessage(rawMessage: string): string {
    let res = rawMessage;
    res = res.replace(this.tagReg, '');
    res = res.replace(this.todoReg, '');
    return res;
  }

  static convertRawMessageToMessageItem(id: string, rawMessage: string): MessageItem {
    const messageType = this.getMessageType(rawMessage);
    const tagList = this.getTagListFromRawMessage(rawMessage);
    const content = this.getRemovedTypeAndTagsMessage(rawMessage);
    const message = this.makeBasicMessage({
      content,
      tagList,
      rawMessage,
    });

    switch (messageType) {
    case MESSAGE_TYPE.TODO: {
      const status = this.makeTodoStatus();
      return ({
        id,
        type: MESSAGE_TYPE.TODO,
        status,
        message,
      });
    }
    default:
      return ({
        id,
        type: MESSAGE_TYPE.DEFAULT,
        status: {},
        message,
      });
    }
  }
}

export default HandleParseMessage;