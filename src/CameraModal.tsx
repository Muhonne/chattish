import React, { useState } from 'react'
import { Modal, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'

const ICON_CAMERA = require('./img/icon_camera.png')
const ICON_CLOSE = require('./img/icon_close.png')

const s = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewFinder: {
    width: '100%'
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  controlIconContainer: {
    height: 48,
    width: 48,
    marginHorizontal: 8,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff'
  },
  controlIcon: {
    resizeMode: 'contain',
    height: 24,
    width: 24
  }
})

interface IPropTypes {
  visible: boolean
  onDone: (fsString: string) => void
  hide: () => void
}

export default function CameraModal(props: IPropTypes) {
  const { visible, hide, onDone } = props
  let camera = null
  const [height, setHeight] = useState(0)

  const snap = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync()
      onDone(photo.uri)
    }
  }

  return (
    <Modal visible={visible} animationType={'slide'} onRequestClose={hide}>
      <View style={s.cameraContainer}>
        <Camera
          ref={(ref) => {
            camera = ref
          }}
          autoFocus={true}
          style={[s.viewFinder, { height }]}
          onLayout={(event) => {
            setHeight((event.nativeEvent.layout.width / 3) * 4)
          }}
        />
        <View style={s.controlsContainer}>
          <TouchableOpacity style={s.controlIconContainer} onPress={hide}>
            <Image style={s.controlIcon} source={ICON_CLOSE} />
          </TouchableOpacity>
          <TouchableOpacity style={s.controlIconContainer} onPress={snap}>
            <Image style={s.controlIcon} source={ICON_CAMERA} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
