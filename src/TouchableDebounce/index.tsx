import { HitSlop } from 'common';
import React, { PropsWithChildren, useEffect } from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  GestureResponderEvent,
  TouchableOpacity, TouchableOpacityProps
} from 'react-native';
import { ContainedTouchableProperties, TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler';

export interface TouchableDebounceProps extends PropsWithChildren<TouchableOpacityProps & ContainedTouchableProperties> {
  /**
   * Duration delay for the next action. Default = 500ms
   */
  interval?: number,
  loading?: boolean,
  loadingProps?: ActivityIndicatorProps,
  noDebounce?: boolean,
  usingGHTouchableOpacity?: boolean,
}
export default React.forwardRef<any, TouchableDebounceProps>((props, ref) => {
  const { loading = false, noDebounce } = props;
  let keepDelay: boolean = true;
  const defaultInterval: number = 500;
  let timeOutScroll: number | undefined;

  useEffect(() => {
    timeOutScroll && clearTimeout(timeOutScroll);
  }, [])

  const debounce = (event: GestureResponderEvent) => {
    if (props.onPress) {
      if (keepDelay) {
        keepDelay = false;
        props.onPress(event)
        timeOutScroll = setTimeout(() => {
          keepDelay = true;
        }, props.interval || defaultInterval);
      }
    }
  };

  if (props.usingGHTouchableOpacity) {
    return <GHTouchableOpacity
      hitSlop={HitSlop}
      ref={ref}
      activeOpacity={0.6}
      {...props}
      onPress={(event) => {
        if (loading) return;
        if (noDebounce) {
          props.onPress && props.onPress(event);
          return;
        }
        requestAnimationFrame(() => {
          debounce(event)
        });
      }}
    >
      {
        loading ?
          <ActivityIndicator color='white' {...props.loadingProps} /> :
          props.children
      }
    </ GHTouchableOpacity >
  }
  else {
    return <TouchableOpacity
      ref={ref}
      activeOpacity={0.6}
      {...props}
      onPress={(event) => {
        if (loading) return;
        if (noDebounce) {
          props.onPress && props.onPress(event);
          return;
        }
        requestAnimationFrame(() => {
          debounce(event)
        });
      }}
    >
      {
        loading ?
          <ActivityIndicator color='white' {...props.loadingProps} /> :
          props.children
      }
    </ TouchableOpacity >
  }
})
