type FontStyle = {
  fontFamily: string;
  fontWeight: 'light' | 'regular' | 'bold';
};

export const font: Record<'light' | 'regular' | 'bold', FontStyle> = {
  light: {
    fontFamily: 'AeonikTRIAL-Light',
    fontWeight: 'light',
  },
  regular: {
    fontFamily: 'AeonikTRIAL-Regular',
    fontWeight: 'regular',
  },
  bold: {
    fontFamily: 'AeonikTRIAL-Bold',
    fontWeight: 'bold',
  },
};

export const color = {
  black: '#050303',
  background: '#F3F2EF',
  primary: '#016FB9',
  secondary: '#FAFAFA',
  primary_pressed_state: '#1F93E1',
};
