import { View, SafeAreaView, StatusBar, Platform } from 'react-native'
import { Stack } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NavigationBar from '@/03.widgets/navigation-bar/navigation-bar'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

function Layout() {
  const isIOS = Platform.OS === 'ios'
  const insets = useSafeAreaInsets()
  const bottomHeight = insets.bottom
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#1e1b4b',
          backgroundImage:
            'linear-gradient(to bottom, #1e1b4b, #581c87, #1e1b4b)',
        }}>
        {/* iOS 는 상태바가 background 에  포함되어 있음 */}

        <StatusBar
          barStyle={'light-content'}
          backgroundColor="#1e1b4b" // 상태바 색상은 Android 에서만 작동
          translucent={false}
          hidden={false}
          networkActivityIndicatorVisible={true}
          animated={true}
        />
        <LinearGradient
          colors={['#3B3D4E', '#6c5ce7', '#3B3D4E']} // indigo-950, purple-900, indigo-950
          start={[0, 0]} // 시작점 (상단)
          end={[0, 1]} // 끝점 (하단)
          style={{ flex: 1 }}>
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
        </LinearGradient>
      </SafeAreaView>
      {bottomHeight > 0 && (
        <View
          style={{
            height: bottomHeight,
            backgroundColor: '#100521',
            opacity: 0.99,
          }}
        />
      )}
    </>
  )
}

export default Layout
