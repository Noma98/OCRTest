import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MainStackNavigationParamList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AuthStackNavigationParamList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TabNavigationParamList,
} from './types/navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends MainStackNavigationParamList,
        AuthStackNavigationParamList,
        TabNavigationParamList {}
  }
}
