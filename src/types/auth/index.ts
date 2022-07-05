import { CategoryType, EmailType } from '../user';

export interface IImpInfo {
  sellerName: string;
  storeTel: string;
}

export interface IAuth extends IImpInfo {
  businessNumber: string;
  storeName: string;
  storeAddressNumber: string;
  storeAddressBasic: string;
  storeAddressDetail: string;
  productCategory: CategoryType;
  password: string;
  confirmPassword: string;
  email: string;
  category: EmailType;
  suffix: string;
  isValidBussinessNumber: boolean;
}

export interface IStepTwoFormValues {
  businessNumber: string;
  email: string;
  password: string;
  confirmPasswrord: string;
}
