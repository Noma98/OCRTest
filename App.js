import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ScanResult from './src/screens/ScanResult.js';
import ScanView from './src/screens/ScanView.js';
import TouchTest from './src/screens/TouchTest.js';

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TouchTest" component={TouchTest} />
        <Stack.Screen name="ScanView" component={ScanView} />
        <Stack.Screen name="ScanResult" component={ScanResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
