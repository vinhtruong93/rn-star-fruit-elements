import React, { useContext, useMemo } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Avatar from '../Avatar';
import Text from '../Text';
import { AvatarSizeType } from '../Avatar';
import ThemContext from 'Context';

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexShrink: 1, alignItems: 'center' },
  name: { fontWeight: '700', marginLeft: 8, alignSelf: 'flex-start' },
  right: { flexShrink: 1 },
  subText: { marginLeft: 8, alignSelf: 'flex-start' }
});

interface Props {
  /**
   * Size sẽ quyết định size của avatar và text có trong component này.
   * 
   * Có các trường hợp như sau:
   * 
   * small: avartar-24; name-10; subText-10
   * 
   * normal: avartar-40; name-12; subText-12
   * 
   * large: avartar-56; name-14; subText-14
   */
  size?: AvatarSizeType;
  avatar?: string;
  name?: string;
  id?: number;
  subText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Sự kiện xày ra khi nhấn vào avatar hoặc tên của user
   */
  onIdPress?: () => void;
}
export default React.memo((props: Props) => {
  const { containerStyle, avatar, size = 'normal', name, subText, onIdPress } = props;

  const context = useContext(ThemContext);

  const fontSize = useMemo((): number => {
    if (size === 'large') return context.FSize.S14;
    if (size === 'normal') return context.FSize.S12;
    if (size === 'small') return context.FSize.S10;
    return context.FSize.S12
  }, [size, context.FSize]);

  return (<View style={[styles.container, containerStyle]}>
    {avatar ? <Pressable onPress={onIdPress}><Avatar size={size} source={{ uri: avatar }} /></Pressable> : null}
    <View style={styles.right}>
      {name ? <Text onPress={onIdPress} numberOfLines={1} style={[styles.name, { fontSize }]}>{name}</Text> : null}
      {subText ? <Text numberOfLines={1} style={[styles.subText, { fontSize, color: context.AppColors.tertiary_grey, }]}>{subText}</Text> : null}
    </View>
  </View>);
});