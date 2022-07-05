import React from 'react';
import {Easing, View} from 'react-native';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';

import BackButton from '@/components/common/BackButton';
import Account from '@/screens/Account';
import BarcodeScan from '@/screens/BarcodeScan';
import CancelListScreen from '@/screens/CancelMode/CancelList';
import CancelResultScreen from '@/screens/CancelMode/CancelResult';
import CMSReport from '@/screens/CMSReport';
import CMSReportDetail from '@/screens/CMSReport/CMSReportDetail';
import ConnectPos from '@/screens/ConnectPos';
import CustomerService from '@/screens/CustomerService';
import EditAccount from '@/screens/EditAccount';
import EditProfile from '@/screens/EditProfile';
import EmployeeAccount from '@/screens/EmployeeAccount';
import AddEmployee from '@/screens/EmployeeAccount/AddEmployee';
import UpdateEmployee from '@/screens/EmployeeAccount/UpdateEmployee';
import EnterCurrentPwd from '@/screens/EnterCurrentPwd';
import FranchiseeApplication from '@/screens/FranchiseeApplication';
import FranchiseeReApplication from '@/screens/FranchiseeReApplication';
import Notice from '@/screens/Notice';
import NoticeDetail from '@/screens/Notice/NoticeDetail';
import NotificationSettings from '@/screens/NotificationSettings';
import PassportDirectInput from '@/screens/PassportDirectInput';
import Profile from '@/screens/Profile';
import PushNotification from '@/screens/PushNotification';
import PushNotificationDetail from '@/screens/PushNotification/PushNotificationDetail';
import RejectedFranchisee from '@/screens/RejectedFranchisee';
import ResetPasswordInside from '@/screens/ResetPasswordInside';
import RefundDetailScreen from '@/screens/SalesAnalysis/RefundDetail';
import RefundStatusScreen from '@/screens/SalesAnalysis/RefundStatus';
import SalesStatistics from '@/screens/SalesStatistics';
import SalesStatisticsDetail from '@/screens/SalesStatistics/SalesStatisticsDetail';
import PurchaseInfoScreen from '@/screens/ScanMode/PurchaseInfo';
import RefundInquiryScreen from '@/screens/ScanMode/RefundInquiry';
import RefundResultScreen from '@/screens/ScanMode/RefundResult';
import ScanScreen from '@/screens/ScanMode/Scan/index2';
import SelectModeScreen from '@/screens/SelectMode';
import Setting from '@/screens/Setting';
import StoreModeScreen from '@/screens/StoreMode';
import Terms from '@/screens/Terms';
import RequestWithdrawal from '@/screens/Tpoint/RequestWithdrawal';
import WithdrawalResult from '@/screens/Tpoint/WithdrawalResult';
import VatReport from '@/screens/VatReport';
import VatReportDetail from '@/screens/VatReport/VatReportDetail';
import ScanView from '@/screens/VisionOCR/ScanView';
import ScanResult from '@/screens/VisionOCR/ScanResult';
import {MainStackNavigationParamList} from '@/types/navigation';
import {isAndroid} from '@/utils/check';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {
  GoToDirectInput,
  HomeBtn,
  HomeWithSalesStatistics,
  HomeWithSettingBtn,
  LeftArrow,
} from 'components/Header';

const Stack = createStackNavigator<MainStackNavigationParamList>();
const config = {
  animation: 'timing',
  config: {
    duration: 550,
    easing: Easing.inOut(Easing.poly(5)),
    useNativeDriver: true,
  },
};
function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#e9ecef',
          shadowOffset: {height: 0, width: 0},
          backgroundColor: '#fff',
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
          borderWidth: 0,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyleInterpolator: HeaderStyleInterpolators.forFade,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Group>
        {/* 모드 선택 */}
        <Stack.Screen
          name="SelectMode"
          component={SelectModeScreen}
          options={{
            headerTitle: '모드선택',
            headerTitleAlign: 'center',
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{
            headerLeft: () => <BackButton />,
          }}
        />
        {/* 알림 관련*/}
        <Stack.Screen
          name="PushNotification"
          component={PushNotification}
          options={{
            headerTitle: '알림',
            headerRight: HomeBtn,
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="PushNotificationDetail"
          component={PushNotificationDetail}
          options={{
            headerTitle: '알림 상세',
            headerRight: HomeBtn,
            headerLeft: () => <BackButton />,
          }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerBackTitleVisible: false,
          headerBackImage: LeftArrow,
          headerTitleAlign: 'center',
        }}>
        {/* 여권 스캔 관련 (조회) */}
        {/* <Stack.Screen
          name="ScanMode"
          component={ScanScreen}
          options={{headerTitle: '여권 스캔', headerRight: GoToDirectInput}}
        /> */}
        <Stack.Screen
          name="BarcodeScan"
          component={BarcodeScan}
          options={{headerTitle: '바코드 스캔', headerRight: HomeBtn}}
        />
        <Stack.Screen
          name="ScanMode"
          component={ScanView}
          options={{headerTitle: '여권 스캔', headerRight: GoToDirectInput}}
        />
        <Stack.Screen
          name="ScanResult"
          component={ScanResult}
          options={{headerTitle: '스캔 결과'}}
        />
        <Stack.Screen
          name="RefundInquiry"
          component={RefundInquiryScreen}
          options={{
            headerTitle: '',
            headerRight: HomeBtn,
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="PurchaseInfo"
          component={PurchaseInfoScreen}
          options={{
            headerTitle: '상품금액 입력',
            headerRight: HomeBtn,
          }}
        />
        <Stack.Screen
          name="RefundResult"
          component={RefundResultScreen}
          options={{
            headerTitle: '환급완료',
            headerRight: HomeBtn,
            headerLeft: () => <></>,
          }}
        />

        {/* 취소모드 */}
        <Stack.Screen
          name="CancelList"
          component={CancelListScreen}
          options={{
            headerTitle: '환급 취소',
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="CancelResult"
          component={CancelResultScreen}
          options={{
            headerTitle: '환급 취소 완료',
            headerRight: HomeBtn,
            headerLeft: () => <></>,
          }}
        />

        {/* 상점 모드 */}
        <Stack.Screen
          name="StoreMode"
          component={StoreModeScreen}
          options={() => ({
            header: () => (
              <View
                style={{
                  height: isAndroid()
                    ? 0
                    : isIphoneX()
                    ? 44
                    : getStatusBarHeight(),
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="RefundStatus"
          component={RefundStatusScreen}
          options={{
            headerTitle: '환급내역',
            headerRight: HomeWithSalesStatistics,
          }}
        />
        <Stack.Screen
          name="RefundDetail"
          component={RefundDetailScreen}
          options={{
            headerTitle: '환급상세',
            headerRight: HomeWithSalesStatistics,
          }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{headerTitle: '설정'}}
        />
        <Stack.Screen
          name="ConnectPos"
          component={ConnectPos}
          options={{headerTitle: '포스기 연결'}}
        />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettings}
          options={{headerTitle: '알림 설정'}}
        />
        <Stack.Screen
          name="RequestWithdrawal"
          component={RequestWithdrawal}
          options={{
            headerTitle: 'T.POINT 출금 신청',
            headerRight: HomeBtn,
          }}
        />
        <Stack.Screen
          name="WithdrawalResult"
          component={WithdrawalResult}
          options={{
            headerTitle: 'T.POINT 출금 신청 완료',
            headerRight: HomeBtn,
          }}
        />
        <Stack.Screen
          name="SalesStatistics"
          component={SalesStatistics}
          options={{headerTitle: '매출통계', headerRight: HomeBtn}}
        />
        <Stack.Screen
          name="SalesStatisticsDetail"
          component={SalesStatisticsDetail}
          options={{headerTitle: '매출통계', headerRight: HomeBtn}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerTitle: '내 정보'}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerTitle: '내 정보 변경'}}
        />
        <Stack.Screen
          name="FranchiseeApplication"
          component={FranchiseeApplication}
          options={{headerTitle: '가맹점 신청'}}
        />
        <Stack.Screen
          name="FranchiseeReApplication"
          component={FranchiseeReApplication}
          options={{headerTitle: '가맹점 재신청'}}
        />
        <Stack.Screen
          name="RejectedFranchisee"
          component={RejectedFranchisee}
          options={{
            headerTitle: '가맹점 신청',
            headerRight: HomeWithSettingBtn,
          }}
        />
        <Stack.Screen
          name="EditAccount"
          component={EditAccount}
          options={{headerTitle: '내 계좌 변경'}}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{headerTitle: '내 계좌'}}
        />
        <Stack.Screen
          name="EmployeeAccount"
          component={EmployeeAccount}
          options={{headerTitle: '직원 계정 생성', headerRight: HomeBtn}}
        />
        <Stack.Screen
          name="AddEmployee"
          component={AddEmployee}
          options={{headerTitle: '직원 추가하기', headerRight: HomeBtn}}
        />
        <Stack.Screen
          name="UpdateEmployee"
          component={UpdateEmployee}
          options={{headerTitle: '직원 정보 변경', headerRight: HomeBtn}}
        />
        <Stack.Screen
          name="Notice"
          component={Notice}
          options={{headerTitle: '공지사항', headerRight: HomeBtn}}
        />
        <Stack.Screen
          name="NoticeDetail"
          component={NoticeDetail}
          options={{headerTitle: '공지사항 상세', headerRight: HomeBtn}}
        />
        <Stack.Screen
          name="CustomerService"
          component={CustomerService}
          options={{headerTitle: '고객센터', headerRight: HomeBtn}}
        />
        <Stack.Screen
          name="VatReport"
          component={VatReport}
          options={{headerTitle: '부가세 신고자료'}}
        />
        <Stack.Screen
          name="VatReportDetail"
          component={VatReportDetail}
          options={{headerTitle: '환급실적명세서'}}
        />
        <Stack.Screen
          name="PassportDirectInput"
          component={PassportDirectInput}
          options={{
            headerTitle: '여권정보 입력',
            headerRight: HomeBtn,
          }}
        />
        <Stack.Screen
          name="EnterCurrentPwd"
          component={EnterCurrentPwd}
          options={{
            headerTitle: '비밀번호 변경',
          }}
        />
        <Stack.Screen
          name="ResetPasswordInside"
          component={ResetPasswordInside}
          options={{
            headerTitle: '비밀번호 변경',
          }}
        />
        <Stack.Screen
          name="CMSReport"
          component={CMSReport}
          options={{
            headerTitle: 'CMS 청구내역',
          }}
        />
        <Stack.Screen
          name="CMSReportDetail"
          component={CMSReportDetail}
          options={{
            headerTitle: '청구내역서',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default AppNavigation;
