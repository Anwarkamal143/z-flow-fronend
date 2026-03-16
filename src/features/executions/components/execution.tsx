'use client'

import Dataloader from '@/components/loaders'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { formatDateDistanceToNow } from '@/lib/date-time'
import Link from 'next/link'
import { useState } from 'react'
import { useGetSuspenseExecution } from '../api/query-hooks'
import { formatStatus, getStatusIcon } from './executions'

export const ExecutionView = ({ executionId }: { executionId: string }) => {
  const { data: execution, isLoading } = useGetSuspenseExecution({
    id: executionId,
  })
  const [showStackTrace, setShowStackTrace] = useState(false)
  if (isLoading) {
    return <Dataloader />
  }
  const executionData = execution?.data
  const duration = executionData?.completed_at
    ? Math.round(
        (new Date(executionData.completed_at).getTime() -
          new Date(executionData.started_at).getTime()) /
          1000,
      )
    : null
  return (
    <Card className='shadow-none'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          {getStatusIcon(executionData?.status)}
          <div>
            <CardTitle>{formatStatus(executionData?.status)}</CardTitle>
            <CardDescription>
              Execution for {executionData?.workflow.name}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-muted-foreground text-sm font-medium'>
              Workflow
            </p>
            <Link
              prefetch
              className='text-primary text-sm hover:underline'
              href={`/workflows/${executionData?.workflowId}`}
            >
              {executionData?.workflow.name}
            </Link>
          </div>
          <div>
            <p className='text-muted-foreground text-sm font-medium'>Status</p>
            <p className='text-sm'>{formatStatus(executionData?.status)}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm font-medium'>Started</p>
            <p className='text-sm'>
              {formatDateDistanceToNow(executionData?.started_at)}
            </p>
          </div>
          {executionData?.completed_at ? (
            <div>
              <p className='text-muted-foreground text-sm font-medium'>
                Completed
              </p>
              <p className='text-sm'>
                {formatDateDistanceToNow(executionData?.completed_at)}
              </p>
            </div>
          ) : null}
          {duration != null ? (
            <div>
              <p className='text-muted-foreground text-sm font-medium'>
                Duration
              </p>
              <p className='text-sm'>{duration}s</p>
            </div>
          ) : null}
          <div>
            <p className='text-muted-foreground text-sm font-medium'>
              Event ID
            </p>
            <p className='text-sm'>{executionData?.inngest_event_id}</p>
          </div>
        </div>
        {executionData?.error ? (
          <div className='mt-6 space-y-3 rounded-md bg-red-50 p-4'>
            <div>
              <p className='mb-2 text-sm font-medium text-red-900'>Error</p>
              <p className='font-mono text-sm text-red-800'>
                {executionData.error}
              </p>
            </div>
            {executionData.error_stack && (
              <Collapsible
                open={showStackTrace}
                onOpenChange={setShowStackTrace}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    className='bg-red-100 text-red-900'
                  >
                    {showStackTrace ? 'Hide stack trace' : 'Show stack trace'}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <pre className='mt-2 overflow-auto rounded bg-red-100 p-2 font-mono text-xs text-red-800'>
                    {executionData.error_stack}
                  </pre>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        ) : null}
        {executionData?.output ? (
          <div className='bg-muted mt-6 rounded-md p-4'>
            <p className='mb-2 text-sm font-medium'>Output</p>
            <pre className='overflow-auto font-mono text-xs'>
              {JSON.stringify(executionData.output, null, 2)}
            </pre>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
