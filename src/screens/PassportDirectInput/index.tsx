import { AxiosError } from 'axios';
import format from 'date-fns/format';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { useMutation } from 'react-query';
import styled from 'styled-components/native';

import { getRefundLimit } from '@/api/refund';
import Button from '@/components/common/Button';
import Form from '@/components/common/Form';
import FormInput from '@/components/common/FormInput';
import InputScrollWrap from '@/components/common/InputScrollWrap';
import TopText from '@/components/common/TopText';
import ErrorController from '@/controllers/ErrorController';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { refundLimitSuccess, updatePassportInfo } from '@/store/modules/refund';
import { IRefundLimitResponse } from '@/types/api/refund';
import { IError } from '@/types/common';
import { PassportDirectInputProps } from '@/types/navigation';
import { IRefundLimitNavigationPayload } from '@/types/refund';
import { IUserInfo } from '@/types/user';

interface IProps {
  navigation: PassportDirectInputProps['navigation'];
  route: PassportDirectInputProps['route'];
}
function PassportDirectInput({ navigation, route }: IProps) {
  const { isConnectedPos } = useAppSelector(
    state => state.user.userInfo,
  ) as IUserInfo;
  const { referrer } = route.params;
  const dispatch = useAppDispatch();
  const formMethods = useForm();
  const { nationality, passportNumber, lastName } = formMethods.watch();
  const today = new Date();

  const isButtonActive = useMemo(
    () =>
      Boolean(nationality?.trim()) &&
      Boolean(passportNumber?.trim()) &&
      Boolean(lastName?.trim()),
    [nationality, passportNumber, lastName],
  );

  const payload = {
    serviceName: 'KTP',
    passportNumber,
    lastName,
    firstName: '',
    nationality,
    totalAmount: '0',
    saleDate: format(today, 'yyyyMMddHHmmss') + today.getMilliseconds(),
  };

  const mutation = useMutation<
    IRefundLimitResponse,
    AxiosError<IError>,
    IRefundLimitNavigationPayload
  >(data => getRefundLimit(data), {
    retry: false,
    onError: error => {
      const response = error.response;
      if (response) {
        const errorController = new ErrorController();
        if (errorController.checkIsRefundError(response.data.message)) {
          Alert.alert(
            'KTP',
            errorController.getRefundAlertMessage(response.data.message),
          );
          return;
        }
      }
      if (response?.data?.code === 'E0001') {
        Alert.alert('KTP', '국적코드와 여권번호가\n일치하지 않습니다.');
      }
    },
    onSuccess: limit => {
      dispatch(updatePassportInfo(payload));
      dispatch(refundLimitSuccess(limit));
      navigation.navigate(
        referrer === 'Approval'
          ? isConnectedPos
            ? 'BarcodeScan'
            : 'PurchaseInfo'
          : 'CancelList',
        {
          payload,
        },
      );
    },
  });

  const onSubmit = () => {
    mutation.mutate(payload);
  };
  const onErrors = (errors: object) => {
    console.warn(errors);
  };
  return (
    <>
      <InputScrollWrap>
        <Container>
          <TopText
            isPadding={false}
            textFirst="고객님의 여권정보를"
            textSecond="입력해주세요"
            isHighlightSecond
          />
          <Form formMethods={formMethods} isVisibleButton={false}>
            <FormInput
              defaultValue=""
              placeholder="ex. KOR"
              maxLength={3}
              name="nationality"
              label="국가코드 / Country code / Issuing country"
              isRequired
              keyboardType="email-address"
              inputMarginBottom={28}
              autoCapitalize="characters"
              rules={{
                required: true,
              }}
            />
            <FormInput
              defaultValue=""
              placeholder="ex. M123A4567"
              name="passportNumber"
              label="여권번호 / Passport No."
              autoCapitalize="characters"
              keyboardType="email-address"
              inputMarginBottom={28}
              isRequired
              rules={{
                required: true,
              }}
            />
            <FormInput
              defaultValue=""
              placeholder="ex. GILSOON"
              name="lastName"
              label="이름 / Given names"
              autoCapitalize="characters"
              keyboardType="email-address"
              isRequired
              rules={{
                required: true,
              }}
            />
          </Form>
        </Container>
      </InputScrollWrap>
      <Button
        active={isButtonActive}
        onPress={formMethods && formMethods.handleSubmit(onSubmit, onErrors)}
        title="다음"
        position="bottom fixed"
        margin="0"
        isPadding
      />
    </>
  );
}

const Container = styled.View`
  padding: 0 20px;
  padding-bottom: 60px;
`;
export default PassportDirectInput;
