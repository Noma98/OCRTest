import {
  IRefundDetail,
  IRefundLimitNavigationPayload,
  Refund,
} from '@/types/refund';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { ISalesComparisionResponse } from '@/types/api/store';
import { IEmployee } from '@/types/api/user';
import { IWithdrawalResponse } from '@/types/api/store';

export type TabNavigationParamList = {
  SalesAnalysis: undefined;
  Tpoint: undefined;
  MyPage: undefined;
};

export type MyPageScreenProps = BottomTabScreenProps<
  TabNavigationParamList,
  'MyPage'
>;

export type ReferrerType = 'Cancel' | 'Detail';

export type MainStackNavigationParamList = {
  SelectMode: { referrer?: 'POS'; isConnectedPos?: boolean };
  ScanMode: {
    referrer: 'Approval' | 'Cancel';
    isConnectedPos: boolean;
    isActiveVibration: boolean;
    isActiveSound: boolean;
  };
  PushNotification: undefined;
  PushNotificationDetail: { pushCategory: string; createdDate: string };
  RefundInquiry: {
    payload: IRefundLimitNavigationPayload;
  };
  PurchaseInfo: undefined;
  RefundResult: {
    data: Refund;
  };
  CancelResult: {
    refund: IRefundDetail;
    referrer: ReferrerType;
  };
  CancelList: {
    payload: IRefundLimitNavigationPayload;
  };
  StoreMode: undefined;
  RefundStatus: { saleDate: string };
  RefundDetail: {
    refund: IRefundDetail;
    referrer: ReferrerType;
  };
  BarcodeScan: {
    payload: IRefundLimitNavigationPayload;
  };
  Setting: undefined;
  NotificationSettings: { pushState: boolean };
  RequestWithdrawal: { tpoint: number };
  WithdrawalResult: { data: IWithdrawalResponse };
  SalesStatistics: undefined;
  SalesStatisticsDetail: {
    dateSelector: 'YEAR' | 'MONTH' | 'ALL';
    suffix: '원' | '건';
    currDate: Date;
    data: ISalesComparisionResponse;
  };
  Profile: undefined;
  EditProfile: undefined;
  FranchiseeApplication: undefined;
  FranchiseeReApplication: undefined;
  Terms: { type: TermsType };
  RejectedFranchisee: undefined;
  ConnectPos: undefined;
  EditAccount: undefined;
  Account: undefined;
  EmployeeAccount: undefined;
  AddEmployee: undefined;
  UpdateEmployee: { data: IEmployee };
  Notice: undefined;
  NoticeDetail: { noticeIndex: number };
  CustomerService: undefined;
  EnterCurrentPwd: undefined;
  ResetPasswordInside: undefined;
  VatReport: undefined;
  VatReportDetail: { periodNum: string; franchiseeIndex: number };
  PassportDirectInput: { referrer: 'Approval' | 'Cancel' };
  CMSReport: undefined;
  CMSReportDetail: { periodNum: string; franchiseeIndex: number };
};

export type NoticeScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'Notice'
>;
export type NoticeDetailScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'NoticeDetail'
>;
export type NotificationSettingsScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'NotificationSettings'
>;
export type BarcodeScanScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'BarcodeScan'
>;
export type ConnectPosScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'ConnectPos'
>;
export type PushNotificationScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'PushNotification'
>;
export type PushNotificationDetailScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'PushNotificationDetail'
>;
export type WithdrawalResultScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'WithdrawalResult'
>;
export type RequestWithdrawalScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'RequestWithdrawal'
>;
export type UpdateEmployeeScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'UpdateEmployee'
>;
export type AddEmployeeScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'AddEmployee'
>;
export type EmployeeAccountScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'EmployeeAccount'
>;

export type SalesStatisticsScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'SalesStatistics'
>;
export type SalesStatisticsDetailScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'SalesStatisticsDetail'
>;
export type CMSReportScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'CMSReport'
>;
export type CMSReportDetailScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'CMSReportDetail'
>;
export type PassportDirectInputProps = StackScreenProps<
  MainStackNavigationParamList,
  'PassportDirectInput'
>;

export type VatReportScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'VatReport'
>;

export type VatReportDetailScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'VatReportDetail'
>;
export type RefundInquiryScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'RefundInquiry'
>;

export type StoreModeScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'StoreMode'
>;

export type SettingScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'Setting'
>;

export type SelectModeScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'SelectMode'
>;

export type ScanModeScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'ScanMode'
>;

export type RefundStatusScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'RefundStatus'
>;

export type RefundDetailScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'RefundDetail'
>;

export type CancelResultScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'CancelResult'
>;

export type CancelListScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'CancelList'
>;

export type PurchaseInfoScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'PurchaseInfo'
>;

export type RefundResultScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'RefundResult'
>;

export type EnterCurrentPwdScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'EnterCurrentPwd'
>;
export type ResetPasswordInsideScreenProps = StackScreenProps<
  MainStackNavigationParamList,
  'ResetPasswordInside'
>;

export type TermsType =
  | 'PERSONAL_TYPE'
  | 'SERVICE_TYPE'
  | 'CMS_TYPE'
  | 'POINT_TYPE';

export type AuthStackNavigationParamList = {
  WalkThrough: { referrer?: 'SIGNOUT' };
  SignIn: undefined;
  SignUp: undefined;
  StepTwo: undefined;
  StepThree: undefined;
  Postcode: undefined;
  Terms: { type: TermsType };
  EnterBusinessNumber: undefined;
  MobileCertification: { businessNumber: string };
  Vertification: {
    headerTitle: string;
    businessNumber?: string;
  };
  ResetPasswordOutside: {
    businessNumber: string | undefined;
  };
};
export type WalkThroughScreenProps = StackScreenProps<
  AuthStackNavigationParamList,
  'WalkThrough'
>;
export type ResetPasswordOutsideScreenProps = StackScreenProps<
  AuthStackNavigationParamList,
  'ResetPasswordOutside'
>;
export type MobileCertificationScreenProps = StackScreenProps<
  AuthStackNavigationParamList,
  'MobileCertification'
>;
export type EnterBusinessNumberScreenProps = StackScreenProps<
  AuthStackNavigationParamList,
  'EnterBusinessNumber'
>;
export type TermsScreenProps = StackScreenProps<
  AuthStackNavigationParamList,
  'Terms'
>;

export type IMPScreenProps = StackScreenProps<
  AuthStackNavigationParamList,
  'Vertification'
>;

export type SignUpScreenProps = StackScreenProps<
  AuthStackNavigationParamList,
  'SignUp'
>;
