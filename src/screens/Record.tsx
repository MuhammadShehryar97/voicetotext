import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Platform, PermissionsAndroid } from 'react-native';
import Voice from '@react-native-voice/voice';
import { Dropdown } from 'react-native-element-dropdown';

import MicroPhoneIcon from '../assets/microphone.png';
import PauseIcon from '../assets/pause.png';
import ArrowDropDown from '../assets/arrow-drop-down.png'

const Record: React.FC = () => {
  const [language, setLanguage] = useState('en-US');
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const androidPermissionChecking = async () => {
    if (Platform.OS == 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
    }
  }

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    androidPermissionChecking();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    const text = e.value[0];
    setRecognizedText(text);
  };

  const onSpeechPartialResults = (e) => {
    const text = e.value[0];
    setRecognizedText(text);
  };

  const startRecording = async () => {
    setIsListening(true);
    setRecognizedText('');
    try {
      await Voice.start(language);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      Voice.removeAllListeners();
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const startlistening = () => {
    if (isListening) {
      stopListening();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.language}>{'Select Language'}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        keyboardAvoiding={false}
        data={[
          { label: 'English', value: 'en-US' },
          { label: 'French', value: 'fr-FR' }
        ]}
        maxHeight={300}
        labelField="label"
        valueField="value"
        itemContainerStyle={styles.itemContainerStyle}
        containerStyle={styles.containerStyle}
        placeholder={'Select an account'}
        searchPlaceholder="Search account"
        dropdownPosition={"bottom"}
        value={language}
        onChange={(text) => setLanguage(text.value)}
        renderRightIcon={() => <Image source={ArrowDropDown} style={styles.rightIcon} />}
      />
      <TextInput
        style={styles.textBox}
        value={recognizedText}
        placeholder={"Your text will appear here..."}
        editable={false}
        multiline
      />
      <Pressable onPress={startlistening} style={styles.micButton}>
        {isListening ?
          <Image source={PauseIcon} style={styles.pause} /> :
          <Image source={MicroPhoneIcon} style={styles.microPhone} />
        }
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  language:{
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: 'black'
  },
  textBox: {
    height: 150,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
    textAlignVertical: 'top',
    color: 'black'
  },
  micButton: {
    backgroundColor: '#DF9522',
    padding: 20,
    borderRadius: 50,
    alignSelf: "center"
  },
  dropdown: {
    height: 40,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  itemContainerStyle: {
    marginVertical: -5
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  containerStyle: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "blue"
  },
  rightIcon: {
    height: 24,
    width: 24
  },
  pause: {
    width: 30,
    height: 30
  },
  microPhone: {
    width: 25,
    height: 25
  }
});

export default Record;