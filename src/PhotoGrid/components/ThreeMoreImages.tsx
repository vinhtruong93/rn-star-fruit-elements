import ThemContext from 'Context';
import React, { useContext, useMemo } from 'react';
import { Pressable, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ImageStyle } from 'react-native-fast-image';
import Text from 'Text';
import Thumbnail from 'Thumbnail';
import { ImagesProps } from './OneImage';

const styles = StyleSheet.create({
  containOver: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtOver: {
    fontSize: 24,
    fontWeight: '600'
  }
});

const ImagesThree: React.FC<ImagesProps> = ({
  images, onPhotoPress, widthContainer, pressable
}) => {
  const context = useContext(ThemContext);

  const sizes: ImageStyle[] = useMemo(() => {
    const widthMinusSpacing = widthContainer;
    const widthUnit = Math.floor((widthMinusSpacing - 1) / 3)
    return [
      {
        width: widthUnit * 2,
        height: widthUnit * 2 * 1.25,
        borderRadius: 0,
        flexGrow: 1
      },
      {
        width: widthUnit,
        height: widthUnit * 1.25 - 1,
        borderRadius: 0
      }
    ]
  }, [widthContainer]);

  const overLength = useMemo(() => images.length - 3, [images]);

  return (<View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
  }}>
    <Pressable disabled={!pressable} onPress={() => onPhotoPress(images[0])}>
      <Thumbnail resizeMode={'cover'} style={sizes[0]} source={{
        uri: images && images[0]
      }} />
    </Pressable>

    <View style={{
      justifyContent: 'space-between',
    }}>
      <Pressable disabled={!pressable} onPress={() => onPhotoPress(images[1])}>
        <Thumbnail resizeMode={'cover'} style={sizes[1]} source={{
          uri: images && images[1]
        }} />
      </Pressable>

      <View>
        <Pressable disabled={!pressable} onPress={() => onPhotoPress(images[2])}>
          <Thumbnail resizeMode={'cover'} style={sizes[1]} source={{
            uri: images && images[2]
          }} />
        </Pressable>
        {
          overLength ? <TouchableOpacity disabled={!pressable} style={styles.containOver} onPress={() => onPhotoPress(images[2])}>
            <Text style={[styles.txtOver, { color: context.AppColors.white }]}>{`+ ${overLength}`}</Text>
          </TouchableOpacity> : null
        }
      </View>
    </View>
  </View>)
}

export default ImagesThree;