import { View, SafeAreaView, StatusBar } from 'react-native'
import { Stack } from 'expo-router'
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
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false, // 각 화면의 상단 헤더(타이틀바)를 표시할지 여부를 설정합니다. false로 설정하면 헤더가 보이지 않습니다.
            animation: 'none', // 화면 전환 애니메이션 비활성화
          }}
          screenListeners={{
            blur: () => false, // Prevents unmounting on blur
          }}>
          <Stack.Screen name="home" />
          <Stack.Screen name="spread" />
          <Stack.Screen name="review" />
          <Stack.Screen name="about" />
        </Stack>
        <NavigationBar />
      </View>
    </SafeAreaView>
  )
}

export default Layout
