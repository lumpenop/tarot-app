import { View, Text, SafeAreaView, StatusBar } from 'react-native'

import { Slot } from 'expo-router'
import NavigationBar from '@/03.widgets/navigation-bar/navigation-bar'
function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1e1b4b' }}>
      {/* iOS 는 상태바가 background 에  포함되어 있음 */}
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="#1e1b4b" // 상태바 색상은 Android 에서만 작동
        translucent={false}
        hidden={false}
        networkActivityIndicatorVisible={true}
        animated={true}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Slot />
        <NavigationBar />
      </View>
    </SafeAreaView>
  )
}

export default Layout
