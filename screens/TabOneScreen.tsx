import * as React from 'react';
import {
    Alert,
    Button,
    FlatList, Image, ImageBackground,
    Linking, Modal, Pressable,
    RefreshControl,
    ScrollView,
    SectionList,
    StyleSheet,
    TextInput, TouchableHighlight,
    TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import GlobalStyles from "../utils/GlobalStyles";
import {
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold
} from '@expo-google-fonts/dancing-script'

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {useState} from "react";
import {useFonts} from "expo-font";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
    let [fontsLoaded] = useFonts({DancingScript_400Regular,
        DancingScript_500Medium,
        DancingScript_600SemiBold,
        DancingScript_700Bold,
        'Oswald-Bold': require('../assets/fonts/Oswald-Bold.ttf')})
  const [count, setCount] = useState(0);

  const goToTabTwo = () =>{
      navigation.navigate('TabTwo')
  }
  const [name, setName] = useState('');
  const [increased, setIncreased] = useState(0);
  const [info, setInfo] = useState([
    {name: 'elen', key: '1'},
    {name: 'elen', key: '2'},
    {name: 'elen', key: '3'},
    {name: 'elen', key: '4'},
    {name: 'elen', key: '5'},
    {name: 'elen', key: '11'},
    {name: 'elen', key: '22'},
    {name: 'elen', key: '33'},
    {name: 'elen', key: '44'},
    {name: 'elen', key: '55'},
  ]);
  const DATA =  [
    {title: 'elen', data:['1','2'] },
    {title: 'elen2', data:['5','6'] },

  ];
  const [submitted, setSubmitted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const onPressSubmit = () => {
      if(name.length > 3){
          setSubmitted(!submitted);
      } else{
          setModalVisible(!modalVisible);
          // Alert.alert('Warning', 'Name must be longer than 3 charancters',
          //     [
          //         { text: 'Do not show again', onPress: () => console.log('do not show again')},
          //         { text: 'Cancel', onPress: () => console.log('cancel pressed')},
          //         { text: 'OK', onPress: () => console.log('ok pressed')}

          //     ], {cancelable: true, onDismiss: () => console.log('dismissed')})


      }
  }
    const onCloseModal = () =>{
        setModalVisible(false);
    }
  const [Refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setInfo([...info, {key: 6, name: 'elena666'}])
    setRefreshing(false);
  }

  const increaseCounter = () => {
    setCount(count + 1)
    setIncreased(increased + 5)
  }
  return (
      // <ScrollView contentInsetAdjustmentBehavior={"automatic"}
      // style={styles.scrollView}>
      <ImageBackground source={require('../assets/images/back.jpg')} style={styles.centeredModel}>
      <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) =>(
                    <View style={styles.item}>
                      <Text>{item} </Text>
                    </View>
          )

          }
          renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.item}>{title}</Text>
          )}
      />

      <TextInput placeholder={'Your Name'}
                 style={GlobalStyles.input}
                 keyboardType={'number-pad'}
                 maxLength={22}
                secureTextEntry={true}
          onChangeText={(value) => setName(value)}
      />
        {/*<Button title={submitted ? 'Clear' : 'Submit'} onPress={onPressSubmit} color='red'/>*/}
        {submitted ?
            <View style={ styles.container}>
                <Image source={require('../assets/images/success-icon-png-8.png')}
                          style={styles.image}
                          resizeMode={'stretch'}
            />
                <Text>You are resgistrated as {name}</Text>
            </View>
             : null}
       <View style={styles.holder}>
       {/* <TouchableOpacity*/}
       {/*     style={styles.button}*/}
       {/*     onPress={onPressSubmit}*/}
       {/*     activeOpacity={0.6}*/}
       {/* >*/}
       {/*   <Text style={styles.text}>{submitted ? 'Clear' : 'Submit'}</Text>*/}
       {/* </TouchableOpacity>*/}
       {/*  <TouchableHighlight*/}
       {/*      style={styles.button}*/}
       {/*      onPress={onPressSubmit}*/}
       {/*      underlayColor={'black'}*/}
       {/*      activeOpacity={0.6}*/}
       {/*  >*/}
       {/*    <Text style={styles.text}>{submitted ? 'Clear' : 'Submit'}</Text>*/}
       {/*  </TouchableHighlight>*/}

       {/*  <TouchableWithoutFeedback*/}
       {/*      onPress={onPressSubmit}*/}
       {/*  >*/}
       {/*    <Text style={styles.button}>{submitted ? 'Clear' : 'Submit'}</Text>*/}
       {/*  </TouchableWithoutFeedback>*/}
       </View>
          <Text style={GlobalStyles.red}>Almost before we knew it, we had left the ground</Text>
        <Pressable onPress={onPressSubmit}  style={({pressed}) => [
            {backgroundColor: pressed ? '#FF1493' : '#FFC0CB'},
            styles.button
        ]} ><Text>Submit</Text></Pressable>

          <Pressable onPress={goToTabTwo}  style={({pressed}) => [
              {backgroundColor: pressed ? '#FF1493' : '#FFC0CB'},
              styles.button
          ]} ><Text>Go to tab two</Text></Pressable>

           <Modal
               animationType="fade"
               transparent={true}
               visible={modalVisible}
               onRequestClose={() => {
                   setModalVisible(!modalVisible);
               }}
           >
               <View style={styles.centeredModel}>
                   <View style={styles.modalContent}>
                       <Image source={require('../assets/images/error-image-icon-23.png')}
                              style={styles.image}
                              resizeMode={'stretch'}
                       />
                   <Text>Name must be longer than 3 charancters</Text>
                   <Pressable style={styles.button} onPress={onCloseModal} >
                       <Text style={styles.text}>Ok</Text>
                   </Pressable>
                   </View>
               </View>
           </Modal>
      </ImageBackground>
      //   <FlatList keyExtractor={(item, index) => index.toString()}
      //                data={info}
      //             renderItem={({item}) => (
      //
      //       <View style={styles.item}>
      //         <Text>{item.name}  {item.index}</Text>
      //       </View>
      //   )}
      //             refreshControl={<RefreshControl refreshing={Refreshing}
      //                                             onRefresh={onRefresh} colors={['#fff']}
      //             />
      //             }
      //   />

    // <View style={styles.container}>
    //   <View style={styles.view1}>
    //     <Text>1</Text>
    //   </View>
    //   <View style={styles.view2}>
    //     <Text>2</Text>
    //   </View>
    //   <Text style={styles.title}>Tab One test</Text>
    //   <Text>{count}</Text>
    //   <Text>{increased}</Text>
    //   {/*<Button title={'youtube'} */}
    //   {/*        onPress={()=>Linking.openURL('https://www.youtube.com/watch?v=ANdSdIlgsEw')} ></Button>*/}
    //   <View style={styles.button}>
    //   <Button title={'increase counter'}
    //           onPress={increaseCounter} ></Button>
    //   </View>
    //
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    // </View>

      // </ScrollView>
  );
}

const styles = StyleSheet.create({
  holder:{
      display: "flex",
      justifyContent: "center",
       alignItems: 'center'
  },
    centeredModel: { display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 0, 0, 0.4)'
        },
    image: {width:100, height:100},
    modalContent: { display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#fff',
        width:250,
        height:200,
        borderRadius: 20
    },
  scrollView:{
     backgroundColor: 'black',
  },
  text: {color: 'red', fontSize: 35},

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    height: 100,
    backgroundColor: 'blue',
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
  view1: {width:100,
    height:100,
    backgroundColor: "yellow",
    alignItems: 'center',
    justifyContent: 'center'},
  view2: {width:100,
    height:100,
    backgroundColor: "purple",
    alignItems: 'center',
    justifyContent: 'center'},
  button: {
      textAlign: "center",
      display: "flex",
      alignItems: 'center',
      justifyContent: 'center',
      width: 100, height: 60,
      marginBottom:20}
});
