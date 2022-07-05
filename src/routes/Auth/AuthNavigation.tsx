import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { LeftArrow } from 'components/Header';
import React from 'react';

import BackButton from '@/components/common/BackButton';
import LoadingView from '@/components/common/LoadingView';
import TermsContextProvider from '@/components/context/TermsContextProvider';
import DaumPostcode from '@/screens/DaumPostcode';
import EnterBusinessNumber from '@/screens/EnterBusinessNumber';
import ImpVertification from '@/screens/IMP/Vertification';
import MobileCertification from '@/screens/MobileCertification';
import ResetPasswordOutside from '@/screens/ResetPasswordOutside';
import SignInScreen from '@/screens/SignIn';
import StepOne from '@/screens/SignUp/StepOne';
import StepThree from '@/screens/SignUp/StepThree';
import StepTwo from '@/screens/SignUp/StepTwo';
import Terms from '@/screens/Terms';
import WalkThrough from '@/screens/WalkThrough';
import { AuthStackNavigationParamList } from '@/types/navigation';

const Stack = createStackNavigator<AuthStackNavigationParamList>();

interface IProps {
  isFirst?: boolean;
}
function AuthNavigation({ isFirst }: IProps) {
  if (isFirst === undefined) {
    return <LoadingView isOpacity />;
  }
  return (
    <TermsContextProvider>
      <Stack.Navigator
        initialRouteName={isFirst ? 'WalkThrough' : 'SignIn'}
        screenOptions={{
          headerStyle: {
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#e9ecef',
            shadowOffset: { height: 0, width: 0 },
            backgroundColor: '#fff',
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: 18,
            borderWidth: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
        }}>
        <Stack.Screen
          name="WalkThrough"
          component={WalkThrough}
          options={{
            header: () => <></>,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: '로그인',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Group
          screenOptions={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
          }}>
          <Stack.Screen
            name="SignUp"
            component={StepOne}
            options={{
              title: '회원가입',
              headerLeft: () => <BackButton pressFuncType="STEP_ONE" />,
            }}
          />
          <Stack.Screen
            name="StepTwo"
            component={StepTwo}
            options={{
              title: '회원가입',
              headerLeft: () => <BackButton pressFuncType="STEP_TWO" />,
            }}
          />
          <Stack.Screen
            name="StepThree"
            component={StepThree}
            options={{
              title: '회원가입',
              headerLeft: () => <BackButton pressFuncType="STEP_THREE" />,
            }}
          />
          <Stack.Screen
            name="Terms"
            component={Terms}
            options={{
              headerLeft: () => <BackButton />,
            }}
          />
          <Stack.Screen
            name="Vertification"
            component={ImpVertification}
            options={{
              headerBackImage: LeftArrow,
            }}
          />
          <Stack.Screen
            name="Postcode"
            component={DaumPostcode}
            options={{
              title: '주소 찾기',
              headerLeft: () => null,
              headerRight: () => <BackButton isRight />,
            }}
          />
          <Stack.Screen
            name="EnterBusinessNumber"
            component={EnterBusinessNumber}
            options={{
              title: '비밀번호 재설정',
              headerLeft: () => <BackButton />,
            }}
          />
          <Stack.Screen
            name="MobileCertification"
            component={MobileCertification}
            options={{
              title: '본인인증',
              headerLeft: () => <BackButton />,
            }}
          />
          <Stack.Screen
            name="ResetPasswordOutside"
            component={ResetPasswordOutside}
            options={{
              title: '비밀번호 재설정',
              headerLeft: () => <BackButton />,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </TermsContextProvider>
  );
}

export default AuthNavigation;
