import { IExecutionStatusType } from '@/config/enums'
import { IWorkflow } from './Iworkflow'

type IExecution = {
  id: string
  name: string
  userId: string
  status: IExecutionStatusType
  updated_at: Date
  created_at: Date
  deleted_at: Date | null
  secret: string | null
  started_at: Date
  completed_at: Date | null
  inngest_event_id: string
  output: unknown
  workflowId: string | null
  error: string | null
  error_stack: string | null
  workflow: IWorkflow
}
