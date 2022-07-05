import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFranchiseeApplicantsResponse,
  IFranchiseeStatusResponse,
  ISignInResponse,
} from '@/types/api/user';
import { IUserSettingPayload } from '@/types/user';
import { IUpdatePosInfoBody } from '@/types/api/pos';

const initialState = {
  userInfo: null,
  isAuth: false,
  firstRender: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess(state, action: PayloadAction<ISignInResponse>) {
      state.isAuth = true;
      state.userInfo = action.payload;
    },
    signOutSuccess(state) {
      state.userInfo = null;
      state.isAuth = false;
    },
    updateFranchiseeSuccess(
      state,
      action: PayloadAction<IFranchiseeApplicantsResponse>,
    ) {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          franchiseeStatus: action.payload.franchiseeStatus,
        };
      }
    },
    updateFranchiseeStatusSuccess(
      state,
      action: PayloadAction<IFranchiseeStatusResponse>,
    ) {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          franchiseeStatus: action.payload.franchiseeStatus,
        };
      }
    },
    updateFAPopUpState(state) {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          popUp: false,
        };
      }
    },
    updateUserSetting(state, action: PayloadAction<IUserSettingPayload>) {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          [action.payload.name]: action.payload.value,
        };
      }
    },
    updateUserPosInfo(state, action: PayloadAction<IUpdatePosInfoBody>) {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
    updateFirstRender(state) {
      state.firstRender = false;
    },
  },
});

export const {
  signInSuccess,
  signOutSuccess,
  updateFranchiseeSuccess,
  updateFranchiseeStatusSuccess,
  updateFAPopUpState,
  updateUserSetting,
  updateUserPosInfo,
  updateFirstRender,
} = userSlice.actions;
export default userSlice.reducer;
