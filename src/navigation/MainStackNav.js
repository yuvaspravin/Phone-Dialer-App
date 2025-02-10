import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AddContact from "../components/AddContact";
import DialPad from "../components/DialPad";
import DailScreen from "../components/DialScreen";
import Search from "../components/SearchScreen";
import TabNav from './TabNav';

const MainStackNav = () => {
  const MainStack = createNativeStackNavigator();
  
  return <NavigationContainer>
    <MainStack.Navigator>
      <MainStack.Screen options={{headerShown: false}} name="TabNav" component={TabNav} />
      <MainStack.Screen options={{title: 'Add Contact'}} name="addContact" component={AddContact} />
     
      <MainStack.Screen options={{headerShown: true, animation:'slide_from_bottom'}} name="search" component={Search} />
      <MainStack.Screen options={{title: 'Dialpad',headerShown: true, animation:'slide_from_bottom'}} name="dialPad" component={DialPad} />
      <MainStack.Screen options={{headerShown: false, animation:'slide_from_bottom'}} name="dialScreen" component={DailScreen} />
    </MainStack.Navigator>
  </NavigationContainer>
};

export default MainStackNav;
