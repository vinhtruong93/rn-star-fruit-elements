import React, { Component } from 'react';
import { Animated, ImageSourcePropType, Platform, StyleProp, View } from 'react-native';
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image'
import assets from '../../assets';

interface IProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
  animated?: boolean;
  tintColor?: string;
}

interface IState {
  hasError?: boolean
}

export default class Thumbnail extends Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    borderRadius: 8,
    width: 48,
    height: 48
  };

  constructor(props: IProps) {
    super(props);
    this.onErrorHandle = this.onErrorHandle.bind(this);
    this.state = {
      hasError: false
    }
  }

  onErrorHandle() {
    this.setState({ hasError: true })
  }

  public render() {
    const imageAble = this.ImagePossible;
    const { width, height, borderRadius, resizeMode = 'cover', tintColor } = this.props;
    const Container = this.props.animated ? Animated.View : View;
    if (imageAble) {
      const { hasError } = this.state;
      const SafeImage = this.props.animated ? Animated.Image as any : FastImage;
      return Platform.select({
        android:
          <SafeImage
            defaultSource={assets.logo} // Note: On Android, the default source prop is ignored on debug builds.
            source={hasError ? assets.logo : this.props.source}
            resizeMode={resizeMode}
            tintColor={tintColor}
            style={[
              {
                borderRadius,
                height,
                width,
                tintColor
              },
              this.props.style
            ]}
            onError={this.onErrorHandle}
          />,
        ios:
          <SafeImage
            defaultSource={require('../../assets/logo.png')}
            source={hasError ? require('../../assets/logo.png') : this.props.source}
            resizeMode={resizeMode}
            tintColor={tintColor}
            style={[
              {
                borderRadius,
                height,
                overflow: 'hidden',
                width,
                tintColor
              },
              this.props.style
            ]}
            onError={this.onErrorHandle}
          />,
      });
    } else {
      const { hasError } = this.state;
      return <Container style={[{ width, height, borderRadius, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }]}>
        <FastImage
          style={[
            {
              borderRadius,
              height,
              width,
            },
            this.props.style,
          ]}
          source={hasError ? assets.logo : this.props.source} />
      </Container>

    }
  }

  get ImagePossible(): boolean {
    if (this.props.source && typeof this.props.source !== 'number' && !Array.isArray(this.props.source)) {
      if (!!!this.props.source.uri || this.props.source.uri && this.props.source.uri.length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      if (this.props.source) {
        return true;
      } else {
        return false;
      }
    }
  }
}