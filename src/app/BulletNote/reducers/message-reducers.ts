import { BulletNoteState } from "../constants/context";
import InputPartActions from "../actions/message-actions";
import { BulletNoteActionTypes } from "../actions";
import HandleParseMessage from "../functions/handleParseMessage";
import HandleDataInLocalStorage from "../functions/HandleDataInLocalStorage";
import { MESSAGE_TYPE, MessageItem } from "../types";
import { ToDoMessageItemProps } from "../components/types";

const inputPartReducers = (state: BulletNoteState, action: InputPartActions): BulletNoteState['messageList'] => {
  switch (action.type) {
  case BulletNoteActionTypes.ADD_MESSAGE: {
    const {
      messageList
    } = state;
    const lastMessageId = messageList.length === 0 ? (
      -1
    ): Number(messageList.slice(-1)[0].message.id);
    const newId = String(lastMessageId + 1);
    
    const handledMessage = HandleParseMessage
      .convertRawMessageToMessageItem({
        id: newId,
        rawMessage: action.payload.rawMessage
      });
    const newMessageList = [
      ...state.messageList,
      handledMessage,
    ];
    HandleDataInLocalStorage.setData(newMessageList);
    return newMessageList;
  }

  case BulletNoteActionTypes.SET_MESSAGE_FROM_DB: {
    const {
      rawMessageFromDBList
    } = action.payload;
    const messageList = rawMessageFromDBList.map((r) => (
      HandleParseMessage.convertRawMessageToMessageItem(r)
    ));
    return messageList;
  }

  case BulletNoteActionTypes.DELETE_MESSAGE: {
    const {
      id
    } = action.payload;
    const newMessageList = state.messageList.filter(m => {
      return id !== m.message.id;
    });
    HandleDataInLocalStorage.setData(newMessageList);
    return newMessageList;
  }

  case BulletNoteActionTypes.TOGGLE_MESSAGE_ISDONE: {
    const {
      id,
      isDone
    } = action.payload;
    let newMessageList = [...state.messageList];
    const index = newMessageList.findIndex((m) => m.message.id === id);
    if(index !== -1) {
      if(newMessageList[index].type === MESSAGE_TYPE.TODO) {
        newMessageList[index] = {
          ...newMessageList[index],
          status: {
            ...newMessageList[index].status,
            isDone: isDone,
          }
        } as ToDoMessageItemProps;
      }
    }
    HandleDataInLocalStorage.setData(newMessageList);
    return newMessageList;
  }
  
  default:
    return state.messageList;
  }
};

export default inputPartReducers;