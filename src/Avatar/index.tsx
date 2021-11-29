import React, { Component } from 'react';
import { Animated, ImageSourcePropType, Platform, StyleProp } from 'react-native';
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image'

const SIZE_UNIT = {
  /**
   * Size 24
   */
  small: 24,
  /**
   * Size 40
   */
  normal: 40,
  /**
   * Size 56
   */
  large: 56,
};

const PLACE_HOLDER_TEXT_SIZE = {
  small: 14,
  normal: 18,
  large: 22,
};

export type AvatarSizeType = keyof typeof SIZE_UNIT;
interface IProps {
  size?: number | AvatarSizeType;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  rounded?: boolean,
  resizeMode?: ResizeMode;
  animatedIntegrated?: boolean;
  /**
   * Dùng để hiển thị chữ cái đầu in hoa nếu trường hợp không load được hình ảnh hoặc url undefined
   */
  placeHolderName?: string;
  backgroundPlaceHolder?: string;
}

interface IState {
  hasError?: boolean
}

export default class Avatar extends Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    rounded: true,
    size: 40,
    resizeMode: 'cover'
  };

  constructor(props: IProps) {
    super(props);
    this.onErrorHandle = this.onErrorHandle.bind(this);
    this.LetlerWords = this.LetlerWords.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
    this.state = {
      hasError: false
    }
  }

  public render() {
    const size = this.getImageSize;
    const imageAble = this.ImagePossible;
    if (imageAble) {
      const { hasError } = this.state;
      const SafeImage = this.props.animatedIntegrated ? Animated.Image as any : FastImage;
      return Platform.select({
        android:
          <SafeImage
            defaultSource={require('../../assets/account_placeholder.png')} // Note: On Android, the default source prop is ignored on debug builds.
            source={hasError ? require('../../assets/account_placeholder.png') : this.props.source}
            resizeMode={this.props.resizeMode}
            style={[
              {
                borderRadius: this.props.rounded ? size / 2 : undefined,
                height: size,
                width: size,
              },
              this.props.style
            ]}
            onError={this.onErrorHandle}
          />
        ,
        ios:
          <SafeImage
            defaultSource={require('../../assets/account_placeholder.png')}
            source={hasError ? require('../../assets/account_placeholder.png') : this.props.source}
            resizeMode={this.props.resizeMode}
            style={[
              {
                borderRadius: this.props.rounded ? size / 2 : undefined,
                height: size,
                width: size,
              },
              this.props.style
            ]}
            onError={this.onErrorHandle}
          />,
      });
    } else {
      return <FastImage
        style={[
          {
            borderRadius: this.props.rounded ? size / 2 : undefined,
            height: size,
            width: size,
          },
          this.props.style,
        ]}
        source={require('../../assets/account_placeholder.png')} />
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

  get PlaceHolderName(): string | undefined {
    if (this.props.placeHolderName) {
      const letters = this.LetlerWords(this.props.placeHolderName);
      if (letters) {
        let result: string | undefined = '';
        const lenght = letters.length;
        if (lenght > 1) {
          if (letters[lenght - 2]) {
            result += letters[lenght - 2]
          }
          if (letters[lenght - 1]) {
            result += letters[lenght - 1]
          }
        } else {
          if (letters[0]) {
            result = letters[0];
          } else {
            result = undefined;
          }
        }
        return result;
      } else {
        return undefined;
      }
    }
    return undefined;
  }

  LetlerWords(text: string) {
    return text.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
  }

  get getImageSize() {
    return typeof this.props.size === 'number' ? this.props.size : SIZE_UNIT[this.props.size!];
  }

  get getPlaceHolderTextSize() {
    return typeof this.props.size === 'number' ? PLACE_HOLDER_TEXT_SIZE.large : PLACE_HOLDER_TEXT_SIZE[this.props.size!];
  }

  onErrorHandle() {
    this.setState({ hasError: true })
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}