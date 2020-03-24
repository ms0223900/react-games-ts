import InputPartActions from "./message-actions";

export enum BulletNoteActionTypes {
  ADD_MESSAGE = 'ADD_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  SET_MESSAGE_FROM_DB = 'SET_MESSAGE_FROM_DB',
  TOGGLE_MESSAGE_ISDONE = 'TOGGLE_MESSAGE_ISDONE',
  EDIT_MESSAGE = 'EDIT_MESSAGE',
  EDIT_IT = 'EDIT_IT',
}

type BulletNoteActions = InputPartActions

export default BulletNoteActions;