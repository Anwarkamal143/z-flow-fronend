'use client'
import { Loader } from '@/components/loaders'
import { useGetLoggedInUser } from '@/features/user/api'
import {
  useStoreAuthActions,
  useStoreUserIsAuthenticating,
} from '@/store/userAuthStore'
import { ReactNode, useEffect } from 'react'
import SocketContextProvider from './SocketProvider'

type IAppWrapper = {
  children: ReactNode
}

const AppWrapper = ({ children }: IAppWrapper) => {
  const { setUser } = useStoreAuthActions()
  function resetUser() {
    setUser({
      user: undefined,
      accounts: undefined,
      isAuthenticated: false,
      isLoggedIn: false,
      isAuthenticating: false,
      isTokensRefreshing: false,
      accessToken: undefined,
      refreshToken: undefined,
    })
  }
  const {
    data: userData,
    isLoading: isFirstTimeLoading,
    error,
  } = useGetLoggedInUser({
    onSuccess: (userData: any) => {
      if (userData?.data?.id) {
        const { accounts, accessToken, refreshToken, ...rest } = userData.data
        setUser({
          user: rest,
          accounts,
          isAuthenticated: true,
          isLoggedIn: true,
          isAuthenticating: false,
          isTokensRefreshing: false,
          accessToken,
          refreshToken,
        })
        return
      }
      resetUser()
    },
  })
  const isAuthenticating = useStoreUserIsAuthenticating()
  const isLoading = isFirstTimeLoading || isAuthenticating

  useEffect(() => {
    if (isFirstTimeLoading) return
    if (error?.message) {
      resetUser()
    }
  }, [isFirstTimeLoading])
  if (isLoading) {
    return <Loader size='xlg' full />
  }

  return <SocketContextProvider>{children}</SocketContextProvider>
}

export default AppWrapper
