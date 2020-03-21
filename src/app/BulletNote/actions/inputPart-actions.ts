import { BulletNoteActionTypes } from ".";

interface AddMessageActionPayload {
  rawMessage: string
}

interface SetMessageFromDB {
  rawMessageList: string[]
}

interface AddMessageAction {
  type: BulletNoteActionTypes.ADD_MESSAGE,
  payload: AddMessageActionPayload
}

interface SetMessageFromDBAction {
  type: BulletNoteActionTypes.SET_MESSAGE_FROM_DB,
  payload: SetMessageFromDB
}

export const addMessage = (rawMessage: string): AddMessageAction => ({
  type: BulletNoteActionTypes.ADD_MESSAGE,
  payload: {
    rawMessage,
  }
});

export const setMessageFromDB = (rawMessageList: string[]): SetMessageFromDBAction => ({
  type: BulletNoteActionTypes.SET_MESSAGE_FROM_DB,
  payload: {
    rawMessageList,
  }
});

// export const deleteMessage = (id: string)

type InputPartActions = AddMessageAction | SetMessageFromDBAction

export default InputPartActions;