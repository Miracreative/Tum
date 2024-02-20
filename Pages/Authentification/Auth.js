import React, { useState, useRef } from "react";
import { Text, View, SafeAreaView, Image, TextInput, KeyboardAvoidingView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { useTranslation } from "react-i18next";
import { useDispatch} from 'react-redux';

// import firebase from "firebase/compat/app";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"
import { userPhone } from "../../actions";
import BtnButton from "../../Components/Button/Button";
import { icons } from "../../constants";
import Header from "../../Components/Header/Header";
import styled from "./style.scss";

export default function Auth({ navigation }) {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [valid, setValid] = useState(true);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();


  const signInWithPhoneNumber = async () => {
    try {
        console.log(phoneNumber);
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation)
    } catch (error) {
        console.log("Error: ", error);
    }
  }

  // const onChangeDisable = () => {
  //     valid ? setDisable(false) : setDisable(true)
  // }





  return (
    <SafeAreaView style={styled.auth}>
    <Image style={styled.back} source={icons.backRed} />
    <View style={styled.wrapper}>
        <Header onPress={() => navigation.navigate("Main")} isWhite={true} />
        <Image style={styled.image} source={icons.headerName} />
        <Text style={styled.auth__started}>{t("getStarted")}</Text>
        <Image style={styled.auth__img} source={icons.first} />
    </View>
    <KeyboardAvoidingView
        // behavior={Platform.OS =='ios' ? "padding" : "height"}
        style={{ position: "relative", flex: 0.45 }}
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
        style={[styled.auth__input, {borderColor: valid ? 'rgba(12, 3, 0, 0.5)' : '#FF0000', marginBottom: valid ? 60 : 39}]}
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
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

        <View style={{marginBottom: isShowKeyboard ? 5 : 20}}>
        <BtnButton
            onPress={() => {
                dispatch(userPhone(phoneNumber))
                navigation.navigate("AuthConfirm")
            }}
            title={t("continue")}
            buttonStyle={{backgroundColor: '#F55926',borderWidth: 2, borderColor: '#F55926',
            //  opacity: !disable  ? .7 : 1,
            //   pointerEvents: !disable ? 'none' : 'auto'
            }}
            textStyle={{ color: "rgba(244, 237, 225, 1)" }}
        />
        <BtnButton
            onPress={() => navigation.navigate("Email")}
            title={t("registration")}
            buttonStyle={{marginTop: isShowKeyboard ? 5 : 15, marginBottom: isShowKeyboard ? 5 : 20 }}
            textStyle={{ color: "rgba(12, 3, 0, 1)" }}
        />
        </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}