"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
const assets_1 = __importDefault(require("../../assets"));
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
class Avatar extends react_1.Component {
    static defaultProps = {
        rounded: true,
        size: 40,
        resizeMode: 'cover'
    };
    constructor(props) {
        super(props);
        this.onErrorHandle = this.onErrorHandle.bind(this);
        this.LetlerWords = this.LetlerWords.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
        this.state = {
            hasError: false
        };
    }
    render() {
        const size = this.getImageSize;
        const imageAble = this.ImagePossible;
        if (imageAble) {
            const { hasError } = this.state;
            const SafeImage = this.props.animatedIntegrated ? react_native_1.Animated.Image : react_native_fast_image_1.default;
            return react_native_1.Platform.select({
                android: <SafeImage defaultSource={assets_1.default.account_placeholder} // Note: On Android, the default source prop is ignored on debug builds.
                 source={hasError ? assets_1.default.account_placeholder : this.props.source} resizeMode={this.props.resizeMode} style={[
                        {
                            borderRadius: this.props.rounded ? size / 2 : undefined,
                            height: size,
                            width: size,
                        },
                        this.props.style
                    ]} onError={this.onErrorHandle}/>,
                ios: <SafeImage defaultSource={assets_1.default.account_placeholder} source={hasError ? assets_1.default.account_placeholder : this.props.source} resizeMode={this.props.resizeMode} style={[
                        {
                            borderRadius: this.props.rounded ? size / 2 : undefined,
                            height: size,
                            width: size,
                        },
                        this.props.style
                    ]} onError={this.onErrorHandle}/>,
            });
        }
        else {
            return <react_native_fast_image_1.default style={[
                    {
                        borderRadius: this.props.rounded ? size / 2 : undefined,
                        height: size,
                        width: size,
                    },
                    this.props.style,
                ]} source={assets_1.default.account_placeholder}/>;
        }
    }
    get ImagePossible() {
        if (this.props.source && typeof this.props.source !== 'number' && !Array.isArray(this.props.source)) {
            if (!!!this.props.source.uri || this.props.source.uri && this.props.source.uri.length === 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (this.props.source) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    get PlaceHolderName() {
        if (this.props.placeHolderName) {
            const letters = this.LetlerWords(this.props.placeHolderName);
            if (letters) {
                let result = '';
                const lenght = letters.length;
                if (lenght > 1) {
                    if (letters[lenght - 2]) {
                        result += letters[lenght - 2];
                    }
                    if (letters[lenght - 1]) {
                        result += letters[lenght - 1];
                    }
                }
                else {
                    if (letters[0]) {
                        result = letters[0];
                    }
                    else {
                        result = undefined;
                    }
                }
                return result;
            }
            else {
                return undefined;
            }
        }
        return undefined;
    }
    LetlerWords(text) {
        return text.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
    }
    get getImageSize() {
        return typeof this.props.size === 'number' ? this.props.size : SIZE_UNIT[this.props.size];
    }
    get getPlaceHolderTextSize() {
        return typeof this.props.size === 'number' ? PLACE_HOLDER_TEXT_SIZE.large : PLACE_HOLDER_TEXT_SIZE[this.props.size];
    }
    onErrorHandle() {
        this.setState({ hasError: true });
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
exports.default = Avatar;
