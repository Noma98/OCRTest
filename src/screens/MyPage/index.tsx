import { useIsFocused } from '@react-navigation/core';
import React from 'react';
import { useQuery } from 'react-query';

import { getFranchiseeInfo } from '@/api/store';
import LoadingView from '@/components/common/LoadingView';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import MyPagePresenter from '@/screens/MyPage/Presenter';
import { updateFranchiseeStatusSuccess } from '@/store/modules/user';
import { IUserInfo } from '@/types/user';

function MyPageContainer() {
  const { franchiseeIndex } = useAppSelector(
    state => state.user.userInfo as IUserInfo,
  );
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { isLoading, data } = useQuery(
    ['franchiseeInfo', isFocused],
    () => getFranchiseeInfo(franchiseeIndex),
    {
      retry: false,
      onSuccess: responseData => {
        dispatch(
          updateFranchiseeStatusSuccess({
            franchiseeStatus: responseData.franchiseeStatus,
          }),
        );
      },
    },
  );

  if (!data) {
    return <LoadingView isOpacity />;
  }

  return (
    <>
      <MyPagePresenter info={data} />
      {isLoading && <LoadingView isOpacity />}
    </>
  );
}

export default MyPageContainer;
