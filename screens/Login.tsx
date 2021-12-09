import * as React from 'react';
import {Alert, Pressable, StyleSheet, TextInput} from 'react-native';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import GlobalStyles from "../utils/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from 'react-native';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false)
    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setIsValid(false);
            return false;
        }
        else {
            setIsValid(true);
            setEmail(text);
        }
    }

    useEffect(() => {
        // getData();
    }, []);
    const getData = () =>{
        try{
            AsyncStorage.getItem('email').then(res => {
                if(res){

                    navigation.navigate('TabTwo');
                }
            })
        }
        catch(err){console.log(err)}
    }

    const onPressSubmit = async () => {
        if(isValid){
            //call server???
            console.log('email on login', email)
            try{
                await AsyncStorage.setItem('email', email)
                navigation.navigate('TabTwo');
                // Linking.openURL( 'https://idp.grasp.systems:8443/auth' );

            }
            catch (err){
                console.log(err)
            }
        } else{
            Alert.alert('Warning', 'Email must be a valid email',
                [
                    { text: 'OK'}
                ], {cancelable: true, onDismiss: () => {}})
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.separator}/>
            <TextInput placeholder={'Your Email'}
                       style={GlobalStyles.input}
                       secureTextEntry={false}
                       onChangeText={(value) => validate(value)}
            />

            <Pressable onPress={onPressSubmit}
                       disabled={!isValid}
                style={({pressed}) => [
                {backgroundColor: pressed ? '#FF1493' : !isValid ? '#B0B0B0' : '#FFC0CB'},

                styles.button
            ]} ><Text>Login</Text>
            </Pressable>
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
