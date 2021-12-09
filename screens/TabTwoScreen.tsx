import * as React from 'react';
import {Button, Pressable, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
 import { useKeycloak } from '@react-keycloak/native';

export default function TabTwoScreen({navigation, route}) {
  const {ItemName, ItemId} = route.params;
     const [keycloak, initialized] = useKeycloak();
    const [email, setEmail] = useState('');
    useEffect(() => {
        getData();
    }, []);
    const getData =  () =>{
        try{
            AsyncStorage.getItem('email').then(res => {
                console.log('email on two tabs', res)
                if(res){
                    setEmail(res);
                }
            })
        }
        catch(err){console.log(err)}
    }
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
        <Text style={styles.title}> email {email}</Text>
        <View>
            <Text>
                {console.log(keycloak)}

                {`User is ${!keycloak.authenticated ? 'NOT ' : ''}authenticated`}
                <Button onPress={() => keycloak?.login().then(() => {
                console.log('login')
                }).catch(err => console.log('err', err))
                } title="Login" />
            </Text>

            {!!keycloak.authenticated && (
                <Button onPress={() => keycloak.logout()} title="Logout" />
            )}
        </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />

      <Text>Name: {ItemName} id: {ItemId}</Text>

      <Pressable onPress={goBack}  style={({pressed}) => [
        {backgroundColor: pressed ? '#FF1493' : '#FFC0CB'},
        styles.button
      ]} ><Text>Go back</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
    button: {
        textAlign: "center",
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        width: 100, height: 60,
        marginBottom:20}
});
