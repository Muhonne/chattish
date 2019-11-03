import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import * as Permissions from 'expo-permissions'

import uuid from 'uuid'

import Message from './Message'
import CameraModal from './CameraModal'

const ICON_CAMERA = require('./img/icon_camera.png')

const s = StyleSheet.create({
  flex: {
    flex: 1
  },
  cameraButton: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  cameraIcon: {
    height: 24,
    width: 24
  },
  inputContainer: {
    height: 48,
    padding: 8,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ffd052',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 32,
    backgroundColor: '#fff',
    padding: 8
  },
  button: {
    backgroundColor: '#ffd052',
    paddingHorizontal: 16,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
})

export default function ChatScreen() {
  const [text, setText] = useState('')
  const [cameraView, setCameraView] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'oiudf',
      senderId: 'myid',
      name: 'Mattias',
      timestamp: Date.now(),
      text: "I'll send you a picture. Just a moment."
    },
    {
      id: 'asdg',
      senderId: 'notmyid',
      name: 'Devloper',
      timestamp: Date.now(),
      text:
        "If you've got any questions hit me up on Linkedin. I've left a few ts error in ChatScreen.tsx, can you spot them?",
      attachment: {
        type: 'url',
        link: 'https://fi.linkedin.com/in/mattias-muhonen-98a86670'
      }
    },
    {
      id: 'asd',
      senderId: 'notmyid',
      name: 'Devloper',
      timestamp: Date.now(),
      text:
        "This is a simple chat-like UI made with Expo and TypeScript. It ain't pretty but hey, I'm not a designer. If you're not familiar with Expo then heres a link on how to get started. Note that it also runs on web but poorly and the Modal+Camera are broken.",
      attachment: {
        type: 'url',
        link: 'https://expo.io/learn'
      }
    }
  ])

  const handleAddMessage = () => {
    setMessages([
      {
        id: uuid(),
        senderId: 'myid',
        name: 'Mattias',
        timestamp: Date.now(),
        text
      },
      ...messages
    ])
    setText('')
  }

  const handleCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    if (status === 'granted') {
      setCameraView(true)
    }
  }

  const handleImage = (fsString) => {
    setMessages([
      {
        id: uuid(),
        senderId: 'myid',
        name: 'Mattias',
        timestamp: Date.now(),
        text: '',
        attachment: {
          type: 'image',
          link: fsString
        }
      },
      ...messages
    ])
    setCameraView(false)
  }

  return (
    <SafeAreaView style={s.flex}>
      <StatusBar hidden={true} showHideTransition={'fade'} />
      <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <FlatList
          inverted
          style={s.flex}
          data={messages}
          renderItem={({ item, index }) => (
            <Message
              message={item}
              own={item.senderId === 'myid'}
              switchSender={messages[index - 1] && messages[index - 1].senderId !== item.senderId}
            />
          )}
          keyExtractor={(item, index) => '' + item.id + index}
        />
        <View style={s.inputContainer}>
          <TouchableOpacity onPress={handleCamera}>
            <Image source={ICON_CAMERA} style={s.cameraIcon} />
          </TouchableOpacity>
          <TextInput
            placeholder={'Type here'}
            style={s.input}
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleAddMessage}
          />
          <TouchableOpacity style={s.button} onPress={handleAddMessage}>
            <Text style={s.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <CameraModal
        visible={cameraView}
        hide={() => {
          setCameraView(false)
        }}
        onDone={handleImage}
      />
    </SafeAreaView>
  )
}
