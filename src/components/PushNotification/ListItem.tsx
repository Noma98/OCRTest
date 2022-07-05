import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled, { css } from 'styled-components/native';

import { updatePushIsRead } from '@/api/push';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import { useAppSelector } from '@/hooks/useReduxHooks';
import { IError } from '@/types/common';
import { IUserInfo } from '@/types/user';
import { getTimeFromNow } from '@/utils/format';
import { getPushCallback } from '@/utils/pushNotification';

interface IData {
  title: string;
  body: string;
  createdDate: string;
  isRead: boolean;
  isDetail: boolean;
  id: number;
  pushCategory: string;
  noticeIndex?: number;
}
interface IProps {
  data: IData;
  isScroll: boolean;
}

function ListItem({
  data: {
    body,
    createdDate,
    title,
    isRead,
    isDetail,
    id: pushIndex,
    pushCategory,
    noticeIndex,
  },
  isScroll,
}: IProps) {
  const queryClient = useQueryClient();
  const { franchiseeIndex } = useAppSelector(
    state => state.user.userInfo,
  ) as IUserInfo;

  const mutation = useMutation<number, AxiosError<IError>, number>(
    payload => updatePushIsRead(payload),
    {
      retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries(['pushLists', franchiseeIndex]);
        queryClient.invalidateQueries(['unreadAlertCount', franchiseeIndex]);
      },
    },
  );
  const onPress = () => {
    !isRead && mutation.mutate(pushIndex);
    !isScroll && getPushCallback(pushCategory, createdDate, noticeIndex)();
  };
  return (
    <StyledContainer
      onPressOut={onPress}
      disabled={['7', '13', '14'].includes(pushCategory)}
      isRead={isRead}
      activeOpacity={0.85}>
      <Text text={title} size="18px" margin={[0, 0, 4]} />
      <CommentWrap>
        <Text
          text={body}
          color="#5F6165"
          margin={[0, 0, 12]}
          style={{ flex: 9 }}
        />
        {isDetail && (
          <StyledIcon
            source={require('/assets/icons/VatReport/chevron_right_black.png')}
          />
        )}
      </CommentWrap>
      <Text text={getTimeFromNow(createdDate)} size="14px" color="#9FA1A7" />
    </StyledContainer>
  );
}
const CommentWrap = styled(FlexWrap)`
  justify-content: space-between;
`;
const StyledIcon = styled.Image`
  width: 24px;
  height: 24px;
`;
const StyledContainer = styled.TouchableOpacity<{ isRead: boolean }>`
  ${props =>
    !props.isRead &&
    css`
      background-color: rgba(0, 95, 131, 0.1);
    `}
  padding: 16px 20px;
`;
export default ListItem;
