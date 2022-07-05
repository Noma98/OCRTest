import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { isIphoneX } from 'react-native-iphone-x-helper';

import BlockWrap from '@/components/common/BlockWrap';
import Button from '@/components/common/Button';
import BankAccount from '@/components/StoreMode/Tpoints/BankAccount';

function Account() {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('EditAccount');
  };

  return (
    <BlockWrap style={{ paddingTop: 20 }}>
      <BankAccount />
      <Button
        position="bottom fixed"
        active
        title="변경하기"
        margin={isIphoneX() ? '0 0 -30px 20px' : '0 0 0 20px'}
        onPress={onPress}
      />
    </BlockWrap>
  );
}
export default Account;
