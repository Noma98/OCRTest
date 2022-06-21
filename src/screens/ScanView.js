import React, {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {Text, View, PixelRatio, TouchableHighlight} from 'react-native';
import {scanOCR} from 'vision-camera-ocr';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const ScanView = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');

  const [ocr, setOcr] = useState();
  const [result, setResult] = useState({
    documentNumber: '',
    name: '',
    nationality: '',
  });
  const {documentNumber, name, nationality} = result;
  const [pixelRatio, setPixelRatio] = useState(1);
  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';

    const data = scanOCR(frame);
    runOnJS(setOcr)(data?.result?.text);
  }, []);

  useEffect(() => {
    if (!Boolean(ocr)) {
      return;
    }
    textRecognized(ocr);
    console.log(ocr);
  }, [ocr]);

  const textRecognized = text => {
    if (Boolean(nationality && documentNumber && name)) {
      navigation.navigate('ScanResult', {result});
    }
    const docuReg = /[MSRGD]{1}\d{9}[A-Z]{3}/;
    const nameReg = /[<]{2}([A-Z].*[A-Z])[<]{4}/;
    if (!nationality) {
      const rowDocuments = text.match(docuReg)?.[0];
      rowDocuments &&
        setResult({
          ...result,
          documentNumber: rowDocuments.substring(0, 9),
          nationality: rowDocuments.substring(10, 13),
        });
    }
    if (!name) {
      const rowName = text.match(nameReg)?.[0];
      rowName &&
        setResult({
          ...result,
          name: rowName.replace(/</g, ''),
        });
    }
  };

  const onSwitchCamera = () => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  };
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const onPress = e => {
    console.log('touched...');
  };
  return device !== undefined && hasPermission ? (
    <View style={{flex: 1}}>
      <Camera
        style={{flex: 1}}
        frameProcessor={frameProcessor}
        device={device}
        isActive={true}
        frameProcessorFps={60}
        onLayout={event => {
          setPixelRatio(
            event.nativeEvent.layout.width /
              PixelRatio.getPixelSizeForLayoutSize(
                event.nativeEvent.layout.width,
              ),
          );
        }}
      />
      <TouchableHighlight
        onPress={onSwitchCamera}
        underlayColor="#0877a1"
        style={{backgroundColor: '#005F83', height: 60}}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            lineHeight: 60,
            fontSize: 24,
          }}>
          카메라 전환
        </Text>
      </TouchableHighlight>
      <View
        style={{
          display: 'flex',
          position: 'absolute',
          width: '100%',
          bottom: '40%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '95%',
            height: 100,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#61c964',
          }}>
          <Text
            style={{
              color: '#61c964',
              fontSize: 30,
              marginTop: 20,
              textAlign: 'center',
            }}>{`   <<<<     <<<<<<<<<<<`}</Text>
        </View>
      </View>
    </View>
  ) : (
    <View></View>
  );
};
export default ScanView;
