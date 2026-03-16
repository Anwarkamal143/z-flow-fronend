import Dataloader from '@/components/loaders'
import { HydrateClient } from '@/components/server'

import Executions, {
  ExecutionsContainer,
  ExecutionsError,
  ExecutionsLoading,
} from '@/features/executions/components/executions'

import { prefetchServerExecutions } from '@/features/executions/server/prefetch'
import { isAccessTokenRefresing } from '@/lib'
import { authSession } from '@/lib/auth/auth'
import { parseServerPaginationParams } from '@/queries/pagination/server/pagination-params'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
type Props = {
  searchParams: Promise<SearchParams>
}

const WorkFlowPage = async (props: Props) => {
  const params = await props.searchParams
  if (isAccessTokenRefresing(params)) {
    return <Dataloader />
  }
  await authSession(params)

  void prefetchServerExecutions({
    params: {
      ...parseServerPaginationParams({ ...params, includeTotal: 'false' }),
    },
  })
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ExecutionsError />}>
        <Suspense fallback={<ExecutionsLoading />}>
          <ExecutionsContainer>
            <Executions />
          </ExecutionsContainer>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default WorkFlowPage
