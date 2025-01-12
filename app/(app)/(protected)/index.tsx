import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Platform,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {
	ExpoSpeechRecognitionModule,
	useSpeechRecognitionEvent,
  } from "expo-speech-recognition";
  
export default function Home() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();

  // Camera ref for recordAsync()
  const cameraRef = useRef<CameraView>(null);

  // Store recognized transcripts
  const [transcriptEntries, setTranscriptEntries] = useState<
    Array<{ timestamp: Date; text: string }>
  >([]);

  // Keep track if we’re listening for speech
  const [isListening, setIsListening] = useState(false);
  // Keep track of partial results, if using interimResults
  const [currentUtterance, setCurrentUtterance] = useState('');

  // --- Speech Recognition Events ---
  useSpeechRecognitionEvent('result', (event) => {
    if (event.results && event.results[0]) {
      const recognizedText = event.results[0].transcript;
      setCurrentUtterance(recognizedText);

      // If the speech recognizer deems this "final"
      // (on iOS it happens automatically, on Android it might vary)
      if (event.isFinal) {
        setTranscriptEntries((prev) => [
          ...prev,
          {
            timestamp: new Date(),
            text: recognizedText,
          },
        ]);
        setCurrentUtterance('');
      }
    }
  });

  useSpeechRecognitionEvent('start', () => {
    setIsListening(true);
  });

  useSpeechRecognitionEvent('end', () => {
    setIsListening(false);
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.warn('Speech Error: ', event.error, event.message);
    setIsListening(false);
  });

  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }, []);

  // For speech
  const startListening = async () => {
    if (Platform.OS === 'web') {
      console.warn('Speech recognition is not supported on web');
      return;
    }
    
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn('Speech permissions not granted');
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: 'en-US',
      interimResults: true,
      continuous: Platform.OS === 'android' ? false : true,
    });
  };

  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  // For video
  const startRecording = async () => {
    if (!cameraRef.current) return;
    try {
      const data = await cameraRef.current.recordAsync();
      console.log('Video saved to:', data.uri);
    } catch (err) {
      console.warn('Video recording error:', err);
    }
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  // --- Render the camera or permissions prompt ---
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant camera permission" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Camera Container */}
      <View style={{ width: '100%', alignItems: 'center', paddingTop: 20 }}>
        <View style={{ width: 300, aspectRatio: 1, borderWidth: 2 }}>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing={facing}
            mode="video"
            autofocus
          />
        </View>
      </View>

      {/* Buttons for toggling camera + recording + speech */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <Button title="Flip" onPress={toggleCameraFacing} />
        <Button title="Start Video" onPress={startRecording} />
        <Button title="Stop Video" onPress={stopRecording} />
        {isListening ? (
          <Button title="Stop Speech" onPress={stopListening} />
        ) : (
          <Button title="Start Speech" onPress={startListening} />
        )}
      </View>

      {/* Transcript Area */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Show partial recognition */}
        {currentUtterance ? (
          <Text style={{ fontStyle: 'italic', color: 'gray' }}>
            {currentUtterance}
          </Text>
        ) : null}
        {transcriptEntries.map((entry, index) => (
          <View key={index} style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 12, color: 'gray' }}>
              {entry.timestamp.toLocaleTimeString()}
            </Text>
            <Text style={{ fontSize: 16 }}>{entry.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}