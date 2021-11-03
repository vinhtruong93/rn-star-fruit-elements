import React from 'react'
import { StyleSheet, View } from 'react-native'
import Avatar from '../Avatar'

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'white'
  }
});

export default React.memo((props: { avatars: string[], max?: number, size?: number }) => {
  const { max = 4, size = 24 } = props;
  const avatars = props.avatars && props.avatars.slice(0, max);

  if (!avatars || avatars.length === 0)
    return null;

  return <View style={{ width: (avatars.length + 1) * (size / 2), height: size }}>
    {avatars.map((t, index) => {
      return <Avatar size={size} key={index} style={[styles.overlay, { left: index * size / 2 }]} source={{ uri: t }} />
    })}
  </View>
});