import { BulletNoteState } from "../constants/context";
import InputPartActions from "../actions/inputPart-actions";
import { BulletNoteActionTypes } from "../actions";
import HandleParseMessage from "../functions/handleParseMessage";

const inputPartReducers = (state: BulletNoteState, action: InputPartActions): BulletNoteState['messageList'] => {
  switch (action.type) {
  case BulletNoteActionTypes.ADD_MESSAGE: {
    const handledMessage = HandleParseMessage.convertRawMessageToMessageItem(action.payload.rawMessage);
    return [
      ...state.messageList,
      handledMessage,
    ];
  }
  default:
    return state.messageList;
  }
};

export default inputPartReducers;