import React, {useState, useRef} from "react";
import { View, FlatList, Animated, Dimensions} from 'react-native';
import Child from "../Child/Child";
import {icons} from './../../constants';
import {useTranslation} from 'react-i18next';
import styled from "./style.scss";

const Children = () => {
    const {t} = useTranslation();


    const slides = [
        {
            id: 1,
            image: icons.slideBack,
            title: t('sliderText-3')
        },
        {
            id: 2,
            image: icons.slideBack,
            title: t('sliderText-3')
        },
        {
            id: 3,
            image: icons.slideBack,
            title: t('sliderText-3')
        },
        {
            id: 4,
            image: icons.slideBack,
            title: t('sliderText-3')
        },
        {
            id: 5,
            image: icons.slideBack,
            title: t('sliderText-3')
        },
        {
            id: 6,
            image: icons.slideBack,
            title: t('sliderText-3')
        },
        {
            id: 7,
            image: icons.slideBack,
            title: t('sliderText-3')
        },
        {
            id: 8,
            image: icons.slideBack,
            title: t('sliderText-3')
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    // console.log(currentIndex)
    const scrollX = useRef( new Animated.Value(0)).current;
    const slidesRef = useRef(null)
    const {width, height} = Dimensions.get('window');
    const viewableItemsChanged = useRef(({ viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    }).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current
    const getitemlayout=(data, index = 1)=> {
        return {length: (width) , offset: (width * index), index };
    }
    return (
        <View style={styled.container}>
            <View
             style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                
             }}>
            <FlatList
                data={slides}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap: width * .05}}
                snapToInterval={width * .75}
                bounces={true}
                inverted={false}
                initialScrollIndex={.857}
                decelerationRate={0}
                keyExtractor={(item) => {item.id}}
                scrollEventThrottle={32}
                getitemlayout={getitemlayout(1)}
                ref={slidesRef}
                renderItem={({item, index}) => {
                    return (
                      <Child
                        shoudlMarginatedAtEnd={true}
                        cardWidth={width * 0.7}
                        isFirst={index == 0 ? true : false}
                        isLast={index == slides.length - 1 ? true : false}
                        title={item.title}
                        imagePath={item.image}
                      />
                    );
                  }}
            />
            </View>
            
        </View>
    )
    }
export default Children