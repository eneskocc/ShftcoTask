import * as React from 'react'
import { AppStateStatus, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query'

import { HomeStack } from './src/navigation/HomeStack'
import { useOnlineManager } from './src/hooks/useOnlineManager'
import { useAppState } from './src/hooks/useAppState'

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
})

export default function App() {
  useOnlineManager()

  useAppState(onAppStateChange)

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </QueryClientProvider>
  )
}
