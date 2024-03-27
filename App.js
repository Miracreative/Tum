import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import MainStack from './navigate';
import { createStore} from 'redux';

import reducer from './reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "hagrid": require("./assets/fonts/HagridTextTrial-Bold.ttf"),
    "hagrid-light": require("./assets/fonts/HagridTextTrial-Light.ttf"),
    "inter": require("./assets/fonts/Inter-Regular.ttf"),
  })

  const [appIsReady, setAppIsReady] = useState(false);


  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
      try {
        // await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  
  return (
    <View onLayout={onLayoutRootView} style={{flex: 1}}>
      <Provider store={store}>
        <MainStack />
      </Provider>
    </View>
 
  );
}
