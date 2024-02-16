import React, {useState, useRef} from "react";
import { View, FlatList, Animated} from 'react-native';
import SlideItem from "../SlideItem/SlideItem";
import Dots from "../Dots/Dots";
import {icons} from './../../constants';
import {useTranslation} from 'react-i18next';
import styled from "./slider.scss";

const Slider = () => {
    const {t} = useTranslation();


    const slides = [
        {
            id: 1,
            image: icons.slideBack,
            title: t('sliderTitle-1'),
            text: t('sliderText-1')
        },
        {
            id: 2,
            image: icons.slideBack,
            title: t('sliderText-2')
        },
        {
            id: 3,
            image: icons.slideBack,
            title: t('sliderText-3')
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef( new Animated.Value(0)).current;
    const slidesRef = useRef(null)

    const viewableItemsChanged = useRef(({ viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    }).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current
    return (
        <View style={styled.container}>
            <View
             style={{
                flex: 0.9,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'
             }}>
                <FlatList
                data={slides}
                renderItem={({item}) => <SlideItem item={item}/>}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                    useNativeDriver: false
                })}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />
            </View>
            <Dots
            style={{flex: .1}}
            data={slides} scrollX={scrollX}/>
            
        </View>
    )
    }
export default Slider