import React from 'react'
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native'
import Navigation from '../../navigation/navigation.native'

function App(): JSX.Element {
  return (
    <View style={{borderWidth: 5, height: '100%', width: '100%'}}>
      {/* <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic"> */}
      <Navigation />
      {/* </ScrollView>
      </SafeAreaView> */}
    </View>
  )
}

export default App
