import { View } from 'react-native'

import CustomWebView from '@/03.widgets/custom-webview'

function Write() {
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <CustomWebView path="review/write" />
    </View>
  )
}

export default Write
