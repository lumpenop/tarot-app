import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import Storage, { postMessage } from '@/06.shared/lib/message'

export default function App() {
  const webViewRef = useRef<WebView>(null)

  const handleOnMessage = async (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data) {
      const { isRandom, isReversed } = JSON.parse(event.nativeEvent.data)
      const randomStorage = new Storage('isRandom')
      const reversedStorage = new Storage('isReversed')
      await randomStorage.set(isRandom === true)
      await reversedStorage.set(isReversed === true)
      return
    }
  }

  const getStorageData = async (key: string) => {
    const storage = new Storage(key)
    return await storage.get()
  }

  const handleLoadEnd = async () => {
    const isRandom = await getStorageData('isRandom')
    const isReversed = await getStorageData('isReversed')

    // JSON.stringify로 데이터를 문자열화하고 postMessage 유틸리티 함수 사용
    postMessage(
      JSON.stringify({
        isRandom: isRandom === true,
        isReversed: isReversed === true,
      }),
      webViewRef
    )
  }
  // return true가 필요없는 이유: handleLoadEnd는 단순히 이벤트 핸들러로 사용되며,
  // WebView의 onLoadEnd prop으로 전달됩니다. 반환값이 이벤트 처리에 영향을 주지 않습니다.
  //
  // return true가 필요한 경우:
  // 1. 이벤트의 기본 동작을 막고 싶을 때 (e.preventDefault()와 함께 사용)
  // 2. 이벤트 버블링을 멈추고 싶을 때 (e.stopPropagation()과 함께 사용)
  // 3. React의 특정 이벤트 핸들러에서 이벤트 전파를 제어하고 싶을 때
  // 4. WebView의 injectedJavaScript에서는 return true가 필요할 수 있음 (웹페이지 컨텍스트에서 실행되는 스크립트의 경우)

  const userAgentString = Platform.select({
    ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ReactNative',
    android:
      'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36 ReactNative',
    default: 'Mozilla/5.0 ReactNative',
  })

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        onMessage={handleOnMessage}
        onLoadEnd={handleLoadEnd}
        // 웹뷰에서 로드할 웹 페이지의 URL
        source={{ uri: 'http://localhost:3000' }}
        // 웹뷰의 기본 스타일 설정
        style={{ flex: 1, width: '100%', height: '100%' }}
        // JavaScript 실행 허용
        javaScriptEnabled={true}
        // DOM 스토리지 (localStorage, sessionStorage) 사용 허용
        domStorageEnabled={true}
        // 페이지 로딩 시작 시 로딩 인디케이터 표시
        startInLoadingState={true}
        // 웹 페이지를 뷰포트에 맞게 스케일링
        scalesPageToFit={true}
        // 인라인 미디어 재생 허용
        allowsInlineMediaPlayback={true}
        // 사용자 상호작용 없이도 미디어 자동 재생 허용
        mediaPlaybackRequiresUserAction={false}
        // 전체화면 비디오 재생 허용
        allowsFullscreenVideo={true}
        // 웹뷰에서 사용할 User Agent 문자열 설정 - 현재 OS에 따라 다른 값 설정
        userAgent={userAgentString}
        // 혼합 콘텐츠(HTTP/HTTPS) 처리 모드 설정
        mixedContentMode="compatibility"
        // 서드파티 쿠키 허용
        thirdPartyCookiesEnabled={true}
        // 앱의 쿠키를 웹뷰와 공유
        sharedCookiesEnabled={true}
        // 웹뷰 캐시 사용 허용
        cacheEnabled={true}
        // 파일 접근 허용
        allowFileAccess={true}
        // 웹뷰 에러 발생 시 처리
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent
          console.warn('WebView error: ', nativeEvent)
        }}
        // HTTP 에러 발생 시 처리
        onHttpError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent
          console.warn('WebView HTTP error: ', nativeEvent)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})
