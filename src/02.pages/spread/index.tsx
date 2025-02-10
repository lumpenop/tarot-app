import { View } from 'react-native'

import CustomWebView from '@/03.widgets/custom-webview'

function Spread() {
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <CustomWebView path="spread" />
    </View>
  )
}

export default Spread
