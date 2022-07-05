import { combineReducers } from 'redux';

import refund from '@/store/modules/refund';
import auth from '@/store/modules/auth';
import user from '@/store/modules/user';

const rootReducer = combineReducers({ user, refund, auth });
export default rootReducer;
