import React, {useState} from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import 'react-native-gesture-handler';
import {time, date} from './../../actions';
import { useDispatch, useSelector } from 'react-redux';
import BtnButton from '../../Components/Button/Button';
import {icons} from "../../constants";
import Header from '../../Components/Header/Header';
import styled from "./style.scss";
import CalendarPicker from "react-native-calendar-picker";
export default function FirstDay({ navigation }) {

  let {t} = useTranslation();
  const num = useSelector(state => state.childrens.children1.plan.sum);
  const long = useSelector(state => state.childrens.children1.plan.long);
  const [active, setActive] = useState('morning');
  const [calendar, setCalendar] = useState(false);

  
  const dispatch = useDispatch();
  
  let minDate;
  if(new Date(new Date().setDate(new Date().getDate() + 3)).getDay() == 0) {
    minDate = new Date(new Date().setDate(new Date().getDate() + 4))
  } else if (new Date(new Date().setDate(new Date().getDate() + 3)).getDay() == 6) {
    minDate = new Date(new Date().setDate(new Date().getDate() + 5))
  } else {
    minDate = new Date(new Date().setDate(new Date().getDate() + 3))
  }
  const [selectedStartDate, setSelectedStartDate] = useState(minDate);
  const onDateChange = (date) => {
    setSelectedStartDate(date)
  }
  let day = selectedStartDate.getDate();
  let mounth = selectedStartDate.toLocaleString('default', { month: 'long' });
  let year = selectedStartDate.getFullYear();

  let getYear = minDate.getFullYear();
  let getMonth = minDate.getMonth();
  let maxDate = new Date(getYear, getMonth + 1, 0);
  function getWeekDay(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    return days[date.getDay()];
  }

  let weekDay =  getWeekDay(selectedStartDate);
  let mounthesDays = [];
  const getDaysInMonth = () => {

    let getYear = minDate.getFullYear();
    let getMonth = minDate.getMonth();


    let stopDate = new Date(getYear, getMonth + 1, 0);
    
    for(let i = 0; i <= stopDate.getDate(); i++) {
      let weekDay = new Date(new Date().setDate(new Date().getDate() + i)).getDay()
      let day = new Date(new Date().setDate(new Date().getDate() + i))
      if(weekDay == 6 || weekDay == 0)  {
        mounthesDays.push(day)
      }
    }
  }
  getDaysInMonth()
  const disableDate = () => {
    return date.getDay() === 0;
  }
  return (
    
        <SafeAreaView style={styled.calendar}>
          <ScrollView style={{position: 'relative', width: '100%'}}>
          <View style={styled.calendar__back}>
            <Image style={styled.calendar__backImg}
                    source={icons.back}/>
          </View>
            <Header style={{flex: 0.1}} onPress={() => navigation.goBack()} isButtons={false}/>
            <View 
              style={styled.calendar__container}>
                <Text style={[styled.calendar__title, {fontSize: RFValue ( 22,  740)}]}>{t('days')}</Text>
                <Text style={[styled.calendar__descr, {fontSize: RFValue ( 14,  740)}]}>{t('subscr')}</Text>

                <View
                    style={[styled.calendar__block, {marginBottom: calendar ? 300 : 0}]}>
                        <Text style={styled.calendar__input}>{weekDay}, {mounth} {day},  {year}</Text>
                    <TouchableOpacity
                         onPress={()=> {setCalendar(calendar => !calendar)}
                                        } >
                        <Image 
                            style={styled.calendar__icon}
                            source={icons.calendar} />
                    </TouchableOpacity>
                    <View style={[styled.calendar__picker, {opacity: calendar ? 1 : 0, pointerEvents: calendar ? 'auto' : "none"}]} >
                  <CalendarPicker 
                            minDate={minDate}
                            maxDate={maxDate}
                            initialDate={minDate}
                            selectedDayColor="#F55926"
                            selectedDayTextColor="#FFFFFF"
                            onDateChange={onDateChange} 
                            disabledDates={mounthesDays}
                  />
                  </View>
                </View>
                <View style={styled.calendar__divider}></View>
              <TouchableOpacity onPress={() => {{setActive('morning')}}} style={[styled.calendar__item, {backgroundColor: (active=='morning') ? '#FF9D7D' : '#F3EDDF'}]}>
                <View style={[styled.calendar__shadow, {backgroundColor: (active=='morning') ? '#F55926' : '#F3EDDF'}]}></View>
                <Text style={[styled.calendar__date, {color: (active=='morning') ? '#F3EDDF' : '#F55926', fontWeight: (active=='morning') ? 500 : 300}, {fontSize: RFValue ( 16,  740)}]}>{t('morning')}</Text>
              </TouchableOpacity>  
              <TouchableOpacity onPress={() => {{setActive('evening')}}} style={[styled.calendar__item, {backgroundColor: (active=='evening') ? '#FF9D7D' : '#F3EDDF'}]}>
                <View style={[styled.calendar__shadow, {backgroundColor: (active=='evening') ? '#F55926' : '#F3EDDF'}]}></View>
                <Text style={[styled.calendar__date, {color: (active=='evening') ? '#F3EDDF' : '#F55926', fontWeight: (active=='evening') ? 500 : 300}, {fontSize: RFValue ( 16,  740)}]}>{t('evening')}</Text>
              </TouchableOpacity>  
              <Text style={[styled.calendar__descr, {fontSize: RFValue ( 14,  740)}]}>{t('daystext')}</Text>
            </View>
            <View style={styled.calendar__plan}>
              <Image style={styled.calendar__img}
                     source={icons.doubleGexagon} />
              <Text style={[styled.calendar__text, {fontSize: RFValue ( 14,  740)}]}>{t('total')}</Text>
              <Text style={[styled.calendar__price, {fontSize: RFValue ( 64,  740)}]}>{num}</Text>
              <Text style={[styled.calendar__text, {fontSize: RFValue ( 14,  740)}]}>{long}</Text>
            </View>
        <BtnButton onPress={() => {navigation.navigate("Location")
                                  dispatch(time(active))
                                  dispatch(time(`${weekDay}, ${mounth} ${day},  ${year}`))}} title={t('continue')} buttonStyle={{backgroundColor: '#F55926',borderWidth: 2, borderColor: '#F55926', marginBottom: 80}} textStyle={{color: 'rgba(244, 237, 225, 1)', }}/>
         <View style={styled.calendar__backDown}>
            <Image style={styled.calendar__backImg}
                    source={icons.backDown}/>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
