import { Link } from 'expo-router'
import {
  Info,
  WalletCards,
  MessageSquare,
  Sparkles,
  LucideProps,
} from 'lucide-react-native'
import { View, Text } from 'react-native'

const menuItems: Array<{
  href: '/' | '/spread' | '/review' | '/about'
  label: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
}> = [
  { href: '/', label: '원카드', icon: Sparkles },
  { href: '/spread', label: '스프레드(준비중)', icon: WalletCards },
  { href: '/review', label: '리뷰', icon: MessageSquare },
  { href: '/about', label: '안내(준비중)', icon: Info },
]

function NavigationBar() {
  return (
    <View style={{ backgroundColor: '#1e1b4b', opacity: 0.99 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
          width: '100%',
          borderTopWidth: 0.5,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          paddingVertical: 8,
          paddingHorizontal: 21,
          opacity: 0.7,
          borderColor: '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#000',
          transform: [{ scale: 1.01 }],
        }}>
        {menuItems.map(item => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <Icon size={24} color="#E9D5FF" />
                <Text style={{ color: '#E9D5FF', fontSize: 12 }}>
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
