import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

async function getExpoPushToken() {
  if (Device.isDevice) {
    const token = (await Notifications.getDevicePushTokenAsync()).data
    console.log('Expo Push Token:', token)
    return token
  } else {
    alert('Must use physical device for push notifications')
  }
}
