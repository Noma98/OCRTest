import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';

import { getPushLists } from '@/api/push';
import BodyWrap from '@/components/common/BodyWrap';
import Text from '@/components/common/Text';
import ListItem from '@/components/PushNotification/ListItem';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IPushListsResponse } from '@/types/api/push';
import { IError } from '@/types/common';

function PushNotification() {
  const { franchiseeIndex } = useAppSelector(state => state.user.userInfo);
  const { data: pushLists } = useQuery<IPushListsResponse, AxiosError<IError>>(
    ['pushLists', franchiseeIndex],
    () => getPushLists(franchiseeIndex),
    {
      retry: false,
    },
  );
  const [isScroll, setIsScroll] = useState(false);
  const onScrollStart = () => {
    setIsScroll(true);
  };
  const onScrollEnd = () => {
    setIsScroll(false);
  };
  return (
    <BodyWrap
      isPadding={false}
      onScrollStart={onScrollStart}
      onScrollEnd={onScrollEnd}>
      <Lists>
        {pushLists?.length === 0 && (
          <Text
            text="받은 알림이 없습니다."
            color="#9FA1A7"
            size="15px"
            center
            marginTop={28}
          />
        )}
        {pushLists?.map((item, idx) => (
          <ListItem key={idx} data={item} isScroll={isScroll} />
        ))}
      </Lists>
    </BodyWrap>
  );
}
const Lists = styled.View``;
export default PushNotification;
