import { IError } from '@/types/common/index';
import { IPassportInfo } from '@/types/passport';

export type RefundStatusType = 'APPROVAL' | 'CANCEL' | 'REJECT';
export type SalesAnalysisPeriodType = 'TODAY' | 'WEEK' | 'MONTH' | 'CUSTOM';

export interface IRefundState {
  inquiryInfo: IRefundLimit | null;
  passportInfo: IPassportInfo | null;
  status: RefundStatusType;
  error: IError | null;
}

export interface Refund {
  originPrice: string;
  refundPrice: string;
  paymentPrice: string;
}

export interface RefundInquiry {
  userIndex: number | null;
  refundResponse: {
    responseCode: string | null;
    message: string | null;
    purchaseSequenceNumber: string | null;
    takeoutNumber: string | null;
    beforeDeduction: string | null;
    afterDeduction: string | null;
  };
}

export interface IRefundLimit {
  responseCode: string | null;
  message: string | null;
  purchaseSequenceNumber: string | null;
  takeoutNumber: string | null;
  beforeDeduction: string | null;
  afterDeduction: string | null;
}

export interface IFilterOptions {
  isLatest: boolean;
  isMonthly: boolean;
  startDate: string;
  endDate: string;
}
export interface ICustomerRefundState {
  modalVisible: boolean;
  filterVisible: boolean;
  filterOptions: IFilterOptions;
  selected: null | IRefundItem;
}
export interface IRefundItems {
  date: string;
  dataList: IRefundItem;
}
export interface IRefundItem {
  createdDate: string;
  formatDate: string;
  orderNumber: string;
  refundIndex: string;
  totalRefund: string;
  totalAmount: string;
  refundStatus: RefundStatusType;
}

export interface IRefundDetail {
  createdDate: string;
  orderNumber: string;
  totalRefund: string;
  totalAmount: string;
}

export interface ISalesAnalysis {
  actualAmount: string;
  date: string;
  saleCount: number;
  cancelCount: number;
  totalAmount: string;
  totalRefund: string;
}

export interface IRefundLimitNavigationPayload {
  serviceName: string;
  passportNumber: string;
  lastName: string;
  firstName: string;
  nationality: string;
  totalAmount: string;
  saleDate: string;
}
