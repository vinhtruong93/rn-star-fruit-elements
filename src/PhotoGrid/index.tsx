import { getLinkFromImageName } from 'common';
import ThemContext from 'Context';
import React, { useContext, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import ImagesOne from './components/OneImage';
import ThreeMoreImages from './components/ThreeMoreImages';
import TwoImages from './components/TwoImages';
interface ImageItemDetailProps {
  imageNames?: string[],
  widthContainer?: number,
  pressable?: boolean
}
const PhotoGrid: React.FC<ImageItemDetailProps> = (props) => {
  const context = useContext(ThemContext);
  const dimensions = useWindowDimensions();

  const { pressable = false, widthContainer = dimensions.width - context.AppSpaces.S32, imageNames = [] } = props;

  const images = useMemo(() => {
    return imageNames.map((t => getLinkFromImageName(context.AWS_IMAGE_BASE_URL, t))) || []
  }, [imageNames])

  const onClickViewFull = (imageClick: string) => {
    const index = (images || []).findIndex((item) => {
      return imageClick === item
    });
    context.photosViewerHandle && context.photosViewerHandle(images, index)
  }

  if (!images || images.length === 0)
    return null;
  if (images.length === 1)
    return <ImagesOne pressable={pressable} images={images} widthContainer={widthContainer} onPhotoPress={onClickViewFull} />;
  if (images.length === 2)
    return <TwoImages pressable={pressable} widthContainer={widthContainer} images={images} onPhotoPress={onClickViewFull} />
  return <ThreeMoreImages pressable={pressable} widthContainer={widthContainer} images={images} onPhotoPress={onClickViewFull} />
}

export default PhotoGrid;