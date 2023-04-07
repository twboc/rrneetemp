import React from 'react'
import {SafeAreaView, StatusBar, View} from 'react-native'
import Navigation from '../../navigation/navigation.native'
import styles from './root.styles.native'

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar />
        <Navigation />
      </SafeAreaView>
    </View>
  )
}

export default App
