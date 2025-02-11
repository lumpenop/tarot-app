import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { Platform, View } from 'react-native'
import { forwardRef } from 'react'
import defaultUrl from '@/06.shared/config/default-url'
import { LinearGradient } from 'expo-linear-gradient'

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
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#1e1b4b', '#581c87', '#1e1b4b']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <WebView
          ref={ref}
          onMessage={handleOnMessage}
          onLoadEnd={handleLoadEnd}
          source={{ uri: `${defaultUrl}/${path}` }}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          allowsFullscreenVideo={true}
          userAgent={userAgentString}
          mixedContentMode="compatibility"
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
          cacheEnabled={true}
          allowFileAccess={true}
          onError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent
            console.warn('WebView error: ', nativeEvent)
          }}
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
