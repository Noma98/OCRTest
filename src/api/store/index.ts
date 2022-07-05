import api from '@/api';
import {
  IFranchiseeInfoResponse,
  ISalesAnalysisPayload,
  ISalesComparisionParams,
  ISalesComparisionPayload,
  ISalesComparisionResponse,
  ISalesStatisticsParams,
  ISalesStatisticsPayload,
  ISalesStatisticsResponse,
  ITPointInfoPayload,
  ITPointInfoResponse,
  ITpointListParams,
  ITpointListPayload,
  ITpointListResponse,
  IWithdrawalBody,
  IWithdrawalPayload,
  IWithdrawalResponse,
} from '@/types/api/store';
import { ISalesAnalysis } from '@/types/refund';

export const getSalesInfo = async ({
  franchiseeIndex,
  period,
}: ISalesAnalysisPayload) => {
  const res = await api.getAxios<ISalesAnalysis[], null>(
    `/sales/franchisee/${franchiseeIndex}?dateFilter=${period}`,
  );
  return res.data;
};

export const getSalesStatisticsInfo = async ({
  franchiseeIndex,
  ...rest
}: ISalesStatisticsPayload) => {
  const res = await api.getAxios<
    ISalesStatisticsResponse,
    ISalesStatisticsParams
  >(`sales/statistics/${franchiseeIndex}`, rest);
  return res.data;
};

export const getSalesComparison = async ({
  franchiseeIndex,
  ...rest
}: ISalesComparisionPayload) => {
  const res = await api.getAxios<
    ISalesComparisionResponse,
    ISalesComparisionParams
  >(`sales/statistics/detail/${franchiseeIndex}`, rest);
  return res.data;
};

export const getFranchiseeInfo = async (franchiseeIndex: number) => {
  const res = await api.getAxios<IFranchiseeInfoResponse, null>(
    `/franchisee/${franchiseeIndex}`,
  );
  return res.data;
};

export const getTpointList = async (payload: ITpointListPayload) => {
  const { franchiseeIndex, month, page, size, week } = payload;

  const res = await api.getAxios<ITpointListResponse, ITpointListParams>(
    `/points/franchisee/${franchiseeIndex}?week=${week}&month=${month}&page=${page}&size=${size}`,
  );
  return res.data;
};

export const getTpointInfo = async ({
  franchiseeIndex,
}: ITPointInfoPayload) => {
  const res = await api.getAxios<ITPointInfoResponse, null>(
    `/points/franchisee/${franchiseeIndex}/total`,
  );
  return res.data;
};
export const withdrawalPoint = async ({
  franchiseeIndex,
  ...rest
}: IWithdrawalPayload) => {
  const res = await api.postAxios<IWithdrawalResponse, IWithdrawalBody, null>(
    `/points/franchisee/${franchiseeIndex}`,
    rest,
    null,
  );
  return res.data;
};
