import React, { createContext, useContext } from 'react';
import { Alert } from 'react-native';
import codePush, { DownloadProgress } from 'react-native-code-push';

interface ICodepushContext {
  status: null | codePush.SyncStatus;
  progress: null | number;
}

// @ts-ignore
const CodePushContext = createContext<ICodepushContext>({});

export const useCodePush = () => useContext<ICodepushContext>(CodePushContext);

class CodepushController extends React.Component<{}, ICodepushContext> {
  state = {
    status: null,
    progress: null,
  };

  codePushStatusDidChange(status: codePush.SyncStatus) {
    switch (status) {
      case codePush.SyncStatus.UPDATE_INSTALLED:
        Alert.alert(
          '다운로드 완료',
          "지금 업데이트를 적용하시겠습니까??\n('나중에'를 누르면, 앱 재실행시\n업데이트가 자동으로 적용됩니다)",
          [
            {
              text: '나중에',
              style: 'cancel',
            },
            {
              text: '반영',
              onPress: () => codePush.restartApp(),
            },
          ],
        );
    }
    this.setState({ status });
  }

  codePushDownloadDidProgress(progress: DownloadProgress) {
    this.setState({ progress: progress.receivedBytes / progress.totalBytes });
  }

  render() {
    return (
      <CodePushContext.Provider
        value={{
          status: this.state.status,
          progress: this.state.progress,
        }}>
        {this.props.children}
      </CodePushContext.Provider>
    );
  }
}

export const CodepushProvider = codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    title: '업데이트 알림',
    optionalInstallButtonLabel: '확인',
    optionalIgnoreButtonLabel: '취소',
    optionalUpdateMessage:
      "최신 버전으로 업데이트가 필요합니다.\n지금 업데이트하시겠습니까?\n('확인'을 누르면 자동으로 진행됩니다)",
    mandatoryContinueButtonLabel: '확인',
    mandatoryUpdateMessage:
      '필수 업데이트가 있습니다.\n최적화된 환경에서 이용할 수 있도록\n최신 버전으로 업데이트를 진행합니다.',
  },
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
})(CodepushController);
