/**
 * index: auth/#1
 * URL: POST /sign-up
 * API name: Sign Up (회원가입)
 */
export interface ISignUpPayload {
  pushToken: string;
  sellerName: string;
  storeTel: string;
  businessNumber: string;
  email: string;
  password: string;
  storeName: string;
  signboard: string;
  storeAddressNumber: string;
  storeAddressBasic: string;
  storeAddressDetail: string;
  productCategory: string;
  storeNumber: string;
  isTaxRefundShop: 'Y' | 'N';
}

/**
 * index: auth/#1
 * URL: POST | http://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${serviceKey}
 * API name: 공공데이터포털 사업자등록정보 상태조회 서비스 API
 */
export interface ICheckBNumberPayload {
  b_no: string[];
}

/**
 * b_no: 사업자등록번호
 * b_stt: 납세자상태 (명칭)
 * b_stt_cd: 납세자상태 (코드)
 * tax_type: 과세유형메세지 (명칭)
 * tax_type_cd: 과세유형메세지 (코드)
 * end_dt: 폐업일
 * utcc_yn: 단위과세전환폐업여부 (Y, N)
 * tax_type_change_dt: 최근과세유형전환일자 (YYYYMMDD 포맷)
 * invoice_apply_dt: 세금계산서적용일자 (YYYYMMDD 포맷)
 */

interface IResponseData {
  b_no: string;
  b_stt: string;
  b_stt_cd: string;
  tax_type: string;
  tax_type_cd: string;
  end_dt: string;
  utcc_yn: string;
  tax_type_change_dt: string;
  invoice_apply_dt: string;
}

/**
 * status_code: API 상태 코드
 * match_cnt: 조회 매칭 수
 * request_cnt: 조회 요청 수
 * data:
 */
export interface ICheckBNumberResponse {
  status_code: string;
  match_cnt: number;
  request_cnt: number;
  data: IResponseData[];
}
