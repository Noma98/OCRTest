import format from 'date-fns/format';
import React, { Component } from 'react';
import { Alert, AppState, View, Linking, Vibration } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import {
  IdCapture,
  IdCaptureOverlay,
  IdCaptureSettings,
  IdDocumentType,
  IdLayoutStyle,
} from 'scandit-react-native-datacapture-id';
import {
  Camera,
  DataCaptureView,
  FrameSourceState,
  RectangularViewfinder,
  NumberWithUnit,
  MeasureUnit,
  RectangularLocationSelection,
  SizeWithUnit,
  TorchSwitchControl,
  CameraPosition,
} from 'scandit-react-native-datacapture-core';
import styled from 'styled-components/native';
import { requestCameraPermissionsIfNeeded } from './camera-permission-handler';
import ContextSingleton from './ContextSingleton2';

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

let subscription;
export class Scan extends Component {
  state = {
    showScandit: false,
    isLoading: false,
    isWorldFacing: true,
    isAlert: false,
  };

  constructor({ navigation, route }) {
    super();

    this.navigation = navigation;
    this.params = route.params;
    this.viewRef = React.createRef();
  }

  // Presenting the DataCaptureView
  showScandit = shouldDisplay => {
    this.setState(state => ({ ...state, showScandit: shouldDisplay }));
  };

  // Initializing the scanner after the component has been mounted
  componentDidMount() {
    subscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
    this.setupScanning();
  }

  // Handling the lifecycle - removing every created object to avoid duplication in the singleton context
  componentWillUnmount() {
    // AppState.removeEventListener('change', this.handleAppStateChange);
    subscription.remove();
    this.removeOverlays();
    this.idCaptureMode.removeListener(this.idCaptureListener);

    this.stopCapture();
    this.camera = Camera.default; //추가

    this.dataCaptureContext.removeAllModes();
    this.dataCaptureContext.setFrameSource(null);
  }

  startCapture() {
    this.idCaptureMode.isEnabled = true;
    this.startCamera();
  }

  stopCapture() {
    this.idCaptureMode.isEnabled = false;
    this.stopCamera();
  }

  stopCamera() {
    if (this.camera) {
      this.camera.switchToDesiredState(FrameSourceState.Off);
    }
  }

  setupScanning() {
    // Settings and the listener are disconnected from the context, so they can be created beforehand
    this.settings = new IdCaptureSettings();
    this.settings.supportedDocuments = [IdDocumentType.PassportMRZ];

    const { referrer, isConnectedPos, isActiveVibration, isActiveSound } =
      this.params;

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

          const today = new Date();
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
            this.props.updatePassportInfo(payload);

            this.setState(state => ({ ...state, isLoading: true }));
            const limit = await getRefundLimit(payload);
            this.props.refundLimitSuccess(limit);

            this.camera.switchToDesiredState(FrameSourceState.Off);
            this.navigation.navigate(
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
            this.setState(state => ({ ...state, isLoading: false }));
          }
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

    // Moving to the Scanner setup
    this.initializeContextAndCapture();
  }

  initializeContextAndCapture = async () => {
    // Initializing every part of the scanner one-by-one to avoid race conditions
    this.dataCaptureContext =
      await ContextSingleton.instance.getDataCaptureContext();

    // Register a listener to get informed whenever a new id got recognized.
    this.idCaptureMode = await IdCapture.forContext(
      this.dataCaptureContext,
      this.settings,
    );
    this.idCaptureMode.addListener(this.idCaptureListener);
    // Create new Id capture mode with the settings from above.
    this.idCapture = IdCapture.forContext(
      this.dataCaptureContext,
      this.settings,
    );

    // After the scanner has been initialized - we can start passing the frames to it
    // So we get the permissions and start the camera
    requestCameraPermissionsIfNeeded()
      .then(() => this.startCamera())
      .catch(error => {
        if (!this.state.isAlert) {
          this.setState(state => ({ ...state, isAlert: true }));
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
                  onPress: this.goToBack,
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
                onPress: this.goToBack,
              },
            ]);
            return;
          }
        }
      });
  };
  goToBack = () => {
    this.setState(state => ({ ...state, isAlert: false }));
    this.navigation.goBack();
  };
  startCamera = async () => {
    if (!this.camera) {
      this.camera = this.state.isWorldFacing
        ? Camera.default
        : Camera.atPosition(CameraPosition.UserFacing);
      await this.dataCaptureContext.setFrameSource(this.camera);
      const cameraSettings = IdCapture.recommendedCameraSettings;
      await this.camera.applySettings(cameraSettings);
    }

    await this.camera.switchToDesiredState(FrameSourceState.On);

    // After every functioning part has been fully established - we can present the dataCaptureView
    await this.showScandit(true);

    // Overlays and UI reference viewRef, so they are set up after that
    await this.setupOverlays();
  };

  setupOverlays() {
    // Perform ui-related work after the dataCaptureView has beeen rendered
    this.idCaptureOverlay = IdCaptureOverlay.withIdCaptureForView(
      this.idCapture,
      this.viewRef.current,
    );
    this.idCaptureOverlay.idLayoutStyle = IdLayoutStyle.Square;
  }

  removeOverlays() {
    // removing the overlays before unmounting to avoid the duplication issues on the UI
    if (this.viewRef.current && this.idCaptureOverlay) {
      this.viewRef.current.removeOverlay(this.idCaptureOverlay);
    }
  }

  handleAppStateChange = async nextAppState => {
    if (nextAppState.match(/inactive|background/)) {
      this.stopCapture();
      // Removing the overlays to avoid duplicate instances
      this.removeOverlays();
    } else {
      this.startCapture();
    }
  };

  switchCamera() {
    this.stopCapture();
    this.setState(state => ({
      ...state,
      isLoading: true,
      isWorldFacing: !state.isWorldFacing,
    }));
    this.startCapture();
    this.setState(state => ({ ...state, isLoading: false }));
  }

  render() {
    if (this.state.showScandit || !this.state.isLoading) {
      return (
        <Container>
          <DataCaptureView
            style={{ flex: 1, marginBottom: 60 }}
            context={this.dataCaptureContext}
            ref={this.viewRef}
          />
          <ButtonWrapper
            activeOpacity={0.85}
            onPress={() => this.switchCamera()}>
            <SwitchIcon source={CameraSwitchIcon} />
            <ButtonText>카메라 전환 버튼</ButtonText>
          </ButtonWrapper>
        </Container>
      );
    } else {
      return <LoadingView isOpacity isDark />;
    }
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
