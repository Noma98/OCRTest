import React from 'react';
import {Button, View} from 'react-native';

function TouchTest({navigation}) {
  return (
    <View>
      <Button
        title="스캔하기"
        onPress={() => navigation.navigate('ScanView')}
      />
    </View>
  );
}

export default TouchTest;
