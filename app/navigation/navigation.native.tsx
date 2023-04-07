import * as React from 'react'
import {View, Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Main from './../view/main/main'
import Login from './../view/login/login'

const Stack = createNativeStackNavigator()

const Navigation = (): JSX.Element => {
  return (
    <View style={{height: '100%', width: '100%'}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default Navigation
