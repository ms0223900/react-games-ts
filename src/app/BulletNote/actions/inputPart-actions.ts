import { BulletNoteActionTypes } from ".";
import { SingleRawMessageFromDB } from "../types";

interface AddMessageActionPayload {
  rawMessage: string
}

interface SetMessageFromDB {
  rawMessageFromDBList: SingleRawMessageFromDB[]
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

export const setMessageFromDB = (rawMessageFromDBList: SingleRawMessageFromDB[]): SetMessageFromDBAction => ({
  type: BulletNoteActionTypes.SET_MESSAGE_FROM_DB,
  payload: {
    rawMessageFromDBList,
  }
});

// export const deleteMessage = (id: string)

type InputPartActions = AddMessageAction | SetMessageFromDBAction

export default InputPartActions;