import { createAction, handleActions } from 'redux-actions';
const UPDATE_PASSPORT = 'passport/UPDATE';

export const updatePassport = createAction(UPDATE_PASSPORT);

const initialState = {
  name: '',
  number: '',
  nationality: '',
};

const passport = handleActions(
  {
    [UPDATE_PASSPORT]: (state, action) => {
      return {
        name: action.payload.name,
        number: action.payload.number,
        nationality: action.payload.number,
      };
    },
  },
  initialState,
);
