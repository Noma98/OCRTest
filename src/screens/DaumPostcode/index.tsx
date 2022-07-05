import Postcode from '@actbase/react-daum-postcode';
import { OnCompleteParams } from '@actbase/react-daum-postcode/lib/types';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { useAppDispatch } from '@/hooks/useReduxHooks';
import { updateAuth } from '@/store/modules/auth';
import { getScreenSize } from '@/utils/common';

const { width, height } = getScreenSize();

function DaumPostcode() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onSelected = (data: OnCompleteParams) => {
    const { zonecode, jibunAddress, roadAddress, userSelectedType } = data;

    dispatch(
      updateAuth({
        storeAddressNumber: zonecode,
        storeAddressBasic:
          userSelectedType === 'R' ? roadAddress : jibunAddress,
      }),
    );

    navigation.goBack();
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <Postcode
      style={{ width, height }}
      onSelected={onSelected}
      onError={onError}
    />
  );
}

export default DaumPostcode;
