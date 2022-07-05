import api from '@/api';
import { IUpdatePosInfoBody, IUpdatePosInfoPayload } from '@/types/api/pos';
import {
  IGetBarcodeBody,
  IGetBarcodePayload,
  IGetBarcodeResponse,
  IGetRefundResultResponse,
} from './../../types/api/pos/index';

export const updatePosInfo = async ({
  franchiseeIndex,
  isConnectedPos,
  posType,
}: IUpdatePosInfoPayload) => {
  const res = await api.patchAxios<number, IUpdatePosInfoBody, null>(
    `/pos/${franchiseeIndex}`,
    { isConnectedPos, posType },
  );
  return res.data;
};

export const createBarcode = async ({
  franchiseeIndex,
  ...body
}: IGetBarcodePayload) => {
  const res = await api.postAxios<IGetBarcodeResponse, IGetBarcodeBody, null>(
    `/pos/refund/limit/${franchiseeIndex}`,
    { ...body },
    null,
  );
  return res.data;
};

export const getRefundResult = async (externalRefundIndex: number) => {
  const res = await api.getAxios<IGetRefundResultResponse, null>(
    `/external/refund/result/${externalRefundIndex}`,
  );
  return res.data;
};
