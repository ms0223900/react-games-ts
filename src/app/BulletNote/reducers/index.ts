import { combineReducers } from "react-function-helpers";
import { BulletNoteState } from "../constants/context";
import inputPartReducers from "./inputPart-reducers";

const reducers = combineReducers<BulletNoteState>({
  messageList: inputPartReducers,
});

export default reducers;