import { MessageList, SingleRawMessageFromDB } from "../types";

const messageListLS = 'messageListLS';

class HandleDataInLocalStorage {
  static convertMessageListToRawMessageList(messageList: MessageList): SingleRawMessageFromDB[] {
    return messageList.map(m => ({
      id: m.id,
      rawMessage: m.message.rawMessage,
    }));
  }

  static setData(messageList: MessageList) {
    const rawMessageList = this.convertMessageListToRawMessageList(
      messageList,
    );
    const dataStr = JSON.stringify(rawMessageList);
    localStorage.setItem(messageListLS, dataStr);
  }

  static getData(): SingleRawMessageFromDB[] {
    const data = localStorage.getItem(messageListLS);
    if(data) {
      return JSON.parse(data);
    }
    return [];
  };
}

export default HandleDataInLocalStorage;