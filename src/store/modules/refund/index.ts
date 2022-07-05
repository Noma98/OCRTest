import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IRefundCancelPayload,
  IRefundLimitResponse,
  IRefundResponse,
} from '@/types/api/refund';
import { IError } from '@/types/common';
import { IRefundLimitNavigationPayload, IRefundState } from '@/types/refund';

const initialState: IRefundState = {
  inquiryInfo: null,
  passportInfo: null,
  status: 'idle',
  error: null,
};

const refundSlice = createSlice({
  name: 'refund',
  initialState,
  reducers: {
    updatePassportInfo(
      state,
      action: PayloadAction<IRefundLimitNavigationPayload>,
    ) {
      state.passportInfo = action.payload;
    },
    refundLimitSuccess(state, action: PayloadAction<IRefundLimitResponse>) {
      state.inquiryInfo = action.payload;
    },
    refundApprovalSuccess(state, action: PayloadAction<IRefundResponse>) {
      state.inquiryInfo = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refundCancel(state, action: PayloadAction<IRefundCancelPayload>) {
      state.status = 'loading';
    },
    refundCancelSuccess(state, action: PayloadAction<IRefundResponse>) {
      state.status = 'success';
      state.inquiryInfo = action.payload;
    },
    refundFailed(state, action: PayloadAction<IError>) {
      state.status = 'error';
      state.error = action.payload;
    },
    passportUpdate(state, action: PayloadAction<any>) {
      state.passportInfo = action.payload;
    },
  },
});

export const {
  passportUpdate,
  updatePassportInfo,
  refundLimitSuccess,
  refundApprovalSuccess,
  refundCancel,
  refundCancelSuccess,
  refundFailed,
} = refundSlice.actions;
export default refundSlice.reducer;
