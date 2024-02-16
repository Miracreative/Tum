import React from "react";
import {Text, TouchableOpacity, View, Image} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { icons } from "../../constants";
import styled from "./button.scss"

const BtnButton = ({onPress, title, buttonStyle, textStyle, arrow}) => {
    function returnArrow() {
        if (arrow) {
           return <Image
           style={styled.arrow}
           source={icons.arrowWhite} />
        } else {
           return null
        }
    }
    return (
        <View
        style={[styled.button,
                {...buttonStyle}]}>
            <TouchableOpacity
                onPress={onPress}
                >
                <Text
                    style={[styled.text, {...textStyle}, {fontSize: RFValue ( 22,  740)}]}>{title}</Text>
                
                {returnArrow()}
            </TouchableOpacity>
        </View>
       
    
    )
}
export default BtnButton