import React from "react";
import { View, Animated, useWindowDimensions} from 'react-native';
import styled from "./style.scss";

const Dots = ({data, scrollX}) => {
   const {width} = useWindowDimensions();
    return (
        <View style={styled.container}>
            {data.map((_, i)=> {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [15, 20, 15],
                    extrapolate: 'clamp'
                })
                const dotHeight = scrollX.interpolate({
                    inputRange,
                    outputRange: [15, 20, 15],
                    extrapolate: 'clamp'
                })
                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#F3EDDF', '#F55926', '#F3EDDF'],
                    extrapolate: 'clamp'
                })
                return <Animated.View style={[styled.dot, {width: dotWidth, backgroundColor, height: dotHeight}]} key={i.toString()}/>
            })  }
        </View>
    )
}
export default Dots