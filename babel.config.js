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
          '@types/context': './src/types/context/types',
          '@types/navigation': './src/types/navigation/types',
        },
      },
    ],
  ],
};
