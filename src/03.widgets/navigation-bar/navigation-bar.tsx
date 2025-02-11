import { Link, usePathname } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'

const menuItems: Array<{
  href: '/' | '/spread' | '/review' | '/about' | '/card'
  label: string
  icon:
    | 'sparkles-outline'
    | 'wallet-outline'
    | 'chatbubble-outline'
    | 'information-circle-outline'
    | 'card-outline'
}> = [
  { href: '/', label: '원카드', icon: 'sparkles-outline' },
  { href: '/spread', label: '스프레드(준비중)', icon: 'wallet-outline' },
  { href: '/review', label: '리뷰', icon: 'chatbubble-outline' },
  { href: '/about', label: '안내(준비중)', icon: 'information-circle-outline' },
  { href: '/card', label: '카드', icon: 'card-outline' },
]

function NavigationBar() {
  const pathname = usePathname()
  return (
    <View
      style={{
        backgroundColor: '#1e1b4b',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
          width: '100%',
          borderTopWidth: 0.5,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          paddingVertical: 6,
          paddingHorizontal: 22,
          borderColor: '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#100521',
          transform: [{ scale: 1.01 }],
        }}>
        {menuItems.map(item => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={{ pathname: item.href }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={isActive ? '#E6ECF0' : '#A6958C'}
                />
                <Text
                  style={{
                    color: isActive ? '#E6ECF0' : '#A6958C',
                    fontSize: 12,
                  }}>
                  {item.label}
                </Text>
              </View>
            </Link>
          )
        })}
      </View>
    </View>
  )
}

export default NavigationBar
