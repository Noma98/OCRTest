import {
  CategoryType,
  IBankInfo,
  IFranchiseeApplicantsStatus,
  PosType,
} from '@/types/user';
import { RefundStatusType } from '@/types/refund';

/**
 * index: franchisee/#2
 * URL: POST /sign-in
 * API name: Sign In (로그인)
 */
export interface ISignInPayload {
  businessNumber?: string;
  userId?: string;
  password: string;
  userSelector: 'FRANCHISEE' | 'EMPLOYEE';
  pushToken: string;
}

export interface ISignInResponse {
  userSelector: 'FRANCHISEE' | 'EMPLOYEE';
  franchiseeIndex: number;
  businessNumber: string | null;
  franchiseeStatus: IFranchiseeApplicantsStatus;
  rejectReason: string | null;
  signUpDate: string | null;
  popUp: boolean;
  employeeIndex: number | null;
  userId: string | null;
  name: string | null;
  registeredDate: string | null;
  accessToken: string;
  refreshToken: string;
  isActiveSound: boolean;
  isActiveVibration: boolean;
  storeName: string;
  isConnectedPos: boolean;
  posType: PosType;
}

/**
 * index: franchisee/#3
 * URL: GET /franchisee/${franchiseeIndex}
 * Request Parameter: franchiseeIndex
 * API name: Franchisee Detail (가맹점 마이페이지 조회)
 */
export interface IFranchiseeDetailResponse {
  storeName: string;
  createdDate: string;
  totalSalesAmount: number;
  totalPoint: number;
}

/**
 * index: franchisee/#4
 * URL: GET /franchisee/${franchiseeIndex}/refunds
 * Request Parameter: franchiseeIndex
 * API name: Franchisee Refunds (가맹점 환급 리스트 조회)
 */
export interface IFranchiseeDetailResponse {
  refundIndex: number;
  orderNumber: string;
  createdDate: string;
  totalAmount: string;
  totalRefund: string;
  refundStatus: RefundStatusType;
}

/**
 * index: franchisee/#5
 * URL: POST /franchisee-applicants/${businessNumber}
 * Request Parameter: businessNumber
 * API name: Franchisee Refunds (가맹점 재신청)
 */
export interface IFranchiseeApplicantsResponse {
  franchiseeApplicantIndex: number;
  franchiseeStatus: IFranchiseeApplicantsStatus;
  rejectReason: string;
  memberName: string;
  businessNumber: string;
  storeName: string;
  storeAddress: string;
  sellerName: string;
  storeTel: string;
  productCategory: CategoryType;
}

/**
 * index: franchisee/#7
 * URL: GET /franchisee-applicants/${franchiseeApplicantIndex}
 * Request Parameter: franchiseeApplicantIndex
 * API name: Find Status (가맹점 신청 상태 조회)
 */
export interface IFranchiseeStatusPayload {
  franchiseeIndex: number;
}

export interface IFranchiseeStatusResponse {
  franchiseeStatus: IFranchiseeApplicantsStatus;
}

/**
 * index: franchisee/#8
 * URL: POST /franchiseeUpload/${franchiseeIndex}
 * Request Parameter: franchiseeIndex
 * API name: Apply Franchisee (가맹점 신청)
 */
export interface IApplyFranchiseePayload {
  franchiseeIndex: number;
  formData: FormData;
  isReApply: boolean;
}

export interface IApplyFranchiseeResponse {
  s3Path: string;
}

export interface IReApplyFranchiseeResponse {
  message: string;
}
/**
 * index: franchisee/#9
 * URL: GET /franchisee/bank/${franchiseeIndex}
 * Request Parameter: franchiseeIndex
 * API name: Find Bank Info (가맹점 계좌 정보 조회)
 */
export interface IFranchiseeAccountResponse {
  accountNumber: string;
  bankName: string;
  withdrawalDate: string;
  sellerName: string;
}

/**
 * index: franchisee/#10
 * URL: PATCH /franchisee/bank/${franchiseeIndex}
 * Request Parameter: franchiseeIndex
 * API name: Update Bank Info (가맹점 계좌 정보 수정)
 */
export interface IUpdateFranchiseeAccountPayload {
  accountNumber: string;
  bankName: string;
  withdrawalDate: string;
  franchiseeIndex: number;
}

/**
 * index: franchisee/#11
 * URL: GET /franchisee/{franchiseeIndex}/vat
 * Request Parameter: requestDate
 * API name: Find Vat Info(판매내역 기본조회)
 */
export interface IVatReportResponse {
  totalCount: string;
  totalAmount: string;
  franchiseeIndex: number;
  totalSupply: string;
  totalVat: string;
}
export interface IVatReportParams {
  requestDate: string;
}
export interface IvatReportPayload extends IVatReportParams {
  franchiseeIndex: number;
}
/**
 * index: franchisee/#12
 * URL: GET /franchisee/{franchiseeIndex}/vat/detail
 * Request Parameter: requestDate
 * API name: Find Vat Detail Info(판매내역 상세조회)
 */
export interface IVatReportDetailResponse {
  vatDetailResponsePersonalInfo: string[];
  vatDetailResponseTotalInfo: string[];
  vatDetailResponseDetailInfoList: string[][];
}
/**
 * index: franchisee/#13
 * URL: GET /franchisee/password/equals/{franchiseeIndex}
 * Request Parameter: password
 * API name: 비밀번호 재설정 - 패스워드가 로그인 중인 가맹점의 패스워드와 일치하는지 -
 */

export interface IValidPwdParams {
  password: string;
}
export interface IValidPwdPayload extends IValidPwdParams {
  franchiseeIndex: number;
}
/**
 * index: franchisee/#14
 * URL: GET /franchisee/password/in/{franchiseeIndex}
 * Request Parameter: newPassword, newPasswordCheck
 * API name: 비밀번호 재설정 - 패스워드 재설정 -
 */

export interface IUpdatePwdInsideParams {
  newPassword: string;
  newPasswordCheck: string;
}
export interface IUpdatePwdInsidePayload extends IUpdatePwdInsideParams {
  franchiseeIndex: number;
}
/**
 * index: franchisee/#15
 * URL: GET /franchisee/password/exists/{businessNumber}
 * Request Parameter: name, phoneNumber
 * API name: 비밀번호 재설정[1] - 존재하는 사업자번호인지 여부 -
 */
export interface ICheckBNumExistsPayload {
  businessNumber: string;
}

/**
 * index: franchisee/#16
 * URL: GET /franchisee/password/selfCertification/{businessNumber}
 * API name: 비밀번호 재설정[2] - 본인 인증 일치 여부 -
 */
export interface ICheckIsOwnerParams {
  name: string;
  phoneNumber: string;
}
export interface ICheckIsOwnerPayload extends ICheckIsOwnerParams {
  businessNumber: string | undefined;
}

/**
 * index: franchisee/#17
 * URL: PATCH /franchisee/password/out/{businessNumber}
 * API name: 비밀번호 재설정[3] - 비밀번호 재설정 -
 */

export interface IUpdatePwdOutsideBody {
  newPassword: string;
  newPasswordCheck: string;
}
export interface IUpdatePwdOutsidePayload extends IUpdatePwdOutsideBody {
  businessNumber: string | undefined;
}

/**
 * index: franchisee/#18
 * URL: PATCH /franchisee/{franchiseeIndex}/cms
 * Request Parameter: requestDate
 * API name: CMS 청구내역 기본조회
 */

export interface IGetCMSReportParams {
  requestDate: string;
}
export interface IGetCMSReportPayload extends IGetCMSReportParams {
  franchiseeIndex: number;
}
export interface IGetCMSReportResponse {
  totalAmount: string;
  totalCount: string;
  totalVat: string;
  totalCommision: string;
}
/**
 * index: franchisee/#19
 * URL: PATCH /franchisee/{franchiseeIndex}/cms/detail
 * Request Parameter: requestDate
 * API name: CMS 청구내역 상세조회
 */

export interface IGetCMSReportDetailParams extends IGetCMSReportParams {
  requestDate: string;
}
export interface IGetCMSReportDetailPayload extends IGetCMSReportDetailParams {
  franchiseeIndex: number;
}
export interface IGetCMSReportDetailResponse {
  commissionInfoList: string[];
  customerInfoList: string[];
}
/**
 * index: franchisee/#20
 * URL: PATCH /franchisee/{franchiseeIndex}/settings
 * Request Parameter: name,value
 * API name: 소리, 진동 상태 업데이트
 */
export interface IUpdateUserSettingsPayload {
  name: string;
  value: boolean;
  franchiseeIndex: number;
  employeeIndex: number | null;
  settingSelector: 'SOUND' | 'VIBRATION';
}
export interface IUpdateUserSettingsBody {
  isActiveSound?: boolean;
  isActiveVibration?: boolean;
  settingSelector: 'SOUND' | 'VIBRATION';
}
export interface IUpdateUserSettingResponse {
  message: string;
}

/**
 * index: franchiseeUpload/#1
 * URL: GET /franchisee-applicants/reapply/{franchiseeIndex}
 * Request Parameter: franchiseeIndex
 * API name: Find Application Info (가맹점 재신청 기존 정보 조회)
 */
export interface IReApplicationInfoResponse {
  uploadImage: string;
  franchiseeBankInfo: IBankInfo;
}
/**
 * index: employee/#1
 * URL: GET /employee/{franchiseeIndex}
 * Request Parameter: franchiseeIndex
 * API name: 직원 조회
 */

export interface IEmployee {
  employeeIndex: number;
  name: string;
  userId: string;
}
export type IEmployeeAccountResponse = Array<IEmployee>;

export interface IEmployeeAccountPayload {
  franchiseeIndex: number;
}
/**
 * index: employee/#2
 * URL: GET /validate/employee/{franchiseeIndex}/{userId}
 * API name: 직원 중복 조회
 */
export interface IValidateUserIdPayload {
  userId: string;
}
/**
 * index: employee/#3
 * URL: POST /employee/{franchiseeIndex}
 * Request Parameter: franchiseeIndex
 * API name: 직원 등록
 */

export interface IAddEmployeeBody {
  name: string;
  userId: string;
  password: string;
  passwordCheck: string;
}
export interface IAddEmployeePayload extends IAddEmployeeBody {
  franchiseeIndex: number;
}

/**
 * index: employee/#4
 * URL: PATCH /employee
 * API name: 직원 계정 수정
 */
export interface IUpdateEmployeeBody {
  name: string;
  password: string;
  passwordCheck: string;
}
export interface IUpdateEmployeePayload extends IUpdateEmployeeBody {
  employeeIndex: number;
}

/**
 * index: employee/#5
 * URL: POST /employee
 * API name: 직원 계정 삭제
 */

export interface IDeleteEmployeePayload {
  employeeIndexList: Number[];
}
