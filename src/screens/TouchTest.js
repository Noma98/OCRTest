import React from 'react';
import {Alert, Button, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
