import { AxiosError } from 'axios';
import React from 'react';
import {
  Alert,
  Keyboard,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components/native';

import { checkBusinessNumber, checkDuplication } from '@/api/auth';
import { Input } from '@/components/common/Input';
import Button from '@/components/common/Button';
import { StyledText } from '@/components/common/Text';
import { ICheckBNumberPayload, ICheckBNumberResponse } from '@/types/api/auth';
import { IError } from '@/types/common';

const BussinessNumberWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const InputWrapper = styled.View`
  flex: 1;
`;

interface IProps {
  onChangeBNumber: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  businessNumber: string;
  isValidBussinessNumber: boolean;
  onSetIsValidBNumber: () => void;
}

function BusinessNumberForm(props: IProps) {
  const {
    onChangeBNumber,
    businessNumber,
    isValidBussinessNumber,
    onSetIsValidBNumber,
  } = props;

  const mutation = useMutation<
    ICheckBNumberResponse,
    AxiosError<IError>,
    ICheckBNumberPayload
  >(payload => checkBusinessNumber(payload), {
    retry: false,
    onSuccess: response => {
      if (!response.match_cnt) {
        Alert.alert(
          'KTP',
          '등록되지 않은 사업자등록번호입니다.\n다시 입력해주세요.',
        );
        return;
      }
      if (response.data[0].b_stt === '휴업자') {
        Alert.alert(
          'KTP',
          '휴업 상태 사업자의 사업자등록번호이므로,\nKTP 이용 대상자가 아닙니다.',
        );
        return;
      }
      if (response.data[0].b_stt === '폐업자') {
        Alert.alert(
          'KTP',
          '폐업 상태 사업자의 사업자등록번호이므로,\nKTP 이용 대상자가 아닙니다.',
        );
        return;
      }
      if (response.data[0].tax_type !== '부가가치세 일반과세자') {
        Alert.alert(
          'KTP',
          '일반과세자가 아닌 사업자이므로, \nKTP 이용 대상자가 아닙니다.\n자세한 사항은 고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)',
        );
        return;
      }
      onSetIsValidBNumber();
      Keyboard.dismiss();
    },
  });
  const { refetch } = useQuery<number, AxiosError<IError>>(
    ['isNotDuplicated', businessNumber],
    () => checkDuplication(businessNumber),
    {
      enabled: false,
      retry: false,
      onError: error => {
        error.response &&
          Alert.alert('KTP', '이미 가입된 사업자등록번호입니다.', [
            { text: '확인' },
          ]);
      },
      onSuccess: statusCode => {
        statusCode === 200 &&
          mutation.mutate({
            b_no: [businessNumber],
          });
      },
    },
  );

  const onValidationBNumber = async () => {
    if (!businessNumber.trim()) {
      Alert.alert('KTP', '사업자등록번호를 입력한 후\n인증요청 해주세요.');
      return;
    }
    refetch();
  };

  return (
    <>
      <BussinessNumberWrapper>
        <InputWrapper>
          <Input
            isRequired
            label="사업자등록번호"
            placeholder="- 없이 숫자만 입력"
            defaultValue=""
            maxLength={10}
            onChange={onChangeBNumber}
            value={businessNumber}
            inputMarginBottom={0}
            keyboardType="number-pad"
            returnKeyType="done"
          />
        </InputWrapper>
        <Button
          title="인증요청"
          active={!isValidBussinessNumber}
          onPress={onValidationBNumber}
          fontSize="16px"
          style={{ width: 87 }}
          margin="0 0 0 8px"
        />
      </BussinessNumberWrapper>
      {isValidBussinessNumber && (
        <StyledText size="14px" marginTop={12} lineHeight={22} color="#005F83">
          인증되었습니다.
        </StyledText>
      )}
      <StyledText size="14px" marginBottom={28} marginTop={12} lineHeight={22}>
        • 간이과세자는 KTP 이용대상자가 아닙니다.
      </StyledText>
    </>
  );
}

export default BusinessNumberForm;
