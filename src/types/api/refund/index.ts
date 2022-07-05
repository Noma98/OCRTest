import { SalesAnalysisPeriodType } from '@/types/refund';

/**
 * common
 */
export interface IRefundResponse {
  responseCode: string;
  message: string | null;
  purchaseSequenceNumber: string | null;
  takeoutNumber: string | null;
  beforeDeduction: string | null;
  afterDeduction: string | null;
}

/**
 * index: refund/#1
 * URL: POST /refund/limit
 * API name: Refund Limit (한도 조회)
 */
export interface IRefundLimitPayload {
  serviceName: string;
  passportNumber: string;
  name: string;
  nationality: string;
  totalAmount: string;
  saleDate: string;
}

export interface IRefundLimitResponse extends IRefundResponse {
  customerIndex: number;
}

/**
 * index: refund/#2
 * URL: POST /refund/approval
 * API name: Refund Approval (환급 승인)
 */
export interface IRefundApprovalPayload {
  franchiseeIndex?: number;
  employeeIndex?: number;
  userSelector: 'EMPLOYEE' | 'FRANCHISEE';
  customerIndex: number;
  price: string;
}

/**
 * index: refund/#3
 * URL: PATCH /refund/cancel?customerIndex=${customerIndex}&refundIndex=${refundIndex}
 * Request Parameter: customerIndex, refundIndex
 * API name: Refund Cancel (환급 취소)
 */
export interface IRefundCancelPayload extends IRefundCancelBody {
  userSelector: 'FRANCHISEE' | 'EMPLOYEE';
  franchiseeIndex?: number;
  employeeIndex?: number;
}
export interface IRefundCancelBody {
  customerIndex: number;
  refundIndex: number;
}

/**
 * index: refund/#4
 * URL: GET /refunds/franchisee/${franchiseeIndex}?startDate=${startDate}&endDate=${endDate}&dateFilter=${filterType}
 * Request Parameter: startDate, endDate, filterType
 * API name: Refund List (환급 리스트 조회)
 */
export interface IRefundListPayload {
  franchiseeIndex: number;
  startDate?: string;
  endDate?: string;
  dateFilter: SalesAnalysisPeriodType;
}

export interface IRefundListParams {
  startDate?: string;
  endDate?: string;
  dateFilter: SalesAnalysisPeriodType;
}

/**
 * index: refund/#5
 * URL: POST /refunds/customer/{franchiseeIndex}
 * Body: refundCustomerDateRequest, refundCustomerInfoRequest
 * API name: Customer Refund List (특정 고객의 환급 리스트 조회)
 */

interface IRefundCustomerDateRequest {
  orderCheck: 'ASC' | 'DESC';
  startDate: string;
  endDate: string;
}
interface IRefundCustomerInfoRequest {
  name: string;
  nationality: string;
  passportNumber: string;
}
export interface ICustomerRefundListParameter
  extends ICustomerRefundListPayload {
  franchiseeIndex: number;
}

export interface ICustomerRefundListPayload {
  refundCustomerDateRequest: IRefundCustomerDateRequest;
  refundCustomerInfoRequest: IRefundCustomerInfoRequest;
}
