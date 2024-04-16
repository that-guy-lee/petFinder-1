import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { decode } from 'base-64';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { AuthPage } from './AuthPage';
import { Landing } from './Landing';
import { MyPetInfo } from './MyPetInfo';
import { ChoicePage } from './ChoicePage';
import { Support } from './Support';
import { AddPet1 } from './AddPet1.jsx';
import { AddPet2 } from './AddPet2.jsx';
import { AddPet3 } from './AddPet3.jsx';
import { AddPet4 } from './AddPet4.jsx';
import { AddPet5 } from './AddPet5.jsx';
import { FoundPet1 } from './FoundPet1.jsx';
import { FoundPet2 } from './FoundPet2.jsx';
import { FoundPet3 } from './FoundPet3.jsx';
import { FoundPet4 } from './FoundPet4.jsx';
import { FoundPet5 } from './FoundPet5.jsx';
import { FoundPetInfo } from './FoundPetInfo.jsx';
import { PrivacyPolicy } from './PrivacyPolicy.jsx';


export default function App() {

  if(typeof atob === 'undefined') {
    global.atob = decode;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
      <Stack.Screen options={{ headerShown: false }} name="AuthPage" component={AuthPage} />
        <Stack.Screen options={{ headerShown: false }} name="ChoicePage" component={ChoicePage} />  
        <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
        <Stack.Screen options={{ headerShown: false }} name="MyPetInfo" component={MyPetInfo} />
        <Stack.Screen options={{ headerShown: false }} name="Support" component={Support} />
        <Stack.Screen options={{ headerShown: false }} name="AddPet1" component={AddPet1} />
        <Stack.Screen options={{ headerShown: false }} name="AddPet2" component={AddPet2} />
        <Stack.Screen options={{ headerShown: false }} name="AddPet3" component={AddPet3} />
        <Stack.Screen options={{ headerShown: false }} name="AddPet4" component={AddPet4} />
        <Stack.Screen options={{ headerShown: false }} name="AddPet5" component={AddPet5} />
        <Stack.Screen options={{ headerShown: false }} name="FoundPet1" component={FoundPet1} />
        <Stack.Screen options={{ headerShown: false }} name="FoundPet2" component={FoundPet2} />
        <Stack.Screen options={{ headerShown: false }} name="FoundPet3" component={FoundPet3} />
        <Stack.Screen options={{ headerShown: false }} name="FoundPet4" component={FoundPet4} />
        <Stack.Screen options={{ headerShown: false }} name="FoundPet5" component={FoundPet5} />
        <Stack.Screen options={{ headerShown: false }} name="FoundPetInfo" component={FoundPetInfo} />
        <Stack.Screen options={{ headerShown: false }} name="PrivacyPolicy" component={PrivacyPolicy} />
        
      </Stack.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
