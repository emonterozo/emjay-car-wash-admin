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
          '@app/context': './src/context/GlobalContext.ts',
          '@app/metrics': './src/utils/helpers/metrics.ts',
          '@app/services': './src/services/services.ts',
          '@app/constant': './src/utils/constant/constant.ts',
          '@types/context': './src/types/context/types.ts',
          '@app/icons': './assets/icons',
        },
      },
    ],
  ],
};
