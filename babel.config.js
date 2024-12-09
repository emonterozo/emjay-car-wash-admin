module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          // This has to be mirrored in tsconfig.json
          '@app/screens': './src/screens',
          '@app/components': './src/components',
          '@app/context': './src/context/GlobalContext.tsx',
          '@app/metrics': './src/utils/helpers/metrics.tsx',
          '@app/constant': './src/utils/constant/constant.ts',
          '@types/context': './src/types/context/types.ts',
        },
      },
    ],
  ],
};
