import { BulletNoteState } from "../constants/context";
import InputPartActions from "../actions/inputPart-actions";
import { BulletNoteActionTypes } from "../actions";
import HandleParseMessage from "../functions/handleParseMessage";
import HandleDataInLocalStorage from "../functions/HandleDataInLocalStorage";

const inputPartReducers = (state: BulletNoteState, action: InputPartActions): BulletNoteState['messageList'] => {
  switch (action.type) {
  case BulletNoteActionTypes.ADD_MESSAGE: {
    const newId = String(state.messageList.length);
    const handledMessage = HandleParseMessage.convertRawMessageToMessageItem(newId, action.payload.rawMessage);
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
      HandleParseMessage.convertRawMessageToMessageItem(r.id, r.rawMessage)
    ));
    return messageList;
  }
  default:
    return state.messageList;
  }
};

export default inputPartReducers;