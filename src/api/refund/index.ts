import api from '@/api';
import {
  ICustomerRefundListParameter,
  ICustomerRefundListPayload,
  IRefundApprovalPayload,
  IRefundCancelBody,
  IRefundCancelPayload,
  IRefundLimitPayload,
  IRefundLimitResponse,
  IRefundListParams,
  IRefundListPayload,
  IRefundResponse,
} from '@/types/api/refund';
import {
  IRefundItem,
  IRefundItems,
  IRefundLimitNavigationPayload,
} from '@/types/refund';

export const getRefundList = async (data: IRefundListPayload) => {
  const { franchiseeIndex, dateFilter, endDate, startDate } = data;
  const res = await api.getAxios<IRefundItem[], IRefundListParams>(
    `/refunds/franchisee/${franchiseeIndex}`,
    {
      dateFilter,
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    },
  );
  return res.data;
};

export const getCustomerRefundList = async (
  data: ICustomerRefundListParameter,
) => {
  const {
    franchiseeIndex,
    refundCustomerDateRequest,
    refundCustomerInfoRequest,
  } = data;
  const res = await api.postAxios<
    IRefundItems[],
    ICustomerRefundListPayload,
    null
  >(`/refunds/customer/${franchiseeIndex}`, {
    refundCustomerDateRequest,
    refundCustomerInfoRequest,
  });
  return res.data;
};

export const cancelRefund = async ({
  userSelector,
  franchiseeIndex,
  employeeIndex,
  ...body
}: IRefundCancelPayload) => {
  const res = await api.patchAxios<IRefundResponse, null, IRefundCancelBody>(
    `/refund/cancel/${userSelector}/${employeeIndex || franchiseeIndex}`,
    null,
    body,
  );
  return res.data;
};

export const refundApproval = async (payload: IRefundApprovalPayload) => {
  const { userSelector, franchiseeIndex, employeeIndex } = payload;
  const res = await api.postAxios<
    IRefundResponse,
    IRefundApprovalPayload,
    null
  >(
    `/refund/approval/${userSelector}/${employeeIndex || franchiseeIndex}`,
    payload,
  );
  return res.data;
};

export const getRefundLimit = async (
  payload: IRefundLimitNavigationPayload,
) => {
  const {
    serviceName,
    passportNumber,
    lastName,
    nationality,
    totalAmount,
    saleDate,
  } = payload;
  const res = await api.postAxios<
    IRefundLimitResponse,
    IRefundLimitPayload,
    null
  >('/refund/limit', {
    serviceName,
    passportNumber,
    name: lastName,
    nationality,
    totalAmount,
    saleDate,
  });
  return res.data;
};
