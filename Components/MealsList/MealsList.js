import React from "react";
import {Text, TouchableOpacity, View, Image, FlatList} from 'react-native';
import { icons } from "../../constants";
import styled from "./mealsList.scss"

const MealsList = ({meals}) => {
   
    let elements = meals.map((item, i) => {
            
        return (
            <View style={styled.meals__item} key={i}>
                <View style={styled.meals__box}></View>
                <Image 
                    source={icons.soup}
                    style={styled.meals__img}
                    />
                <Text style={styled.meals__text}>{item.title}</Text>

            </View>  
        )
    });
    return (
        <View style={styled.meals}>
           {elements}
        </View>
    )
}
export default MealsList