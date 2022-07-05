import React from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import styled from 'styled-components/native';

import Button from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import SelectCategory from '@/components/common/SelectCategory';
import { StyledText } from '@/components/common/Text';
import { bankList, transferDays } from '@/constants/franchiseeApplication';
import { IFAState } from '@/screens/FranchiseeApplication';
import { BankType, TransferDaysType } from '@/types/user';

type ActionType = 'SET_VALUE';
interface IAction {
  type: ActionType;
  payload?: any;
}

const Container = styled.View`
  margin: 0 20px 30px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin: 0 0 10px;
`;

const InputWrapper = styled.View`
  flex: 1;
  margin: 10px 0 0;
`;

interface IProps {
  state: IFAState;
  dispatch: React.Dispatch<IAction>;
  isUpdate?: boolean;
}

function AccountInfoForm(props: IProps) {
  const { state, dispatch, isUpdate = false } = props;
  const { accountNumber, transferDay, selectedBank, isValidAccountNumber } =
    state;

  const onChangeBank = (value: BankType) => {
    dispatch({ type: 'SET_VALUE', payload: { name: 'selectedBank', value } });
  };

  const onChangeANumber = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = e.nativeEvent.text;

    dispatch({ type: 'SET_VALUE', payload: { name: 'accountNumber', value } });
  };

  const onChangeTransferDay = (value: TransferDaysType) => {
    dispatch({ type: 'SET_VALUE', payload: { name: 'transferDay', value } });
  };

  // 계좌 유효성 검사 버튼 클릭 핸들러
  const onPress = () => {
    if (selectedBank === '은행 선택') {
      Alert.alert('KTP', '은행을 선택해주세요.');
      return;
    }
    if (!accountNumber.trim()) {
      Alert.alert('KTP', '계좌번호를 입력해주세요.');
      return;
    }

    // #TODO: 계좌 유효성 검사 요청 로직
    // dispatch({
    //   type: 'SET_VALUE',
    //   payload: { name: 'isValidAccountNumber', value: true },
    // });
  };

  return (
    <Container>
      <SelectCategory
        category={selectedBank}
        isSelected={selectedBank !== '은행 선택'}
        onCategoryChange={onChangeBank}
        isRequired
        label="계좌번호"
        itemList={bankList}
      />
      <Wrapper>
        <InputWrapper>
          <Input
            placeholder="- 없이 숫자만 입력"
            defaultValue=""
            onChange={onChangeANumber}
            value={accountNumber}
            inputMarginBottom={0}
            keyboardType="number-pad"
            returnKeyType="done"
          />
        </InputWrapper>
        <Button
          title="인증요청"
          activeOpacity={1}
          active={!isValidAccountNumber}
          onPress={onPress}
          fontSize="16px"
          style={{ width: 87 }}
          margin="0 0 0 8px"
        />
      </Wrapper>
      {isValidAccountNumber && (
        <StyledText marginBottom={10} lineHeight={18} color="#005F83">
          인증되었습니다.
        </StyledText>
      )}
      <StyledText size="14px" lineHeight={22} marginBottom={isUpdate ? 8 : 28}>
        • 예금주명은 대표자명과 동일해야합니다.
      </StyledText>
      {isUpdate && (
        <StyledText size="14px" lineHeight={22} marginBottom={28}>
          • 변경된 계좌는 다음 달부터 적용됩니다.
        </StyledText>
      )}
      <SelectCategory
        category={transferDay}
        isSelected={transferDay !== '출금일 선택'}
        onCategoryChange={onChangeTransferDay}
        isRequired
        label="자동이체 출금일"
        itemList={transferDays}
      />
      {isUpdate && (
        <StyledText size="14px" lineHeight={22} marginTop={12}>
          • 변경된 출금일은 다음 달부터 적용됩니다.
        </StyledText>
      )}
    </Container>
  );
}

export default AccountInfoForm;
