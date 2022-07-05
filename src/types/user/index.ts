import { Asset } from 'react-native-image-picker';
import { ISignInResponse } from '@/types/api/user';

export type IFranchiseeApplicantsStatus =
  | 'REAPPLIED'
  | 'REJECTED'
  | 'WAIT'
  | 'ACCEPTED'
  | 'CANCEL'
  | 'INIT';

export type PosType =
  | '사용중인 포스기 선택'
  | '그로잉세일즈'
  | 'OK 포스'
  | '포스뱅크';

export type CategoryType =
  | '판매상품 종목 선택'
  | '의류'
  | '신발'
  | '잡화'
  | '화장품'
  | '가전기기'
  | '전기 • 전자기기'
  | '특산품'
  | '호텔 • 숙박'
  | '의약품'
  | '기타';

export type EmailType =
  | 'naver.com'
  | 'gmail.com'
  | 'daum.net'
  | 'hanmail.net'
  | 'nate.com'
  | '직접입력';

export type TransferDaysType =
  | '출금일 선택'
  | '5일'
  | '10일'
  | '15일'
  | '20일'
  | '25일';

export type BankType =
  | '은행 선택'
  | '농협'
  | '신한은행'
  | '기업은행'
  | '하나은행'
  | '우리은행'
  | '국민은행'
  | 'SC제일은행'
  | '대구은행'
  | '부산은행'
  | '광주은행'
  | '새마을금고'
  | '경남은행'
  | '전북은행'
  | '제주은행'
  | '산업은행'
  | '우체국'
  | '신협'
  | '수협'
  | '한국씨티은행'
  | '키카오뱅크'
  | '토스뱅크'
  | '대신증권'
  | '메리츠증권'
  | '미래에셋증권'
  | '삼성증권'
  | '신한금융투자'
  | 'NH 투자증권'
  | '저축은행'
  | '한국투자증권'
  | 'SK증권';

export type IUserInfo = ISignInResponse;

export interface User {
  isAuth: boolean;
  userInfo: IUserInfo | null;
}

export interface ITerms {
  serviceTerms: boolean;
  personalTerms: boolean;
}

export interface IIamport {
  code: number;
  name: string;
  phoneNumber: string;
}

export interface IBankInfo {
  accountNumber: string;
  bankName: BankType;
  withdrawalDate: TransferDaysType;
}

export interface IFAState {
  isModalVisible: boolean;
  selectedImage: Asset | null;
  selectedBank: BankType;
  accountNumber: string;
  transferDay: TransferDaysType;
  isCMS: boolean;
  isValidAccountNumber: boolean;
  isChanged: boolean;
}
export interface IUserSettingPayload {
  name: string;
  value: boolean;
}
