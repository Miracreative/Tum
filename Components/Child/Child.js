import React from "react";
import { View, Image, Text, StyleSheet, useWindowDimensions, ImageBackground, Dimensions, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "./style.scss";

const Child = (props) => {
    const {width, height} = Dimensions.get('window');
    return (
      <TouchableOpacity  onPress={() => console.log('press')}>
        <View
          style={[
            styles.container,
            props.shoudlMarginatedAtEnd
              ? props.isFirst
                ? {marginLeft: width* 0.15}
                : props.isLast
                ? {marginRight: width* 0.15}
                : {}
              : {},
            props.shouldMarginatedAround ? {margin: width* 0.15} : {},
            {width: props.cardWidth},
          ]}>
          <Image
            style={[styles.cardImage, {width: props.cardWidth}]}
            source={props.imagePath}
          />
  
          <View>
            
  
            <Text style={styles.textTitle}>
              {props.title}
            </Text>
  
            {/* <View style={styles.genreContainer}>
              {props.genre.map((item) => {
                return (
                  <View key={item} style={styles.genreBox}>
                    <Text style={styles.genreText}>{genres[item]}</Text>
                  </View>
                );
              })}
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#000000',
    },
    cardImage: {
      aspectRatio: 2 / 3,
      borderRadius: 20,
    },
    textTitle: {
      fontSize: 24,
      color: '#ffffff',
      textAlign: 'center',
      paddingVertical: 10,
    },
    rateContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    starIcon: {
      fontSize: 20,
      color: 'red',
    },
    voteText: {
      fontSize: 14,
      color: '#ffffff',
    },
    genreContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 20,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    genreBox: {
      borderColor: 'red',
      borderWidth: 1,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 25,
    },
    genreText: {
      fontSize: 10,
      color: '#ffffff',
    },
  });
  
export default Child