import React, { useState } from "react";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import store from "./src/store";
import ShopNavigator from "./src/navigation/ShopNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;
