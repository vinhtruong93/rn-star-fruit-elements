import React, { useCallback, useMemo } from 'react';
import { Pressable } from 'react-native';
import { ImageStyle } from 'react-native-fast-image';
import Thumbnail from 'Thumbnail';

export interface ImagesProps {
  pressable?: boolean;
  images: string[];
  onPhotoPress: (url: string) => void;
  widthContainer: number;
}

const ImagesOne: React.FC<ImagesProps> = ({
  images, onPhotoPress,
  widthContainer,
  pressable
}) => {
  const onPress = useCallback(() => {
    onPhotoPress(images[0])
  }, [onPhotoPress, images]);

  const size: ImageStyle = useMemo(() => {
    return {
      width: widthContainer,
      height: widthContainer * 1.25,
      borderRadius: 0
    }
  }, [widthContainer]);

  return (
    <Pressable disabled={!pressable} onPress={onPress}>
      <Thumbnail resizeMode='cover' style={size} source={{
        uri: images[0]
      }} />
    </Pressable>)
}

export default ImagesOne;