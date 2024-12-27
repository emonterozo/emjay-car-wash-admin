import { StyleSheet, Dimensions } from 'react-native';


export const COLORS = {
  primary: '#016FB9',
  secondary: '#FAFAFA',
  pressed: '#1F93E1',
};

export const FONTS = {
  regular: 'AeonikTRIAL-Regular',
  bold: 'AeonikTRIAL-Bold',
};

export const globalStyles = StyleSheet.create({
  buttonLarge: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 49,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: Dimensions.get('window').width - 48,
  },
  buttonSmall: {
    paddingHorizontal: 23,
    paddingVertical: 18,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: Dimensions.get('window').width - 254,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: FONTS.regular,
    lineHeight: 24,
  },
  buttonTextColorDisabled: {
    color: COLORS.primary,
  },
  buttonTextColor: {
    color: COLORS.secondary,
  },
});
