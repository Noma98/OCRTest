import format from 'date-fns/format';
import React from 'react';
import { Alert, AppState, Linking, Vibration } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import {
  DataCaptureView,
  FrameSourceState,
} from 'scandit-react-native-datacapture-core';
import {
  IdCapture,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdDocumentType,
  IdLayoutStyle,
} from 'scandit-react-native-datacapture-id';
import styled from 'styled-components/native';
import { requestCameraPermissionsIfNeeded } from './camera-permission-handler';
import ContextSingleton from './ContextSingleton';

import { getRefundLimit } from '@/api/refund';
import CameraSwitchIcon from '@/assets/icons/Etc/cameraSwitchIcon.png';
import LoadingView from '@/components/common/LoadingView';
import ErrorController from '@/controllers/ErrorController';
import {
  refundLimit,
  refundLimitSuccess,
  updatePassportInfo,
} from '@/store/modules/refund';
import { isAndroid } from '@/utils/check';
import { playSound } from '@/utils/common';

const Container = styled.SafeAreaView`
  flex: 1;
  position: relative;
`;

const ButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  bottom: ${getBottomSpace()}px;
  width: 100%;
  height: 60px;
  justify-content: center;
  padding: 16px 0 0;
  flex-direction: row;
  background-color: ${props => props.theme.colors.main};
`;

const SwitchIcon = styled.Image`
  width: 28px;
  height: 28px;
  margin-right: 8px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  line-height: 25px;
  font-weight: 500;
`;

let subscription;

class Scan extends React.Component {
  constructor(props) {
    super(props);

    this.viewRef = React.createRef();
    this.isWorldFacing = true;
    // this.payload = null;
    this.isAlert = false;
    this.state = {
      switchLoading: false,
    };
    this.setupCapture();
  }

  setupCapture() {
    const { navigation, route } = this.props;
    const { referrer, isConnectedPos, isActiveVibration, isActiveSound } =
      route.params;

    // Getting DataCaptureContext Singleton
    this.dataCaptureContext = ContextSingleton.instance.getDataCaptureContext();

    // The Id capturing process is configured through id capture settings
    // and are then applied to the id capture instance that manages id recognition.
    const settings = new IdCaptureSettings();

    // We are interested in the front side of national Id Cards and passports using MRZ.
    settings.supportedDocuments = [IdDocumentType.PassportMRZ];

    // Create new Id capture mode with the settings from above.
    this.idCapture = IdCapture.forContext(this.dataCaptureContext, settings);

    this.idCapture.isEnabled = true;

    // Register a listener to get informed whenever a new id got recognized.
    this.idCaptureListener = {
      didCaptureId: async (_, session) => {
        if (session.newlyCapturedId == null) {
          return;
        }
        isActiveVibration && Vibration.vibrate();
        isActiveSound && playSound('scan_sound.mp3');
        this.idCapture.isEnabled = false;

        if (session.newlyCapturedId.mrzResult != null) {
          const { documentNumber, firstName, lastName, nationality } =
            session.newlyCapturedId;

          // Alert.alert(
          //   '여권 스캔 정보',
          //   `여권번호: ${documentNumber}\n성: ${lastName}\n이름: ${firstName}\n국가코드: ${nationality}`,
          // );

          const today = new Date();
          // const payload = {
          //   serviceName: 'KTP',
          //   passportNumber: 'SUCCESS10',
          //   lastName: 'SUCCESSMODEA',
          //   firstName: 'TEST',
          //   nationality: 'CHN',
          //   totalAmount: '0',
          //   saleDate: format(today, 'yyyyMMddHHmmss') + today.getMilliseconds(),
          // };
          const payload = {
            serviceName: 'KTP',
            passportNumber: documentNumber,
            lastName,
            firstName,
            nationality,
            totalAmount: '0',
            saleDate: format(today, 'yyyyMMddHHmmss') + today.getMilliseconds(),
          };

          try {
            // this.props.updatePassportInfo(payload);
            this.props.updatePassportInfo(payload);

            this.setState(state => ({ ...state, switchLoading: true }));
            const limit = await getRefundLimit(payload);
            this.props.refundLimitSuccess(limit);

            this.camera.switchToDesiredState(FrameSourceState.Off);

            navigation.navigate(
              referrer === 'Approval'
                ? isConnectedPos
                  ? 'BarcodeScan'
                  : 'RefundInquiry'
                : 'CancelList',
              {
                payload,
              },
            );
          } catch (error) {
            console.log(error.response?.data);
            const response = error.response;
            if (response) {
              const errorController = new ErrorController();
              if (errorController.checkIsRefundError(response.data.message)) {
                Alert.alert(
                  'KTP',
                  errorController.getRefundAlertMessage(response.data.message),
                );
                return;
              }
            }
            Alert.alert(
              'KTP',
              '오류가 발생했습니다.\n고객센터로 문의해주세요.\n02-6213-8011 (08:30~16:30)',
            );
          } finally {
            this.setState(state => ({ ...state, switchLoading: false }));
          }

          // this.camera.switchToDesiredState(FrameSourceState.Standby);
        } else {
          Alert.alert(
            'KTP',
            `여권을 인식하지 못했습니다.\n다시 여권을 스캔해주세요.`,
            [{ text: 'OK', onPress: () => (this.idCapture.isEnabled = true) }],
            { cancelable: false },
          );
        }
      },
      didFailWithError: (_, error, session) => {
        Alert.alert(
          'KTP',
          `여권을 인식하지 못했습니다.\n다시 여권을 스캔해주세요.`,
          [{ text: 'OK', onPress: () => (this.idCapture.isEnabled = true) }],
          { cancelable: false },
        );
      },
    };

    this.idCapture.addListener(this.idCaptureListener);

    this.startCamera();
  }

  componentDidMount() {
    subscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );

    // Add a Id capture overlay to the data capture view to render the location of captured ids on top of
    // the video preview. This is optional, but recommended for better visual feedback.
    this.overlay = IdCaptureOverlay.withIdCaptureForView(
      this.idCapture,
      this.viewRef.current,
    );
    this.overlay.idLayoutStyle = IdLayoutStyle.Square;
  }

  componentWillUnmount() {
    if (subscription.remove) {
      subscription.remove();
    } else {
      AppState.removeEventListener('change', this.handleAppStateChange);
    }
    this.camera.switchToDesiredState(FrameSourceState.Off);
    this.camera = ContextSingleton.instance.getRearCamera();
    this.dataCaptureContext.setFrameSource(this.camera);
    this.idCapture.isEnabled = false;
    this.dataCaptureContext.removeMode(this.idCapture);
  }

  handleAppStateChange = nextAppState => {
    // turning on the camera when the scan page returns to foreground
    if (!nextAppState.match(/inactive|background/)) {
      this.startCamera();
      this.idCapture.isEnabled = true;
    } else {
      this.idCapture.isEnabled = false;
      // the camera is handled in the singleton due to standby state
    }
  };

  // restoreRefundStatus() {
  //   this.idCapture.isEnabled = true;
  // }

  // pauseCamera() {
  //   if (this.camera) {
  //     this.camera.switchToDesiredState(FrameSourceState.Standby);
  //   }
  // }

  stopCamera() {
    // Completely stopping the camera if needed
    if (this.camera) {
      this.camera.switchToDesiredState(FrameSourceState.Off);
    }
  }

  startCamera() {
    this.camera = this.isWorldFacing
      ? ContextSingleton.instance.getRearCamera()
      : ContextSingleton.instance.getFrontCamera();
    this.dataCaptureContext.setFrameSource(this.camera);

    // this.camera.switchToDesiredState(FrameSourceState.On);

    // Switch camera on to start streaming frames and enable the id capture mode.
    // The camera is started asynchronously and will take some time to completely turn on.
    requestCameraPermissionsIfNeeded()
      .then(() => this.camera.switchToDesiredState(FrameSourceState.On))
      .catch(error => {
        if (!this.isAlert) {
          this.isAlert = true;
          if (error.type === 'LINKING') {
            Alert.alert(
              'KTP',
              `카메라에 대한 권한 사용을 거부하였습니다. 기능 사용을 원하실 경우 ${
                !isAndroid()
                  ? '설정 > KTP에서'
                  : '설정 > 애플리케이션 관리자에서 해당 앱의'
              } 카메라 접근 권한을 허용해 주세요.`,
              [
                {
                  text: '뒤로 가기',
                  onPress: () => {
                    this.isAlert = false;
                    this.props.navigation.goBack();
                  },
                  style: 'cancel',
                },
                {
                  text: '설정으로 이동',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
            return;
          }
          if (error.type === 'DISABLED') {
            Alert.alert('KTP', error.message, [
              {
                text: '확인',
                onPress: () => {
                  this.isAlert = false;
                  this.props.navigation.goBack();
                },
              },
            ]);
            return;
          }
        }
      });
  }

  switchCamera() {
    this.camera.switchToDesiredState(FrameSourceState.Off);
    if (this.isWorldFacing) {
      this.isWorldFacing = false;
    } else {
      this.isWorldFacing = true;
    }

    this.setState(state => {
      return {
        ...state,
        switchLoading: true,
      };
    });
    setTimeout(() => {
      this.startCamera();
      this.setState(state => {
        return {
          ...state,
          switchLoading: false,
        };
      });
    }, 500);
  }

  render() {
    return (
      <Container>
        <DataCaptureView
          style={{ flex: 1, marginBottom: 60 }}
          context={this.dataCaptureContext}
          ref={this.viewRef}
        />
        <ButtonWrapper activeOpacity={0.85} onPress={() => this.switchCamera()}>
          <SwitchIcon source={CameraSwitchIcon} />
          <ButtonText>카메라 전환 버튼</ButtonText>
        </ButtonWrapper>
        {(this.state.switchLoading ||
          this.props.refund.status === 'loading') && (
          <LoadingView isOpacity isDark />
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { refund } = state;
  return { refund };
}

export default connect(mapStateToProps, {
  refundLimit,
  refundLimitSuccess,
  updatePassportInfo,
})(Scan);
