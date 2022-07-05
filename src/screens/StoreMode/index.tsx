import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import activePoint from '@/assets/icons/Market/activePoint.png';
import activeStatistics from '@/assets/icons/Market/activeStatistics.png';
import activeUser from '@/assets/icons/Market/activeUser.png';
import point from '@/assets/icons/Market/point.png';
import statistics from '@/assets/icons/Market/statistics.png';
import user from '@/assets/icons/Market/user.png';
import {
  HomeBtn,
  HomeWithSalesStatistics,
  HomeWithSettingBtn,
} from '@/components/Header';
import BackButton from '@/components/StoreMode/Tpoints/BackButton';
import MyPage from '@/screens/MyPage';
import SalesAnalysis from '@/screens/SalesAnalysis';
import Tpoint from '@/screens/Tpoint';
import { TabNavigationParamList } from '@/types/navigation';
import getHeaderTitle from '@/utils/getHeaderTitle';

const Tab = createBottomTabNavigator<TabNavigationParamList>();

function StoreMode() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: getHeaderTitle(route),
        title: '',
        tabBarIcon: ({ focused }) => {
          if (route.name === 'SalesAnalysis') {
            return <Icon source={focused ? activeStatistics : statistics} />;
          } else if (route.name === 'Tpoint') {
            return <Icon source={focused ? activePoint : point} />;
          } else {
            return <Icon source={focused ? activeUser : user} />;
          }
        },
        tabBarActiveBackgroundColor: '#fff',
        tabBarInactiveBackgroundColor: '#fff',
        headerStyle: {
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#e9ecef',
          shadowOffset: { height: 0, width: 0 },
          backgroundColor: '#fff',
          elevation: 0,
        },
        tabBarStyle: {
          height: isIphoneX() ? 83 : 70,
        },
        tabBarItemStyle: {
          marginBottom: !isIphoneX() && 8,
        },
        tabBarActiveTintColor: '#005F83',
        tabBarIconStyle: {
          marginTop: 14,
        },
        tabBarLabel: getHeaderTitle(route),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerTitleStyle: {
          fontSize: 18,
          borderWidth: 0,
        },
        headerLeft: () => <BackButton />,
        headerRight:
          route.name === 'Tpoint'
            ? HomeBtn
            : route.name === 'SalesAnalysis'
            ? HomeWithSalesStatistics
            : HomeWithSettingBtn,
        headerTitleAlign: 'center',
      })}
      backBehavior="history">
      <Tab.Screen name="SalesAnalysis" component={SalesAnalysis} />
      <Tab.Screen name="Tpoint" component={Tpoint} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}
const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;
export default StoreMode;
