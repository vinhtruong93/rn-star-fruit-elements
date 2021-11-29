import { Insets } from "react-native";
import { AWS_IMAGE_FOLDERS_TYPE } from "Theme";

export const HitSlop: Insets = { left: 10, top: 10, bottom: 10, right: 10 };

export const getLinkFromImageName = (baseUrl: string, imageName: string, options: AWS_IMAGE_FOLDERS_TYPE = 'ex-lg') => {
  return baseUrl + options + '/' + imageName;
}