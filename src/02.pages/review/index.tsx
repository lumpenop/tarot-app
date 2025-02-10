import CustomWebView from '@/03.widgets/custom-webview'
import { View } from 'react-native'

function Review() {
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <CustomWebView path="review" />
    </View>
  )
}
export default Review
