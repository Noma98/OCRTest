import { IAuth, IImpInfo } from '@/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuth = {
  businessNumber: '',
  storeName: '',
  storeAddressNumber: '',
  storeAddressBasic: '',
  storeAddressDetail: '',
  sellerName: '',
  storeTel: '',
  productCategory: '판매상품 종목 선택',
  password: '',
  confirmPassword: '',
  email: '',
  category: 'naver.com',
  suffix: '',
  isValidBussinessNumber: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateImpInfo(state, action: PayloadAction<IImpInfo>) {
      state.sellerName = action.payload.sellerName;
      state.storeTel = action.payload.storeTel;
    },
    updateAuth(state, action: PayloadAction<any>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetStepTwo(state) {
      state.sellerName = '';
      state.storeTel = '';
      state.password = '';
      state.confirmPassword = '';
      state.email = '';
      state.category = 'naver.com';
      state.suffix = '';
      state.businessNumber = '';
      state.isValidBussinessNumber = false;
    },
    resetStepThree(state) {
      state.storeAddressNumber = '';
      state.storeAddressBasic = '';
    },
    resetAuth() {
      return initialState;
    },
  },
});

export const {
  updateImpInfo,
  updateAuth,
  resetStepTwo,
  resetStepThree,
  resetAuth,
} = authSlice.actions;
export default authSlice.reducer;
