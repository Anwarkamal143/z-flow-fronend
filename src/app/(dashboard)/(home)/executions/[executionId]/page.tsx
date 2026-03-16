import Dataloader from '@/components/loaders'
import { HydrateClient } from '@/components/server'
import { ExecutionView } from '@/features/executions/components/execution'
import {
  ExecutionsError,
  ExecutionsLoading,
} from '@/features/executions/components/executions'
import { prefetchServerExecution } from '@/features/executions/server/prefetch'
import { isAccessTokenRefresing } from '@/lib'
import { authSession } from '@/lib/auth/auth'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

type PageProps = {
  params: Promise<{ executionId: string }>
  searchParams: Promise<Record<string, string>>
}

const ExecutionPage = async (props: PageProps) => {
  const searchParams = await props.searchParams
  const params = await props.params
  if (isAccessTokenRefresing(searchParams)) {
    return <Dataloader />
  }
  await authSession(params)
  const executionId = params.executionId
  prefetchServerExecution(executionId)
  return (
    <div className='h-full p-4 md:px-10 md:py-6'>
      <div className='mx-auto flex h-full w-full max-w-6xl flex-col gap-y-8'>
        <HydrateClient>
          <ErrorBoundary
            fallback={<ExecutionsError message='Error loading execution' />}
          >
            <Suspense
              fallback={<ExecutionsLoading message='Loading execution...' />}
            >
              <ExecutionView executionId={executionId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  )
}

export default ExecutionPage
