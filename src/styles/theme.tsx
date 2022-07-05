// src/assets/styles/theme.ts
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    main: '#005F83',
    secondary: '#376155',
    active: '#3A3B3E',
    textMain: '#000',
    textSub: '#9FA1A7',
    error: '#FF5239',
  },
  fontSize: {
    l: '20px',
    m: '18px',
    s: '16px',
    inputFail: '13px',
    inputText: '15px',
    inputSuccess: '14px',
  },
  lineHeight: {
    l: '20',
    m: '18',
    s: '24',
    inputFail: '20',
    inputText: '22',
    inputSuccess: '22',
  },
  margin: {
    xl: '20px',
    l: '16px',
    m: '12px',
    s: '8px',
    xs: '4px',
  },
};

export { theme };
