import React, { useMemo } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { ImageStyle } from 'react-native-fast-image';
import Thumbnail from 'Thumbnail';
import { ImagesProps } from './OneImage';

const ImagesTwo: React.FC<ImagesProps> = ({
  images, onPhotoPress, widthContainer, pressable
}) => {

  const size: ImageStyle = useMemo(() => {
    const width = Math.floor((widthContainer - 1) / 2);
    return {
      width,
      height: width * 1.25,
      borderRadius: 0
    }
  }, [widthContainer]);


  return (<View style={styles.row}>
    <Pressable disabled={!pressable} onPress={() => onPhotoPress(images[0])}>
      <Thumbnail resizeMode='cover' style={size} source={{
        uri: images[0]
      }} />
    </Pressable>
    <Pressable disabled={!pressable} onPress={() => onPhotoPress(images[1])}>
      <Thumbnail resizeMode='cover' style={size} source={{
        uri: images[1]
      }} />
    </Pressable>
  </View>)
}

export default ImagesTwo;


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});