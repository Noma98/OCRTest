import React from 'react';
import {View, Text} from 'react-native';

function ScanResult({route}) {
  const {documentNumber, name, nationality} = route.params.result;
  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 24, color: 'black'}}>
        Document Number: {documentNumber}
      </Text>
      <Text style={{fontSize: 24, color: 'black'}}>
        Nationality: {nationality}
      </Text>
      <Text style={{fontSize: 24, color: 'black'}}>Name: {name}</Text>
    </View>
  );
}

export default ScanResult;
