import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components/native';

import Form from '@components/common/Form';
import FormInput from '@components/common/FormInput';
import TopText from '@/components/common/TopText';
import LoadingView from '@/components/common/LoadingView';
import BlockWrap from '@/components/common/BlockWrap';
import SignInButtonGroup from '@/components/SignIn/SignInButtonGroup';
import FlexWrap from '@/components/common/FlexWrap';
import Text from '@/components/common/Text';
import { IError } from '@/types/common';

interface SignInPresenterProps {
  handleSignIn: (data: any) => void;
  error: IError | null;
  formMethods: UseFormReturn<FieldValues>;
  isLoading: boolean;
  mutation: any;
  isFranchisee: boolean;
  setIsFranchisee: Dispatch<SetStateAction<boolean>>;
}

function SignInPresenter({
  handleSignIn,
  error,
  formMethods,
  isLoading,
  mutation,
  isFranchisee,
  setIsFranchisee,
}: SignInPresenterProps) {
  const onReset = () => {
    formMethods.reset();
  };
  const { businessNumber, userId, password } = formMethods.watch();

  useEffect(() => {
    formMethods.reset();
    mutation.reset();
  }, [isFranchisee]);

  return (
    <>
      <BlockWrap>
        <TopText
          textFirst="관리자님"
          textSecond="안녕하세요"
          isHighlightFirst
          isHighlightSecond
          isPadding={false}
        />
        <BtnWrap>
          <StyledBtn
            activeOpacity={0.85}
            active={isFranchisee}
            style={!isFranchisee && { borderRightColor: '#005F83' }}
            onPress={() => setIsFranchisee(true)}>
            <Text
              text="대표자"
              size="18px"
              weight="500"
              color={isFranchisee ? 'white' : '#5F6165'}
            />
          </StyledBtn>
          <StyledBtn
            activeOpacity={0.85}
            active={!isFranchisee}
            style={isFranchisee && { borderLeftColor: '#005F83' }}
            onPress={() => setIsFranchisee(false)}>
            <Text
              text="직원"
              size="18px"
              weight="500"
              color={!isFranchisee ? 'white' : '#5F6165'}
            />
          </StyledBtn>
        </BtnWrap>
        <Form
          formMethods={formMethods}
          onSubmit={handleSignIn}
          buttonTitle="로그인"
          buttonMargin="10px 0 14px"
          isButtonActive={
            isFranchisee
              ? Boolean(businessNumber && password)
              : Boolean(userId && password)
          }>
          <FormInput
            defaultValue=""
            placeholder={
              isFranchisee
                ? '사업자등록번호 (- 없이 숫자만 입력)'
                : '아이디 (6~20자의 영문 또는 숫자)'
            }
            autoCapitalize="none"
            keyboardType={isFranchisee ? 'number-pad' : 'default'}
            returnKeyType="done"
            returnKeyLabel="완료"
            name={isFranchisee ? 'businessNumber' : 'userId'}
            mutation={mutation}
            maxLength={isFranchisee ? 10 : 20}
            backendError={error?.code === 'P0001' ? error.message : undefined}
            rules={
              isFranchisee
                ? {
                    required: '사업자등록번호는 필수 항목입니다.',
                    minLength: {
                      message: '사업자등록번호는 10자리의 숫자로 입력해주세요.',
                      value: 10,
                    },
                    pattern: {
                      value: /[0-9]{10}/g,
                      message: '숫자만 입력해주세요.',
                    },
                  }
                : {
                    required: '아이디는 필수 항목입니다.',
                    pattern: {
                      value: /^[A-Za-z0-9+]{6,20}$/,
                      message:
                        '아이디는 6~20자의 영문 또는 숫자로 입력해주세요.',
                    },
                  }
            }
          />
          <FormInput
            defaultValue=""
            placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자리 이상)"
            name="password"
            backendError={
              error?.code === 'Unknown'
                ? '비밀번호가 일치하지 않습니다. 다시 입력해주세요.'
                : undefined
            }
            mutation={mutation}
            autoCapitalize="none"
            secureTextEntry={true}
            rules={{
              required: '비밀번호는 필수 항목입니다.',
              pattern: {
                message:
                  '비밀번호는 영문, 숫자, 특수문자가 포함된 \n8자리 이상으로 입력해주세요.',
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              },
            }}
          />
        </Form>
        {isFranchisee && <SignInButtonGroup onReset={onReset} />}
      </BlockWrap>
      {isLoading && <LoadingView isOpacity isDark />}
    </>
  );
}
const StyledBtn = styled.TouchableOpacity<{ active: boolean }>`
  background-color: ${props =>
    props.active ? props.theme.colors.main : 'white'};
  border-width: 1px;
  border-bottom-width: 2px;
  border-color: ${props =>
    props.active ? props.theme.colors.main : '#CBCCCE'};
  border-bottom-color: ${props => props.theme.colors.main};
  height: 50px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BtnWrap = styled(FlexWrap)`
  margin-bottom: 24px;
`;
export default SignInPresenter;
