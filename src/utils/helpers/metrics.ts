import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const designFrameWidth = 440;
const designFrameHeight = 956;

const verticalScale = (size: number) => (size / designFrameHeight) * height;
const horizontalScale = (size: number) => (size / designFrameWidth) * width;

export { horizontalScale, verticalScale };
