import { IUpdateUserSettingResponse } from './../../types/api/user/index';
import api from '@/api';
import {
  IUpdateFranchiseeInfo,
  IUpdateFranchiseeInfoPayload,
} from '@/types/api/store';
import {
  IApplyFranchiseePayload,
  IApplyFranchiseeResponse,
  IFranchiseeAccountResponse,
  IFranchiseeApplicantsResponse,
  IFranchiseeStatusResponse,
  ISignInPayload,
  ISignInResponse,
  IUpdateFranchiseeAccountPayload,
  IReApplicationInfoResponse,
  IReApplyFranchiseeResponse,
  IvatReportPayload,
  IVatReportResponse,
  IVatReportParams,
  IValidPwdPayload,
  IValidPwdParams,
  IUpdatePwdInsideParams,
  IUpdatePwdInsidePayload,
  ICheckBNumExistsPayload,
  ICheckIsOwnerPayload,
  ICheckIsOwnerParams,
  IUpdatePwdOutsidePayload,
  IUpdatePwdOutsideBody,
  IGetCMSReportPayload,
  IGetCMSReportResponse,
  IGetCMSReportParams,
  IGetCMSReportDetailPayload,
  IGetCMSReportDetailResponse,
  IGetCMSReportDetailParams,
  IEmployeeAccountPayload,
  IEmployeeAccountResponse,
  IAddEmployeePayload,
  IAddEmployeeBody,
  IValidateUserIdPayload,
  IDeleteEmployeePayload,
  IUpdateEmployeePayload,
  IUpdateUserSettingsPayload,
  IUpdateUserSettingsBody,
} from '@/types/api/user';

export const updateFranchiseeInfo = async (
  payload: IUpdateFranchiseeInfoPayload,
) => {
  const { franchiseeIndex, ...rest } = payload;
  const res = await api.patchAxios<
    IUpdateFranchiseeInfo,
    IUpdateFranchiseeInfo,
    null
  >(`/franchisee/${franchiseeIndex}`, rest);
  return res.data;
};

export const updateFranchiseeSettings = async ({
  name,
  value,
  franchiseeIndex,
  employeeIndex,
  settingSelector,
}: IUpdateUserSettingsPayload) => {
  const res = await api.patchAxios<
    IUpdateUserSettingResponse,
    IUpdateUserSettingsBody,
    null
  >(
    `/${
      employeeIndex
        ? `employee/${employeeIndex}`
        : `franchisee/${franchiseeIndex}`
    }/settings`,
    {
      [name]: value,
      settingSelector,
    },
  );
  return res.data;
};

export const getFranchiseeStatus = async (franchiseeIndex: number) => {
  const res = await api.getAxios<IFranchiseeStatusResponse, null>(
    `/franchisee-applicants/${franchiseeIndex}`,
  );
  return res.data;
};

export const reApplyFranchiseeApplicant = async (businessNumber: string) => {
  const res = await api.postAxios<IFranchiseeApplicantsResponse, null, null>(
    `/franchisee-applicants/${businessNumber}`,
    null,
  );
  return res.data;
};

export const signIn = async (payload: ISignInPayload) => {
  const res = await api.postAxios<ISignInResponse, ISignInPayload, null>(
    '/sign-in',
    payload,
  );
  return res.data;
};

export const signOut = async (payload: ISignInResponse) => {
  const res = await api.deleteAxios<void, ISignInResponse, null>(
    '/sign-out',
    payload,
  );
  return res.status;
};

export const applyFranchisee = async (payload: IApplyFranchiseePayload) => {
  const { formData, franchiseeIndex, isReApply } = payload;
  if (isReApply) {
    const res = await api.patchAxios<
      IReApplyFranchiseeResponse,
      FormData,
      null
    >(`/franchiseeUpload/${franchiseeIndex}`, formData);
    return res.status;
  } else {
    const res = await api.postAxios<IApplyFranchiseeResponse, FormData, null>(
      `/franchiseeUpload/${franchiseeIndex}`,
      formData,
    );
    return res.status;
  }
};

export const getReApplicationInfo = async (franchiseeIndex: number) => {
  const res = await api.getAxios<IReApplicationInfoResponse, null>(
    `/franchisee-applicants/reapply/${franchiseeIndex}`,
  );
  return res.data;
};
export const getFranchiseeAccount = async (franchiseeIndex: number) => {
  const res = await api.getAxios<IFranchiseeAccountResponse, null>(
    `/franchisee/bank/${franchiseeIndex}`,
  );

  return res.data;
};

export const updateFranchiseeAccount = async (
  payload: IUpdateFranchiseeAccountPayload,
) => {
  const { franchiseeIndex, ...rest } = payload;
  const res = await api.patchAxios<
    IFranchiseeAccountResponse,
    IFranchiseeAccountResponse,
    null
  >(`/franchisee/bank/${franchiseeIndex}`, rest);

  return res.data;
};

export const updateFAPopupState = async (franchiseeIndex: number) => {
  const res = await api.patchAxios<void, null, null>(
    `/franchisee/${franchiseeIndex}/popUp`,
  );
  return res.status;
};

export const getVatReportList = async (payload: IvatReportPayload) => {
  const { franchiseeIndex, ...rest } = payload;
  const res = await api.getAxios<IVatReportResponse, IVatReportParams>(
    `franchisee/${franchiseeIndex}/vat`,
    rest,
  );
  return res.data;
};
export const getVatDetailLists = async ({
  franchiseeIndex,
  ...rest
}: IvatReportPayload) => {
  const res = await api.getAxios<any, IVatReportParams>(
    `franchisee/${franchiseeIndex}/vat/detail`,
    rest,
  );
  return res.data;
};
export const getIsValidPwd = async (payload: IValidPwdPayload) => {
  const { franchiseeIndex, password } = payload;
  const res = await api.getAxios<number, IValidPwdParams>(
    `franchisee/password/equals/${franchiseeIndex}`,
    { password },
  );
  return res.status;
};
export const updatePasswordInside = async (
  payload: IUpdatePwdInsidePayload,
) => {
  const { franchiseeIndex, ...rest } = payload;
  const res = await api.patchAxios<number, IUpdatePwdInsideParams, null>(
    `franchisee/password/in/${franchiseeIndex}`,
    rest,
  );
  return res.status;
};

export const checkBNumExists = async ({
  businessNumber,
}: ICheckBNumExistsPayload) => {
  const res = await api.getAxios<number, null>(
    `franchisee/password/exists/${businessNumber}`,
  );
  return res.status;
};

export const checkIsOwner = async ({
  businessNumber,
  ...rest
}: ICheckIsOwnerPayload) => {
  const res = await api.getAxios<number, ICheckIsOwnerParams>(
    `franchisee/password/selfCertification/${businessNumber}`,
    rest,
  );
  return res.status;
};
export const updatePasswordOutside = async ({
  businessNumber,
  ...rest
}: IUpdatePwdOutsidePayload) => {
  const res = await api.patchAxios<number, IUpdatePwdOutsideBody, null>(
    `franchisee/password/out/${businessNumber}`,
    rest,
  );
  return res.status;
};
export const getCMSReport = async ({
  franchiseeIndex,
  ...rest
}: IGetCMSReportPayload) => {
  const res = await api.getAxios<IGetCMSReportResponse, IGetCMSReportParams>(
    `franchisee/${franchiseeIndex}/cms`,
    rest,
  );
  return res.data;
};
export const getCMSReportDetail = async ({
  franchiseeIndex,
  ...rest
}: IGetCMSReportDetailPayload) => {
  const res = await api.getAxios<
    IGetCMSReportDetailResponse,
    IGetCMSReportDetailParams
  >(`franchisee/${franchiseeIndex}/cms/detail`, rest);
  return res.data;
};
export const getEmployeeList = async ({
  franchiseeIndex,
}: IEmployeeAccountPayload) => {
  const res = await api.getAxios<IEmployeeAccountResponse, null>(
    `employee/${franchiseeIndex}`,
  );
  return res.data;
};
export const validateUserId = async ({ userId }: IValidateUserIdPayload) => {
  const res = await api.getAxios<number, null>(`validate/employee/${userId}`);
  return res.status;
};
export const addEmployee = async ({
  franchiseeIndex,
  ...rest
}: IAddEmployeePayload) => {
  const res = await api.postAxios<void, IAddEmployeeBody, null>(
    `employee/${franchiseeIndex}`,
    rest,
  );
  return res.status;
};
export const updateEmployee = async ({
  employeeIndex,
  ...rest
}: IUpdateEmployeePayload) => {
  const res = await api.patchAxios<void, IUpdateEmployeePayload, null>(
    `employee/${employeeIndex}`,
    rest,
  );
  return res.status;
};

export const deleteEmployee = async (payload: IDeleteEmployeePayload) => {
  const res = await api.deleteAxios<void, IDeleteEmployeePayload, null>(
    `employee`,
    payload,
  );
  return res.status;
};
