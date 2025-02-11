import React, { useState, useEffect } from 'react'

import {
  BannerAd,
  InterstitialAd,
  TestIds,
  AdEventType,
  BannerAdSize,
} from 'react-native-google-mobile-ads'

const BannerAds = () => {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false)
  const [interstitial] = useState(
    InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    })
  )

  useEffect(() => {
    interstitial.load()

    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true)
      }
    )

    return unsubscribeLoaded
  }, [interstitial])

  const handleShowInterstitial = async () => {
    if (interstitialLoaded) {
      await interstitial.show()
    }
  }

  return (
    <BannerAd
      unitId={TestIds.BANNER}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  )
}

export default BannerAds
