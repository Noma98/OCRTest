// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: string;
      secondary: string;
      active: string;
      textMain: string;
      textSub: string;
      error: string;
    };
    fontSize: {
      l: string;
      m: string;
      s: string;
      inputFail: string;
      inputText: string;
      inputSuccess: string;
    };
    lineHeight: {
      l: string;
      m: string;
      s: string;
      inputFail: string;
      inputText: string;
      inputSuccess: string;
    };
    margin: {
      xl: string;
      l: string;
      m: string;
      s: string;
      xs: string;
    };
  }
}
