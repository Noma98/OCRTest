import { ITPoint } from '@/types/point';
import { SalesAnalysisPeriodType } from '@/types/refund';
import { IFranchiseeApplicantsStatus } from '@/types/user';

/**
 * index: sales/#1
 * URL: GET /sales/franchisee/${franchiseeIndex}?dateFilter=${period}
 * Request Parameter: period
 * API name: SalesAnalysis (가맹점의 매출 분석 리스트)
 * @returns ISalesAnalysis[]
 */

export interface ISalesAnalysisPayload {
  franchiseeIndex: number;
  period: SalesAnalysisPeriodType;
}

/**
 * index: sales/#2
 * URL: GET /sales/statistics/${franchiseeIndex}
 * Request Parameter: startDate, endDate
 * API name: 매출통계 - 기본 조회
 */

export interface ISalesStatisticsParams {
  targetDate: string;
  dateSelector: 'MONTH' | 'YEAR' | 'ALL';
}
export interface ISalesStatisticsPayload extends ISalesStatisticsParams {
  franchiseeIndex: number;
}
export interface ISalesStatisticsResponse {
  totalAmount: string;
  totalCount: string;
  totalRefund: string;
  totalCancel: string;
  totalActualAmount: string;
}
/**
 * index: sales/#3
 * URL: GET /sales/statistics/detail/${franchiseeIndex}
 * Request Parameter: startDate, endDate, dateSelector
 * API name: 매출통계 - 비교 조회
 */

export interface ISalesComparisionParams {
  startDate: string;
  endDate: string;
  dateSelector: 'YEAR' | 'MONTH' | 'ALL';
}
export interface ISalesComparisionPayload extends ISalesComparisionParams {
  franchiseeIndex: number;
}
export interface ISalesComparisionResponse {
  saleStatisticsCurrentResponse: ISalesStatisticsResponse;
  saleStatisticsPreviousResponse: ISalesStatisticsResponse;
}

/**
 * index: points/#1
 * URL: GET /points/franchisee/${franchiseeIndex}?week=${week}&month=${month}&page=${page}&size=${size}
 * Request Parameter: week, month, page, size
 * API name: Tpoing List (가맹점의 포인트 내역 조회)
 */
export interface ITpointListParams {
  week: number;
  month: number;
  page: number;
  size: number;
}

export interface ITpointListPayload extends ITpointListParams {
  franchiseeIndex: number;
}

export interface ITpointListResponse {
  startDate: string;
  endDate: string;
  pointInfoList: ITPoint[];
}

/**
 * index: points/#2
 * URL: GET /points/franchisee/${franchiseeIndex}/total
 * API name: Tpoint (가맹점 포인트 합계 조회)
 */
export interface ITPointInfoResponse {
  totalPoint: string;
  scheduledPoint: string;
  disappearPoint: string;
}
export interface ITPointInfoPayload {
  franchiseeIndex: number;
}
/**
 * index: points/#3
 * URL: POST /points/franchisee/${franchiseeIndex}
 * API name: Tpoint (포인트 출금)
 */
export interface IWithdrawalResponse {
  restPoint: string;
  amount: string;
  bankName: string;
  accountNumber: string;
}
export interface IWithdrawalPayload extends IWithdrawalBody {
  franchiseeIndex: number;
}
export interface IWithdrawalBody {
  amount: string;
}

/**
 * index: franchisee/#1
 * URL: GET /franchisee/${franchiseeIndex}
 * API name: Franchisee Info (가맹점 마이페이지 정보 조회)
 */
export interface IFranchiseeInfoResponse {
  sellerName: string;
  storeTel: string;
  businessNumber: string;
  email: string;
  storeName: string;
  signboard: string;
  storeAddressBasic: string;
  storeAddressDetail: string;
  storeAddressNumber: string;
  productCategory: string;
  storeNumber: string;
  createdDate: string;
  totalSalesAmount: number;
  totalPoint: number;
  franchiseeStatus: IFranchiseeApplicantsStatus;
}

/**
 * index: franchisee/#2
 * URL: PATCH /franchisee/${franchiseeIndex}
 * API name: Update Franchisee Info (가맹점 정보수정)
 */
export interface IUpdateFranchiseeInfo {
  storeNumber: string;
  email: string;
}

export interface IUpdateFranchiseeInfoPayload {
  storeNumber: string;
  email: string;
  franchiseeIndex: number;
}
