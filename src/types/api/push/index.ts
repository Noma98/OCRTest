interface IPush {
  id: number;
  pushCategory: string;
  title: string;
  body: string;
  createdDate: string;
  isRead: boolean;
  isDetail: boolean;
  noticeIndex: number;
}
export interface IPushListsResponse {
  pushLists: Array<IPush>;
}
export interface IPushListsPayload {
  franchiseeIndex: number;
}

export interface IUnreadAlermCountResponse {
  count: number;
}
