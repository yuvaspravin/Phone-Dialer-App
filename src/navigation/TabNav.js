import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {FontAwesome5} from '@expo/vector-icons'
import { View, Modal, Text, StatusBar, BackHandler } from 'react-native';
import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {FontAwesome5 as Icon } from '@expo/vector-icons';

import { enableDialPad } from '../redux/action';

import Favorites from '../screens/Favorites';
// import Recents from '../screens/Recents';
import Contacts from '../screens/Contacts';
import DialPad from "../components/DialPad";
import ContactList from '../components/ContactList';
import Recents from '../components/CallHistory';
import DialScreen from '../components/DialScreen' 
import SearchScreen from "../components/SearchScreen"

const Tab = createBottomTabNavigator();

const iconList = {
  favorites: 'star',
  recents: 'clock',
  contacts: 'users'
}

const TabNav = () => {
  const dispatch = useDispatch();
  const isDialPadEnable = useSelector(state => state?.isDialPadEnable)
  const isDialScreenEnable = useSelector(state => state?.isDialScreenEnable)
  const isSearchEnable = useSelector(state => state?.isSearchEnable)
  

  useEffect(() => {
    const backAction = () => {
      dispatch(enableDialPad(false))
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
    // return () => {
    //   isDialPadEnable && BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   dispatch(enableDialPad(false))
    // );  
    // }
    // // isDialPadEnable && BackHandler.addEventListener(
    // //   'hardwareBackPress',
    // //   dispatch(enableDialPad(false))
    // // );
  }, [isDialPadEnable]);

  const searchHeader = (title, navigation) => ({
    title: title,
    headerRight: () => <Icon name="search" size={18} style={{marginRight: '15%'}} onPress={() => {navigation.navigate('search')}} />
  })

  return (
    <View style={{flex: 1}}>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabelStyle: {fontSize: 14},
        tabBarItemStyle: {paddingBottom: '4%'},
        tabBarStyle: {paddingVertical: '4%', height: '8%'},
        tabBarIcon: ({color}) => {
          return <FontAwesome5 name={iconList[route.name.toLowerCase()]} size={18} color={color} />
        },
        tabBarActiveTintColor: '#1b8bd1',
        tabBarInactiveTintColor: 'gray'
    })}
    >
      <Tab.Screen options={({navigation}) => searchHeader('Favorites', navigation)} name="favorites" component={Favorites} />
      <Tab.Screen options={({navigation}) => searchHeader('Recents', navigation)} name="recents" component={Recents} />
      <Tab.Screen options={({navigation}) => searchHeader('Contacts', navigation)} name="contacts" component={ContactList} />
    </Tab.Navigator>
    
    </View>
  );
};

export default TabNav;
