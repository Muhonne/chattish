import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Attachment, { IAttachmentType } from './Attachement'

export interface IMessage {
  id: string
  senderId: string
  name: string
  timestamp: number // milliseconds
  text?: string
  attachment?: IAttachmentType
}

const s = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    backgroundColor: '#ffd052',
    marginRight: 16,
    padding: 12,
    borderRadius: 4
  },
  messageContainerOwn: {
    marginRight: 0,
    marginLeft: 16
  },
  messageContainerSwitchSender: {
    marginBottom: 8
  },
  messageText: {
    fontSize: 16,
    color: '#000'
  }
})
type PropTypes = {
  own: boolean
  message: IMessage
  switchSender: boolean
}
export default function Message(props: PropTypes) {
  const { own, message, switchSender } = props
  return (
    <View style={[s.messageContainer, own && s.messageContainerOwn, switchSender && s.messageContainerSwitchSender]}>
      {!!message.text && <Text style={s.messageText}>{message.text}</Text>}
      {message.attachment && <Attachment attachment={message.attachment} />}
    </View>
  )
}
