import { Refund } from '@/types/refund';
import { PosType } from '@/types/user';

export interface IUpdatePosInfoBody {
  isConnectedPos: boolean;
  posType: PosType;
}
export interface IUpdatePosInfoPayload extends IUpdatePosInfoBody {
  franchiseeIndex: number;
}
export interface IGetBarcodePayload extends IGetBarcodeBody {
  franchiseeIndex: number;
}
export interface IGetBarcodeBody {
  name: string;
  passportNumber: string;
  nationality: string;
  totalAmount: string;
  saleDate: string;
}
export interface IGetBarcodeResponse {
  externalRefundIndex: number;
  s3Path: string;
}
export interface IGetRefundResultResponse {
  type: 'SUCCESS' | 'FAIL';
  refundData: Refund;
}
