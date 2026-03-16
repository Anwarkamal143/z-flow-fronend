import { HydrateClient } from '@/components/server'
import CredentialForm from '@/features/credentials/components/credential'
import {
  CredentialsError,
  CredentialsLoading,
} from '@/features/credentials/components/credentials'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const NewCredentialPage = () => {
  return (
    <div className='h-full p-4 md:px-10 md:py-6'>
      <div className='mx-auto flex h-full w-full max-w-6xl flex-col gap-y-8'>
        <HydrateClient>
          <ErrorBoundary
            fallback={<CredentialsError message='Error loading credential' />}
          >
            <Suspense
              fallback={<CredentialsLoading message='Loading credential...' />}
            >
              <CredentialForm />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  )
}

export default NewCredentialPage
