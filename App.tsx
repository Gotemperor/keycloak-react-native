import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ReactNativeKeycloakProvider } from '@react-keycloak/native';


import keycloak from './keycloak';
import Login from "./screens/Login";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <ReactNativeKeycloakProvider
            initOptions={{
              redirectUri: 'myapp://TabOne',
              // if you need to customize "react-native-inappbrowser-reborn" View you can use the following attribute
                onLoad: "login-required",
                'public-client': true,
                // onLoad: 'check-sso',
                // silentCheckSsoRedirectUri: 'https://www.npmjs.com/package/expo-keycloak',
                // LoadingComponent: Login,
                // isLoadingCheck: true
            }}
            authClient={keycloak}
        >
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
       </ReactNativeKeycloakProvider>
    );
  }
}
