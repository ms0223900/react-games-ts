import { BulletNoteState } from "../constants/context";
import InputPartActions from "../actions/inputPart-actions";
import { BulletNoteActionTypes } from "../actions";
import HandleParseMessage from "../functions/handleParseMessage";

const inputPartReducers = (state: BulletNoteState, action: InputPartActions): BulletNoteState['messageList'] => {
  switch (action.type) {
  case BulletNoteActionTypes.ADD_MESSAGE: {
    const newId = String(state.messageList.length);
    const handledMessage = HandleParseMessage.convertRawMessageToMessageItem(newId, action.payload.rawMessage);
    return [
      ...state.messageList,
      handledMessage,
    ];
  }
  case BulletNoteActionTypes.SET_MESSAGE_FROM_DB: {
    return [];
  }
  default:
    return state.messageList;
  }
};

export default inputPartReducers;