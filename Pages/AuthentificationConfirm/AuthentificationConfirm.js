import React, { useState, useRef, useEffect } from "react";
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';

// import firebase from "firebase/compat/app";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import { userPhone } from "../../actions";
import BtnButton from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import styled from "./style.scss";

export default function AuthConfirm({ navigation }) {
  const { t } = useTranslation();
//   const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState("");
  const [incorrectCode, setIncorrectCode] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [valid, setValid] = useState(true);
  const [disable, setDisable] = useState(true);
  const [time, setTime] = useState(10)
  const [readySend, setReadySend] = useState(false)
  const intervalRef = useRef(0);
  const dispatch = useDispatch();
const phoneNumber = useSelector(state => state.userInfo.phone)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
        // console.log('tick');
        if (time <= 0) {
            setTime(0)
            setReadySend(true)
            clearInterval(intervalRef.current)
            return () => clearInterval(intervalRef.current)
        }
        setTime(time => time - 1)
      }, 1000);
      return () => clearInterval(intervalRef.current)
  })

  const signInWithPhoneNumber = async () => {
    try {
        console.log(phoneNumber);
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation)
    } catch (error) {
        console.log("Error: ", error);
    }
  }

  const confirmCode = async () => {
    try {
        const userCredential = await confirm.confirm(code);
        const user = userCredential.user;

        //check if the user is new or existing
        const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

        if (userDocument.exists) {
            console.log('user exists');
            // go to dashboard
        } else {
            console.log('user is new');
            // navigation.navigate('Detail', {uid: user.uid})
        }
    } catch (error){
        setIncorrectCode(true)
        console.log('Ivalid code.', error);
    }
  }

  const transformTime = (seconds) => {
    let min = Math.floor((seconds % 3600) / 60);
    let sec = seconds - min * 60;
    return `${min}:${sec < 10 ? '0'+sec : sec}`;
  }


  // const onChangeDisable = () => {
  //     valid ? setDisable(false) : setDisable(true)
  // }



  return (
    <SafeAreaView style={styled.auth}>
    <View style={styled.wrapper}>
        <Header onPress={() => navigation.goBack()} isWhite={false} />
    </View>
    <KeyboardAvoidingView
        // behavior={Platform.OS =='ios' ? "padding" : "height"}
        style={{ position: "relative", }}
    >
        <Text style={styled.auth__title}>Phone number</Text>
        <TextInputMask
        type={"cel-phone"}
        options={{
            maskType: "INTERNATIONAL",
            withDDD: true,
            dddMask: "(971) ",
        }}
        ref={(ref) => (phoneField = ref)}
        style={[styled.auth__input, valid ? { borderColor: " rgba(12, 3, 0, 0.50)" } : { borderColor: "rgba(255, 0, 0, 1)" }]}
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={(phoneNumber) => {
            dispatch(userPhone(phoneNumber))
        }}
        onFocus={() => {
            setIsShowKeyboard(true);
        }}
        onBlur={() => {
            setIsShowKeyboard(false);
            setValid(phoneField.isValid());
            setDisable(phoneField.isValid());
        }}
        />

        {valid ? null : <Text style={styled.auth__error}>Enter the correct phone number</Text>}

        <Text style={styled.auth__title}>Verification code</Text>
        <TextInput
                style={[styled.auth__input, {textAlign: 'center', color: incorrectCode ? 'red' : 'rgba(12, 3, 0, 1)', borderColor:  incorrectCode ? 'red' : 'rgba(12, 3, 0, 1)'}]}
                keyboardType="numeric"
                value={code}
                onFocus={() => incorrectCode ? setIncorrectCode(false) : null}
                onChangeText={value => {
                    setCode(value)
                    value.length > 5 ? setDisable(false) : null
                }}
            />
        <Text style={[styled.auth__title, {color: 'rgba(245, 89, 38, 1)'}]}>The code didn 't come ?</Text>
        
        <View style={styled.auth__buttons}>
            <TouchableOpacity onPress={() => {
                signInWithPhoneNumber()
                setTime(10)
                setReadySend(false)
                }} style={{pointerEvents: readySend ? "auto" : "none"}}>
                <Text style={styled.auth__roundbtn}>{readySend ? 'Send again' : transformTime(time)}</Text>
            </TouchableOpacity>
            <BtnButton
                onPress={() => {
                    confirmCode()
                    navigation.navigate('DeliveryDetails')
                }}
                title={t("logIn")}
                buttonStyle={{ backgroundColor: "#F55926", borderWidth: 2, borderColor: "#F55926",
                //  opacity: disable ? 0.7 : 1,
                //   pointerEvents: disable ? "none" : "auto"
                 }}
                textStyle={{ color: "rgba(244, 237, 225, 1)" }}
            />
            <BtnButton
                onPress={() => navigation.navigate("Email")}
                title={t("registration")}
                buttonStyle={{marginTop: isShowKeyboard ? 5 : 15, marginBottom: isShowKeyboard ? 5 : 20 }}
                textStyle={{color: 'black'}}
            />
        </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}