import React, { useState, useEffect } from 'react'
import { View, Button } from 'react-native'
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads'

const Card = () => {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false)
  const [interstitial] = useState(
    InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    })
  )

  useEffect(() => {
    const interstitial = InterstitialAd.createForAdRequest(
      TestIds.INTERSTITIAL,
      {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      }
    )

    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true)
      }
    )

    interstitial.load()

    return unsubscribeLoaded
  }, [])

  const handleShowInterstitial = async () => {
    if (interstitialLoaded) {
      await interstitial.show()
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Interstitial Ad" onPress={handleShowInterstitial} />
    </View>
  )
}

export default Card
