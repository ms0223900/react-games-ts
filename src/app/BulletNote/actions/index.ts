import InputPartActions from "./message-actions";

export enum BulletNoteActionTypes {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  SET_MESSAGE_FROM_DB,
  TOGGLE_MESSAGE_ISDONE,
}

type BulletNoteActions = InputPartActions

export default BulletNoteActions;