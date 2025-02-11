// React와 React Native의 필수 컴포넌트들을 import
import { useState, useEffect, useRef } from 'react'
import { Text, View, Button, Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'

// 알림 핸들러 설정 - 알림이 어떻게 표시될지 정의
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // 알림 표시 여부
    shouldPlaySound: true, // 소리 재생 여부
    shouldSetBadge: true, // 배지 표시 여부
  }),
})

// 푸시 알림을 보내는 함수
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken, // 수신자 토큰
    sound: 'default', // 알림음
    title: 'Original Title', // 알림 제목
    body: 'And here is the body!', // 알림 내용
    data: { someData: 'goes here' }, // 추가 데이터
  }

  // Expo 푸시 알림 서버로 요청 전송
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

// 등록 과정에서 발생하는 에러 처리 함수
function handleRegistrationError(errorMessage: string) {
  alert(errorMessage)
  throw new Error(errorMessage)
}

// 푸시 알림 등록을 위한 함수
async function registerForPushNotificationsAsync() {
  // Android 플랫폼인 경우 알림 채널 설정
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  // 실제 디바이스인지 확인
  if (Device.isDevice) {
    // 알림 권한 확인 및 요청
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError(
        'Permission not granted to get push token for push notification!'
      )
      return
    }
    // Expo 프로젝트 ID 확인
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId
    if (!projectId) {
      handleRegistrationError('Project ID not found')
    }
    try {
      // 푸시 토큰 가져오기
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data
      console.log(pushTokenString)
      return pushTokenString
    } catch (e: unknown) {
      handleRegistrationError(`${e}`)
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications')
  }
}

// 메인 App 컴포넌트
export default function Notification() {
  // 상태 관리
  const [expoPushToken, setExpoPushToken] = useState('') // 푸시 토큰
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined) // 수신된 알림
  // 알림 리스너 참조
  const notificationListener = useRef<Notifications.EventSubscription>()
  const responseListener = useRef<Notifications.EventSubscription>()

  // 컴포넌트 마운트 시 실행되는 효과
  useEffect(() => {
    // 푸시 알림 등록
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`))

    // 알림 수신 리스너 설정
    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification)
      })

    // 알림 응답 리스너 설정
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

    // 컴포넌트 언마운트 시 리스너 정리
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  // UI 렌더링
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your Expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Title: {notification && notification.request.content.title}{' '}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{' '}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken)
        }}
      />
    </View>
  )
}
