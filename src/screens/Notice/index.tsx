import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

import { getNoticeList } from '@/api/notice';
import BodyWrap from '@/components/common/BodyWrap';
import DividingLine from '@/components/common/DividingLine';
import LoadingView from '@/components/common/LoadingView';
import Text from '@/components/common/Text';
import NoticeListItem from '@/components/Notice/NoticeListItem';
import { IgetNoticeListResponse } from '@/types/api/notice';
import { IError } from '@/types/common';
import { NoticeScreenProps } from '@/types/navigation';

interface IProps {
  navigation: NoticeScreenProps['navigation'];
}
function Notice({ navigation }: IProps) {
  const { data: noticeList, isLoading } = useQuery<
    IgetNoticeListResponse,
    AxiosError<IError>
  >('noticeList', () => getNoticeList(), {
    retry: false,
  });
  if (isLoading) {
    return <LoadingView isOpacity />;
  }
  return (
    <BodyWrap isPadding={false}>
      {noticeList?.fixedList?.map(item => (
        <NoticeListItem data={item} isFixed navigation={navigation} />
      ))}
      {noticeList?.fixedList.length !== 0 && <DividingLine height="8" />}
      {noticeList?.nonFixedList?.map(item => (
        <NoticeListItem data={item} navigation={navigation} />
      ))}
      {noticeList?.fixedList.length === 0 &&
        noticeList?.nonFixedList.length === 0 && (
          <Text
            text="공지사항이 없습니다."
            marginTop={20}
            center
            color="#9FA1A7"
            size="15px"
          />
        )}
    </BodyWrap>
  );
}

export default Notice;
