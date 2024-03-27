import React, {useState, useEffect} from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import {useTranslation} from 'react-i18next';
import 'react-native-gesture-handler';
import {price, lon} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import BtnButton from '../../Components/Button/Button';
import MealsList from '../../Components/MealsList/MealsList';
import useDBService from '../../services/DBService';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
      case 'waiting':
          return <View><Text>'waiting'</Text></View>;
      case 'loading':
          return newItemLoading? <Component/> : <View><Text>'waiting'</Text></View>;
      case 'confirmed':
          return <Component/>;
      case 'error':
          return <View><Text>'error'</Text></View>;
      default:
          throw new Error('Unexpected process state');
  }
}
export default function Results({ navigation }) {

  const [meals, setMeals] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [newMealsLoading, setNewMealsLoading] = useState(false);
 


  const {getDefaultMeals,loading, error,  process, setProcess, getDaysOfWeek} = useDBService();

  useEffect(() => {
    onRequest(true);
    getDaysOfWeek()
      .then((data) => setDaysOfWeek(data))
  }, [])

  const onRequest = (initial) => {
    initial ? setNewMealsLoading(false) : setNewMealsLoading(true);
    getDefaultMeals()
        .then((data) => setMeals(data))
        .then(() => setProcess('confirmed'));
    }


  const dispatch = useDispatch();

      let {t} = useTranslation();
      let week = [];
      let weekDays = [];
      let mounthes = [];
      let weekDaysNames = [];
      function getWeekDay(date) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
        return days[date];
      }

      for(let i=0; i<7; i++) {
        let today = new Date();
        let curretDate = new Date(today.setDate(today.getDate() + 3));
        week.push((new Date(curretDate.setDate(curretDate.getDate() + i))).getDate())
      }
      for(let i=0; i<7; i++) {
        let today = new Date();
        let curretDate = new Date(today.setDate(today.getDate() + 3));
        weekDays.push(new Date(curretDate.setDate(curretDate.getDate() + i)).getDay())
      }
      for(let i=0; i<7; i++) {
        let today = new Date();
        let curretDate = new Date(today.setDate(today.getDate() + 3));
        weekDaysNames.push(getWeekDay(new Date(curretDate.setDate(curretDate.getDate() + i)).getDay()))
      }
      for(let i=0; i<7; i++) {
        let today = new Date();
        let curretDate = new Date(today.setDate(today.getDate() + 3));
        mounthes.push(new Date(curretDate.setDate(curretDate.getDate() + i)).toLocaleString('default', { month: 'short' }))
      }

    
  weekDays.forEach((item, i) => {
    if(item == 5) {
        fridays = i;
    } 
    if(item == 6) {
        sut = i;
    }
  })
  delete week[fridays]
  delete week[sut]
  delete mounthes[fridays]
  delete mounthes[sut]
  delete weekDaysNames[fridays]
  delete weekDaysNames[sut]
  const workWeek = week.filter(element => element !== undefined);
  const workMounthes = mounthes.filter(element => element !== undefined)
  const workWeekDaysNames = weekDaysNames.filter(element => element !== undefined);
  let workCalendar = []
  
  workWeek.forEach((item, i) => {
    workCalendar.push(item + " " + workMounthes[i])
  })
      
  const [active, setActive] = useState(0);
  const [activeMeal, setActiveMeal] = useState(0);
  const [long, setLong] = useState(0);

  const elements = workCalendar.map((item, i) => {
  
        return (
            <TouchableOpacity key={workWeekDaysNames.i} onPress={() => {setActive(i)
              console.log(workWeekDaysNames[i])
                                              setActiveMeal(0) }} style={[styled.results__item, {backgroundColor: (active==i) ? '#FF9D7D' : '#FFFFFF'}]}>
              <View style={[styled.results__shadow, {backgroundColor: (active==i) ? '#F55926' : '#FFFFFF'}]}></View>
              <Text style={[styled.results__date, {color: (active==i) ? '#F3EDDF' : '#F55926', fontWeight: (active==i) ? 500 : 300}]} >{item}</Text>
            </TouchableOpacity>  
        )
    });

  const meal = [
    t('breakfast'),
    t('lunch'),
    t('dinner'),
    t('snack')
  ];


  const mealList = meal.map((item, i) => {
  
    return (
        <TouchableOpacity key={item} onPress={() => setActiveMeal(i)} style={[styled.results__item, {width: '45%', backgroundColor: (activeMeal==i) ? '#FF9D7D' : '#FFFFFF'}]}>
          <View style={[styled.results__shadow, {backgroundColor: (activeMeal==i) ? '#F55926' : '#FFFFFF'}]}></View>
          <Text style={[styled.results__date, {color: (activeMeal==i) ? '#F3EDDF' : '#F55926', fontWeight: (activeMeal==i) ? 500 : 300}]} >{item}</Text>
        </TouchableOpacity>  
    )
  });

  const longArr = [
    t('mounthly'),
    t('weekly')
  ]
  const longArrList = longArr.map((item, i) => {
  
    return (
        <TouchableOpacity onPress={() => setLong(i)} style={[styled.results__item, {width: '45%', backgroundColor: (long==i) ? '#FF9D7D' : '#FFFFFF'}]}>
          <View style={[styled.results__shadow, {backgroundColor: (long==i) ? '#F55926' : '#FFFFFF'}]}></View>
          <Text style={[styled.results__date, {color: (long==i) ? '#F3EDDF' : '#F55926', fontWeight: (long==i) ? 500 : 300}]}  key={i}>{item}</Text>
        </TouchableOpacity>  
    )
  });

  const planDescriptions = [
    {
      descr1: "Serves up to 2000 out of 2663 calories recommendended for you",
      descr2: "5 days a week * 4 weeks",
      descr3: "Skip anytime",
      sum: 1000,
      long: "sar/mounth"
    },
    {
      descr1: "Serves up to 2000 out of 2663 calories recommendended for you",
      descr2: "5 days a week * 4 weeks",
      descr3: "Skip anytime",
      sum: 250,
      long: "sar/week"
    },
    
  ]



  return (
    
        <SafeAreaView style={styled.results}>
              
            <ScrollView style={styled.results__contaner}>
            <Image  
                source={icons.pink} 
                style={styled.results__pink}/>
                <Header style={{flex: 0.1}} onPress={() => navigation.goBack()} isButtons={false}/>
                <Text style={styled.results__title}>{t('resultsTitle')}</Text>
                <Text style={styled.results__text}>{t('resultsDescr')}</Text>
                <Text style={styled.results__title}>{t('menu')}</Text>
                <View style={styled.results__dates}>
                    {elements}
                </View>
                <View style={styled.results__divider}></View>
                <View style={styled.results__dates}>
                  {mealList}
                </View>
                <MealsList meals={meals}/>
                <Text style={styled.results__title}>{t('plan')}</Text>
                <View style={styled.results__dates}>
                  {longArrList}
                </View>
                {/* <View style={styled.results__divider}></View>
                <View style={styled.results__dates}>
                  {varietyPlanList}
                </View> */}
                <View style={styled.results__box}>
                  <Text style={[styled.results__title, styled.results__title_narrow]}>{t('cost')}</Text>
                  <View style={styled.results__ring}></View>
                  <Text style={styled.results__descr}>{planDescriptions[long].descr1}</Text>
                  <View style={styled.results__ring}></View>
                  <Text style={styled.results__descr}>{planDescriptions[long].descr2}</Text>
                  <View style={styled.results__ring}></View>
                  <Text style={styled.results__descr}>{planDescriptions[long].descr3}</Text>
                  <Text style={styled.results__price}>{planDescriptions[long].sum}</Text>
                  <Text style={styled.results__valute}>{planDescriptions[long].long}</Text>
                  <View style={styled.results__border}></View>
                  <Image  style={styled.results__fone}
                          source={icons.bottomFone} />
                </View>
                <BtnButton onPress={() => {
                                            dispatch(price(planDescriptions[long].sum))
                                            dispatch(lon(planDescriptions[long].long))
                                            navigation.navigate("Gender")}} title={t('next')} buttonStyle={{backgroundColor: '#F55926',borderWidth: 2, borderColor: '#F55926', marginBottom: 30}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
            </ScrollView>
        </SafeAreaView>
    );
}
