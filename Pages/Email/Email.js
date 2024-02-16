import React, {useState} from 'react';
import {Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Platform, StyleSheet, TouchableWithoutFeedback,Keyboard } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import useDBService from '../../services/DBService';
import {userEmail} from './../../actions';
import { useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss";
export default function Email({navigation}) {
    const {t} = useTranslation();
    const [email, setEmail] = useState(''); 
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [valid, setValid] = useState(true);
    const [disable, setDisable] = useState(true);

    const [dbError, setDbError] = useState(false);
    const {loading, error, checkUserEmail, process, setProcess} = useDBService();
    const dispatch = useDispatch();

    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          setEmail(text)
          setValid(false)
          setDisable(true)    
        }
        else {
          setEmail(text)
          setValid(true)
          setDisable(false) 
        }
      }

    const sendEmail = (userEmail) => {
      checkUserEmail(userEmail).then(checkEmail)
    }
    const checkEmail = (dbEmail) => {
      if(dbEmail) {
        setDbError(true)
        setDisable(true)
        setProcess('error')
      } else {
        setProcess('confirmed')
        navigation.navigate('Gender')
        dispatch(userEmail(email))
      }
    }
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
          <View style={styled.container}>
             <ImageBackground
                resizeMode='cover'
                style={styled.back}
                source={icons.backRedFull}>
    
        <SafeAreaView style={styled.email}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View
                style={[styled.wrapper, {flex: isShowKeyboard ? .2 : 0.48}]}>
                <Header onPress={() => navigation.goBack()} isWhite={true} />
                <Image
                    style={styled.image}
                    source={icons.headerName}/>
                    {
                        isShowKeyboard ? null :
                        <Image
                        style={styled.email__img}
                        source={icons.first} />
                    }
        
            </View>
            <View style={{flex: isShowKeyboard ? 0.8 : 0.52, justifyContent: 'flex-end'}}>
                <Text
                    style={[styled.email__title, {fontSize: RFValue ( 22,  740)}]}>
                    E-mail
                </Text>
                <TextInput
                    style={[styled.email__input, {borderColor: valid ? 'rgba(12, 3, 0, 0.5)' : '#FF0000', marginBottom: valid ? 60 : 39}]}
                    value = {email}
                    onChangeText = {(text)=> {validateEmail(text)
                                              setDbError(false)}}
                    onFocus={() => {setIsShowKeyboard(true);}}
                    onBlur={() => {setIsShowKeyboard(false);
                        }}
                    
                />
                {valid ? 
                null : <Text style={[styled.email__error, {fontSize: RFValue ( 14,  740)}]}>Enter the correct e-mail</Text>
                }

                {dbError ? 
                <Text style={[styled.email__error, {fontSize: RFValue ( 14,  740)}]}>Log in, please</Text> : null
                }

                <View style={{marginBottom: isShowKeyboard ? 5 : 20}}>
                    <BtnButton onPress={() => {sendEmail(email)}} title={t('continue')} buttonStyle={{backgroundColor: '#F55926',borderWidth: 2, borderColor: '#F55926', opacity: disable  ? .7 : 1, pointerEvents: disable ? 'none' : 'auto'}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
                    <BtnButton onPress={() => navigation.navigate('Auth')} title={t('logIn')} buttonStyle={{marginTop: isShowKeyboard ? 5 : 15, marginBottom: isShowKeyboard ? 5 : 20 }} textStyle={{color: 'black'}}/>
                </View>

            </View>
           
          </View>
        </TouchableWithoutFeedback>
        </SafeAreaView>
        </ImageBackground>
        </View>
      </KeyboardAvoidingView>

    )

   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inner: {
      flex: 1,
      justifyContent: 'space-between',
    },
  });