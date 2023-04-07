import React from 'react'
import {View, Text, Button} from 'react-native'

const Login = (props: any) => {
  return (
    <View>
      <Text>Login</Text>
      <Button title="Main" onPress={() => props?.navigation.navigate('Main')} />
    </View>
  )
}

export default Login
