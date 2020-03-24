import { BulletNoteActionTypes } from ".";
import { SingleRawMessageFromDB } from "../types";

interface AddMessageActionPayload {
  rawMessage: string
}
interface SetMessageFromDB {
  rawMessageFromDBList: SingleRawMessageFromDB[]
}
interface DeleteMessageActionPayload {
  id: string
}
interface ToggleMessageIsDonePayload {
  id: string
  isDone: boolean
}
interface EditMessageActionPayload {
  id: string
  newMessage: string
}

interface DeleteMessageAction {
  type: BulletNoteActionTypes.DELETE_MESSAGE,
  payload: DeleteMessageActionPayload
}
interface AddMessageAction {
  type: BulletNoteActionTypes.ADD_MESSAGE,
  payload: AddMessageActionPayload
}
interface SetMessageFromDBAction {
  type: BulletNoteActionTypes.SET_MESSAGE_FROM_DB,
  payload: SetMessageFromDB
}
interface ToggleMessageIsDone {
  type: BulletNoteActionTypes.TOGGLE_MESSAGE_ISDONE,
  payload: ToggleMessageIsDonePayload
}
interface EditMessageAction {
  type: BulletNoteActionTypes.EDIT_MESSAGE,
  payload: EditMessageActionPayload
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

export const deleteMessage = (id: string): DeleteMessageAction => ({
  type: BulletNoteActionTypes.DELETE_MESSAGE,
  payload: { id }
});

export const toggleMessageIsDone = (id: string, isDone: boolean): ToggleMessageIsDone => ({
  type: BulletNoteActionTypes.TOGGLE_MESSAGE_ISDONE,
  payload: {
    id,
    isDone,
  }
});

export const editMessage = (id: string, newMessage: string): EditMessageAction => ({
  type: BulletNoteActionTypes.EDIT_MESSAGE,
  payload: { 
    id,
    newMessage 
  },
});

type InputPartActions = AddMessageAction | SetMessageFromDBAction | DeleteMessageAction | ToggleMessageIsDone | EditMessageAction

export default InputPartActions;