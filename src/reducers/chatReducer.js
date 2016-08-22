import * as types from '../constants/actionTypes/chat';

const initialState = {
  chat: [],
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_ACTION_SUCCESS:
      const tmp = state.chat;
      tmp.push(action.res);
      return Object.assign({}, state, {
        chat: tmp
      });
    default:
      return state;
  }
}
