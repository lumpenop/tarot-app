import WebView, { WebViewMessageEvent } from 'react-native-webview'

import { Platform, View } from 'react-native'
import { forwardRef } from 'react'
import defaultUrl from '@/06.shared/config/default-url'

interface CustomWebViewProps {
  path?: string
  handleOnMessage?: (event: WebViewMessageEvent) => void
  handleLoadEnd?: () => void
}

const CustomWebView = forwardRef<WebView, CustomWebViewProps>(
  ({ path = '', handleOnMessage, handleLoadEnd }: CustomWebViewProps, ref) => {
    const userAgentString = Platform.select({
      ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ReactNative',
      android:
        'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36 ReactNative',
      default: 'Mozilla/5.0 ReactNative',
    })

    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <WebView
          ref={ref}
          onMessage={handleOnMessage}
          onLoadEnd={handleLoadEnd}
          // 웹뷰에서 로드할 웹 페이지의 URL
          source={{ uri: `${defaultUrl}/${path}` }}
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
)

export default CustomWebView
