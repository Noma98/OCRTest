import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { useMutation } from 'react-query';

import { signIn } from '@/api/user';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import AsyncStorageService from '@/models/asyncStorageService';
import SignInPresenter from '@/screens/SignIn/Presenter';
import { signInSuccess, updateFirstRender } from '@/store/modules/user';
import { ISignInPayload, ISignInResponse } from '@/types/api/user';
import { IError } from '@/types/common';
import { attachedHyphens } from '@/utils/format';
import { getFcmToken } from '@/utils/pushNotification';

interface IFormValues {
  userId?: string;
  businessNumber?: string;
  password: string;
  pushToken: string;
}

function SignInContainer() {
  const formMethods = useForm();
  const dispatch = useAppDispatch();
  const [isFranchisee, setIsFranchisee] = useState<boolean>(true);
  const { firstRender } = useAppSelector(state => state.user);

  const mutation = useMutation<
    ISignInResponse,
    AxiosError<IError>,
    ISignInPayload
  >(payload => signIn(payload), {
    retry: false,
    onSuccess: async data => {
      const { accessToken } = data;
      axios.defaults.headers.common.Authorization = accessToken;
      await AsyncStorageService.getService().setStorageTokenInfo(data);
      dispatch(signInSuccess(data));
    },
  });

  // # input validation에서 Error가 확인될 경우 onSubmit 함수가 호출되지 않음
  const onSubmit = useCallback(
    async (data: IFormValues) => {
      Keyboard.dismiss();
      const pushToken = await getFcmToken();
      mutation.mutate({
        ...(isFranchisee
          ? {
              businessNumber: attachedHyphens(data.businessNumber),
            }
          : { userId: data.userId }),
        userSelector: isFranchisee ? 'FRANCHISEE' : 'EMPLOYEE',
        password: data.password,
        pushToken,
      });
    },
    [mutation, isFranchisee],
  );
  useEffect(() => {
    firstRender && dispatch(updateFirstRender());
  }, []);

  return (
    <SignInPresenter
      handleSignIn={onSubmit}
      error={mutation.error?.response?.data || null}
      formMethods={formMethods}
      isLoading={mutation.isLoading}
      mutation={mutation}
      isFranchisee={isFranchisee}
      setIsFranchisee={setIsFranchisee}
    />
  );
}

export default SignInContainer;
