// import React from 'react'
import {View, Button} from 'react-native'
import {NativeBaseProvider, Box} from 'native-base'

// const Login = (props: any) => {
//   return (
//     <View>
//       <Text>Login</Text>
//       <Button title="Main" onPress={() => props?.navigation.navigate('Main')} />
//     </View>
//   )
// }

// export default Login

import React from 'react'
import {Tab, Text, TabView} from '@rneui/themed'

export default (props: any) => {
  const [index, setIndex] = React.useState(0)

  return (
    <>
      <View>
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary">
          <Tab.Item
            title={'Login'}
            titleStyle={{fontSize: 12}}
            // icon={{name: 'timer', type: 'ionicon', color: 'white'}}
          />
          <Tab.Item
            title={'Register'}
            titleStyle={{fontSize: 12}}
            // icon={{name: 'heart', type: 'ionicon', color: 'white'}}
          />
          {/* <Tab.Item
          title="cart"
          titleStyle={{fontSize: 12}}
          icon={{name: 'cart', type: 'ionicon', color: 'white'}}
        /> */}
        </Tab>
      </View>

      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{width: '100%'}}>
          <Text h1>Recent</Text>
          <Box>Hello world</Box>
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <Text h1>Favorite</Text>
        </TabView.Item>
      </TabView>
      <Button title="Main" onPress={() => props?.navigation.navigate('Main')} />
    </>
  )
}
