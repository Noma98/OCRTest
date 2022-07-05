import { useHeaderHeight } from '@react-navigation/elements';
import { Alert, Dimensions, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { IFranchiseeApplicantsStatus } from '@/types/user';

export function isAndroid() {
  return Platform.OS === 'android';
}

export function checkScreenHeight() {
  const headerHeight = useHeaderHeight();
  const { height: screenHeight } = Dimensions.get('window');
  const statusbarHeight = isAndroid()
    ? StatusBar.currentHeight
    : getStatusBarHeight();
  const height = screenHeight - headerHeight - statusbarHeight;
  return height;
}

export function checkPasswordMatch(
  value: string,
  passwordRef: React.MutableRefObject<{}>,
) {
  return value === passwordRef.current || '비밀번호가 일치하지 않습니다.';
}

export function checkIsAccepted(franchiseeStatus: IFranchiseeApplicantsStatus) {
  if (franchiseeStatus === 'REJECTED') {
    Alert.alert(
      'KTP',
      '가맹점 신청이 거절된 상태입니다.\n마이페이지에서 가맹점 재신청을 진행해주세요.',
    );
    return false;
  }
  if (franchiseeStatus !== 'ACCEPTED') {
    Alert.alert('KTP', '가맹점 승인 후 이용 가능합니다.');
    return false;
  }
  return true;
}
