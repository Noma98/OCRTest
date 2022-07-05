import App from './src/App.tsx';
import {AppRegistry, Vibration} from 'react-native';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {playSound} from '@/utils/common';

//Register background handler (Background,Quit)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage) {
    playSound('push_sound.mp3');
    Vibration.vibrate();
  }
});

AppRegistry.registerComponent(appName, () => App);
