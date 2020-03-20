import { BulletNoteActionTypes } from ".";

interface AddMessageActionPayload {
  rawMessage: string
}

interface AddMessageAction {
  type: BulletNoteActionTypes.ADD_MESSAGE,
  payload: AddMessageActionPayload
}

export const addMessage = (rawMessage: string): AddMessageAction => ({
  type: BulletNoteActionTypes.ADD_MESSAGE,
  payload: {
    rawMessage,
  }
});

type InputPartActions = AddMessageAction

export default InputPartActions;