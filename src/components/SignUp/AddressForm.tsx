import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { Input } from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useAppSelector } from '@/hooks/useReduxHooks';

const AddressWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin: 0 0 10px;
`;

const InputWrapper = styled.View`
  flex: 1;
`;

interface IProps {
  storeAddressDetail: string;
  onChange: (
    name: 'storeName' | 'signboard' | 'storeAddressDetail',
    value: string,
  ) => void;
}

function AddressForm({ storeAddressDetail, onChange }: IProps) {
  const navigation = useNavigation();
  const { storeAddressBasic } = useAppSelector(state => state.auth);

  const onPress = () => {
    navigation.navigate('Postcode');
  };

  const onChangeAddressDetail = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const value = e.nativeEvent.text;

    onChange('storeAddressDetail', value);
  };

  return (
    <>
      <AddressWrapper>
        <InputWrapper>
          <Input
            isRequired
            label="사업장 주소"
            placeholder="사업장 주소"
            defaultValue=""
            inputMarginBottom={0}
            editable={false}
            value={storeAddressBasic}
            onPressOut={onPress}
          />
        </InputWrapper>
        <Button
          title="주소찾기"
          active
          onPress={onPress}
          fontSize="16px"
          style={{ width: 87 }}
          margin="0 0 0 8px"
        />
      </AddressWrapper>
      <Input
        placeholder="상세 주소 입력"
        defaultValue=""
        inputMarginBottom={28}
        value={storeAddressDetail}
        onChange={onChangeAddressDetail}
        returnKeyType="done"
        autoCapitalize="none"
      />
    </>
  );
}

export default AddressForm;
