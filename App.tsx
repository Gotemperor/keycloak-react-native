import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
// import {
//   IKeycloakConfiguration,
//   KeycloakProvider,
//   useKeycloak,
// } from 'expo-keycloak';

import { KeycloakProvider, useKeycloak } from "expo-keycloak-auth";

// import keycloak from './keycloak';
import Login from "./screens/Login";
import AppConfig from './app.json';

  // const keycloakConfiguration: IKeycloakConfiguration = {
  //   url: 'https://idp.grasp.systems:8443/auth',
  //   realm: 'local-test',
  //   clientId: 'client2',
  //   scheme: AppConfig.expo.scheme,
  // }
const keycloakConfiguration = {
    url: 'https://idp.grasp.systems:8443/auth',
    realm: 'local-test',
    clientId: 'client2',
    // scheme: AppConfig.expo.scheme,
};

export default function App() {
    const {
        ready, // If the discovery is already fetched
        login, // The login function - opens the browser
        isLoggedIn, // Helper boolean to use e.g. in your components down the tree
        token, // Access token, if available
        logout, // Logs the user out
    } = useKeycloak();


  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <KeycloakProvider {...keycloakConfiguration}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
          {console.log('app token', token, isLoggedIn)}

        <StatusBar />
      </SafeAreaProvider>
        </KeycloakProvider>
    );
  }
}
