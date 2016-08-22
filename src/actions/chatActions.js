import * as types from '../constants/actionTypes/chat';
import request from 'superagent';
export function chatError(err) {
  return { type: types.CHAT_ACTION_ERROR, err };
}

export function chatSuccess(res) {
  return { type: types.CHAT_ACTION_SUCCESS, res };
}

export function chat(message) {
  return (dispatch) => {
    dispatch(chatSuccess({ text: message, user: 'user' }));
    request.post(types.WIT_URL)
    .set('Content-Type', 'application/json')
    .send({ 'message': message, 'userId': 3 })
    .end((err, res) => {
      if (err) {
        return dispatch(chatError(err));
      }
      const respon = JSON.parse(res.text);
      const data = {
        text: respon.text,
        user: 'server'
      };
      dispatch(chatSuccess(data));
    });
  };
}
