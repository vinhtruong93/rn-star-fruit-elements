import React, { ProviderProps } from 'react';
import { AppColors, AppSpaces, AWS_IMAGE_BASE_URL, AWS_IMAGE_FOLDERS, fontFamily, FSize } from 'Theme';

export interface ThemeContextType {
  AppColors: typeof AppColors,
  FSize: typeof FSize,
  AppSpaces: typeof AppSpaces,
  fontFamily: typeof fontFamily,
  AWS_IMAGE_FOLDERS: typeof AWS_IMAGE_FOLDERS,
  AWS_IMAGE_BASE_URL: typeof AWS_IMAGE_BASE_URL,
  photosViewerHandle?: (photos: string[], index: number) => void;
}
const ThemContext = React.createContext<ThemeContextType>({ AppColors, FSize, AppSpaces, fontFamily, AWS_IMAGE_FOLDERS, AWS_IMAGE_BASE_URL });

export const Consumer = ThemContext.Consumer;

export const ThemeProvider = (props: ProviderProps<ThemeContextType>) => {
  return (<ThemContext.Provider value={props.value} >
    {props.children}
  </ThemContext.Provider>
  )
}

export default ThemContext
