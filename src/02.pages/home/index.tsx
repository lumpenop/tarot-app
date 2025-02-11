import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

import Storage, { postMessage } from '@/06.shared/lib/message'
import CustomWebView from '@/03.widgets/custom-webview'
import { useRef } from 'react'

export default function Home() {
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

  return (
    <CustomWebView
      ref={webViewRef}
      handleLoadEnd={handleLoadEnd}
      handleOnMessage={handleOnMessage}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})
