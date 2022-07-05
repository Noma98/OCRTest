export interface NoticeListType {
  noticeIndex: number;
  title: string;
  createdDate: string;
  scheduledDate: string;
  isInvisible: boolean;
}
export interface IgetNoticeListResponse {
  nonFixedList: NoticeListType[];
  fixedList: NoticeListType[];
}
export type LinkType =
  | 'NONE'
  | 'PERSONAL_TYPE'
  | 'SERVICE_TYPE'
  | 'CMS_TYPE'
  | 'POINT_TYPE';
export interface IGetNoticeDetailResponse {
  isFixed: boolean;
  isImmediate: boolean;
  createdDate: string;
  scheduledDate: string;
  title: string;
  subTitle1: string;
  subTitle2: string;
  subTitle3: string;
  content1: string;
  content2: string;
  content3: string;
  link: LinkType;
  isInvisible: boolean;
  mainImg: string;
  subImg1: string;
  subImg2: string;
  subImg3: string;
}
