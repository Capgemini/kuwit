import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerStateReducer as router } from 'redux-router';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  router,
  chatReducer,
  form: formReducer
});

export default rootReducer;
