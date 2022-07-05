import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

interface IRouteProps {
  name: string;
  params?: Record<string, string | Record<string, string>>;
}

interface IResetProps {
  index: number;
  routes: IRouteProps[];
}

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: Record<string, string>) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function reset(resetProps: IResetProps) {
  navigationRef.current?.reset(resetProps);
}
