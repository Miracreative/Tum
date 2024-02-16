// const { getDefaultConfig } = require("metro-config");
const {getDefaultConfig} = require("metro-config");

// module.exports = (async () => {
//   const {   
//     resolver: {sourceExts},
//   } = await getDefaultConfig();
  
//   return {
//     transformer: {  
//       babelTransformerPath: require.resolve('react-native-reanimated/plugin'),
//       experimentalImportSupport: false,
//       assetRegistryPath: '__asets__',
//     },
//     projectRoot: __dirname,
//     watchFolders: [__dirname],
//     sourceMaps: "inline",
//     maxWorkers: "number_of_cores",
//     serializer: {
//       getModulesRunBeforeMainModule: () => [require.resolve("./polyfills")],
//     },
//     resolver: {
//       extraNodeModules: {
//         react: require.resolve("react"),
//         "react-native": require.resolve("@react-native-community/core"),
//       },
//       nodeResolveExtensions: [...sourceExts, ".js", "cjs"],
//     },
//   };
// })();

module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-sass-transformer")
    },
    resolver: {
      sourceExts: [...sourceExts, "scss", "sass"]
    }
  };
})();