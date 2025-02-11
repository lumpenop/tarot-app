import { View, SafeAreaView, StatusBar, Platform } from 'react-native'
import { Stack, Tabs } from 'expo-router'
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
          <Tabs
            screenOptions={{
              headerShown: false,
              animation: 'none',
              tabBarStyle: {
                display: 'none',
              },
            }}>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="spread" />
            <Tabs.Screen name="review" />
            <Tabs.Screen name="about" />
          </Tabs>
          <NavigationBar />
        </LinearGradient>
      </SafeAreaView>
      {bottomHeight > 0 && (
        <View
          style={{
            height: bottomHeight,
            backgroundColor: '#100521',
          }}
        />
      )}
    </>
  )
}

export default Layout
