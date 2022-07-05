import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import { useFlipper } from '@react-navigation/devtools';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Linking, StatusBar } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';

import { CodepushProvider } from '@/components/context/CodepushProvider';
import { navigationRef } from '@/routes/common/RootNavigation';
import Gate from '@/routes/Gate';
import store, { persistor } from '@/store';
import { theme } from '@/styles/theme';
import { lconfig } from '@/utils/common';

LocaleConfig.locales.kr = lconfig;
LocaleConfig.defaultLocale = 'kr';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

const deepLinksConf = {
  screens: {
    // FranchiseeApplication: 'franchisee/application',
    // StoreMode: {
    //   initialRouteName: 'Tpoint',
    //   screens: {
    //     SalesAnalysis: 'sales/analysis',
    //     Tpoint: 'tpoint',
    //     MyPage: 'mypage',
    //   },
    // },
    // PushNotificationDetail: {
    //   path: 'notification/detail/:pushIndex/:pushCategory',
    //   parse: {
    //     pushIndex: pushIndex => Number(pushIndex),
    //     pushCategory: pushCategory => Number(pushCategory),
    //   },
    // },
    // FranchiseeReApplication: 'franchisee/reapplication',
    // RequestWithdrawal: 'withdrawal/:tpoint',
    // SalesStatistics: 'sales/statistics',
    // VatReport: 'vat/report',
    PushNotification: 'notification',
  },
};

const linking = {
  prefixes: ['ktp://'], // 'https://app.ktp.com'
  config: deepLinksConf,
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }

    //Check if there is a initial firebase notification
    const message = await messaging().getInitialNotification();

    //Get the 'url' property from the notification which coreesponds to a screen
    //This property needs to be set on the notification payload when sending it
    return message?.notification.url;
  },
  subscribe(listener) {
    console.log('Linking subscribe to', listener);
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    //Listen to incoming links from deep linking
    Linking.addEventListener('url', onReceiveURL);

    //Listen to firebase push notifications
    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      message => {
        const url = message?.data?.link; //message.notification.url
        if (url) {
          //Any custom logic to check whether the URL needs to be handled

          //Call the listener to let React Navigation handle the URL
          listener(url);
        }
      },
    );
    return () => {
      //clean up the event listeners
      Linking.removeEventListener('url', onReceiveURL);
      unsubscribeNotification();
    };
  },
};

const App = () => {
  useFlipper(navigationRef);
  const netInfo = useNetInfo();
  const [network, setNetwork] = useState(netInfo.isConnected);
  const [isModal, setIsModal] = useState(false);
  const firstRenderRef = useRef(1);
  const alertUntilNetworkIsConnected = (message: string) => {
    Alert.alert('KTP', message, [
      {
        text: '다시 시도',
        onPress: () => {
          NetInfo.refresh().then(state => {
            if (state.isConnected) {
              if (firstRenderRef.current !== 1) {
                setIsModal(false);
                return;
              }
              setNetwork(true);
              firstRenderRef.current = 2;
            } else {
              alertUntilNetworkIsConnected(message);
            }
          });
        },
      },
    ]);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === false && firstRenderRef.current === 1) {
      setNetwork(false);
      alertUntilNetworkIsConnected(
        `인터넷이 연결되지 않았습니다.\nWi-fi 또는 데이터를 활성화한 후\n다시 시도해주세요.`,
      );
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (
        firstRenderRef.current !== 1 &&
        state.isConnected === false &&
        !isModal
      ) {
        setIsModal(true);
        alertUntilNetworkIsConnected(
          `인터넷 연결 상태를 확인한 후\n다시 시도해주세요.`,
        );
      }
    });
    return () => unsubscribe();
  }, [isModal]);

  if (network === false) {
    return <></>;
  }
  return (
    <CodepushProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <NavigationContainer
            linking={linking}
            theme={{
              ...DefaultTheme,
              colors: {
                background: 'white',
              },
            }}
            ref={navigationRef}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <StatusBar barStyle="dark-content" />
                <Gate firstRenderRef={firstRenderRef} />
              </PersistGate>
            </Provider>
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </CodepushProvider>
  );
};

export default App;
