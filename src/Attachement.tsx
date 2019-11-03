import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, Image, Linking, TouchableHighlight } from 'react-native'

const s = StyleSheet.create({
  photo: {
    width: '100%'
  },
  linkButton: {
    flex: 1
  },
  linkText: {
    color: '#4630EB',
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: '#4630EB'
  }
})

export interface IAttachmentType {
  type: 'url' | 'image'
  link: string
}

export default function Attachment(props: { attachment: IAttachmentType }) {
  const { attachment } = props
  const [height, setHeight] = useState(0)

  switch (attachment.type) {
    case 'image':
      return (
        <Image
          source={{ uri: attachment.link }}
          style={[s.photo, { height }]}
          onLayout={(event) => {
            setHeight((event.nativeEvent.layout.width / 3) * 4)
          }}
        />
      )
    case 'url':
      return (
        <TouchableOpacity
          style={s.linkButton}
          onPress={() => {
            Linking.openURL(attachment.link)
          }}
        >
          <Text style={s.linkText}>{attachment.link}</Text>
        </TouchableOpacity>
      )
    default:
      return null
  }
}
