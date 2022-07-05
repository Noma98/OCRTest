import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { Input } from '@/components/common/Input';
import { StyledText } from '@/components/common/Text';

interface IProps {
  storeName: string;
  signboard: string;
  onChange: (
    name: 'storeName' | 'signboard' | 'storeAddressDetail',
    value: string,
  ) => void;
}

function NameForm(props: IProps) {
  const { storeName, signboard, onChange } = props;

  const onChangeStoreName = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = e.nativeEvent.text;

    onChange('storeName', value);
  };

  const onChangeSignboard = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = e.nativeEvent.text;

    onChange('signboard', value);
  };

  return (
    <>
      <Input
        isRequired
        defaultValue=""
        placeholder="상호명 입력"
        label="상호(법인명)"
        inputMarginBottom={28}
        value={storeName}
        onChange={onChangeStoreName}
        returnKeyType="done"
        autoCapitalize="none"
      />
      <Input
        defaultValue=""
        placeholder="간판명 입력"
        label="간판명"
        inputMarginBottom={12}
        value={signboard}
        onChange={onChangeSignboard}
        returnKeyType="done"
        autoCapitalize="none"
      />
      <StyledText marginBottom={28} size="14px" lineHeight={22}>
        • 간판명은 상호명과 다른 경우에 입력해주세요.
      </StyledText>
    </>
  );
}

export default NameForm;
