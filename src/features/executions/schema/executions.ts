import { ExecutionStatusType, IExecutionStatusType } from '@/config/enums'
import { ULIDSchema } from '@/features/workflows/schema/helper'
import { WorkflowSelectSchema } from '@/features/workflows/schema/workflow'
import z from 'zod'

export const ExecutionSelectSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  status: z.enum(ExecutionStatusType as unknown as IExecutionStatusType[]),
  updated_at: z.date(),
  created_at: z.date(),
  deleted_at: z.date().nullable(),
  secret: z.string().nullable(),
  started_at: z.date(),
  completed_at: z.date().nullable(),
  inngest_event_id: z.string(),
  output: z.unknown(),
  workflowId: z.string().nullable(),
  error: z.string().nullable(),
  error_stack: z.string().nullable(),
  workflow: WorkflowSelectSchema.optional(),
})

// Type inference for TypeScript
export const ExecutionInsertSchema = ExecutionSelectSchema.pick({
  name: true,
  userId: true,
  status: true,
  workflowId: true,
  inngest_event_id: true,
  secret: true,
}).extend({
  started_at: z.date().default(() => new Date()),
  output: z.unknown().optional(),
  error: z.string().nullable().optional(),
  error_stack: z.string().nullable().optional(),
  completed_at: z.date().nullable().optional(),
})

export const ExecutionInsertBulkSchema = z
  .array(ExecutionInsertSchema)
  .min(1, { message: 'Provide executions data' })

export const ExecutionUpdateSchema = ExecutionInsertSchema.extend({
  status: ExecutionInsertSchema.shape.status.optional(),
  name: ExecutionInsertSchema.shape.name.optional(),
  userId: ExecutionInsertSchema.shape.userId.optional(),
  workflowId: ExecutionInsertSchema.shape.workflowId.optional(),
  inngest_event_id: ExecutionInsertSchema.shape.inngest_event_id.optional(),
  secret: ExecutionInsertSchema.shape.secret.optional(),
  started_at: ExecutionInsertSchema.shape.started_at.optional(),
  output: ExecutionInsertSchema.shape.output.optional(),
  error: ExecutionInsertSchema.shape.error.optional(),
  error_stack: ExecutionInsertSchema.shape.error_stack.optional(),
  completed_at: ExecutionInsertSchema.shape.completed_at.optional(),
  updated_at: z.date().default(() => new Date()),
  deleted_at: z.date().nullable().optional(),
  id: ULIDSchema('Provide a valid Id'),
})

export type IExecutionInsert = z.infer<typeof ExecutionInsertSchema>
export type IExecutionUpdate = z.infer<typeof ExecutionUpdateSchema>
export type IExecution = z.infer<typeof ExecutionSelectSchema>
