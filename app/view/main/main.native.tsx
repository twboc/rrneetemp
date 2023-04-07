import React from 'react'
import {View, Text, Button} from 'react-native'

const Main = (props: any) => {
  return (
    <View>
      <Text>Main</Text>
      <Button
        title="Login"
        onPress={() => props?.navigation.navigate('Login')}
      />
    </View>
  )
}

export default Main
