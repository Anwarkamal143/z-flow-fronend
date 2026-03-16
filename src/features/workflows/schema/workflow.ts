import z from 'zod'
import { SelectEdgeSchema } from './edge'
import { ULIDSchema } from './helper'
export const PositionSchema = z.object({
  x: z.number(),
  y: z.number(),
})
export const UpdateWorkflowEdgeSchema = z.object({
  source: SelectEdgeSchema.shape.fromNodeId,
  target: SelectEdgeSchema.shape.toNodeId,
  sourceHandle: SelectEdgeSchema.shape.fromOutput,
  targetHandle: SelectEdgeSchema.shape.toInput,
})

export const UpdateWorkflowWithNodesEdgesSchema = z.object({
  id: ULIDSchema('Invalid Workflow Id'),
  nodes: z.array(
    z.object({
      id: ULIDSchema('Invalid Node Id'),
      type: z.string().nullish(),
      position: PositionSchema,
      data: z.record(z.string(), z.any()).optional(),
      credentialId: ULIDSchema('Invalid Credential Id').nullish(),
    }),
  ),
  edges: z.array(UpdateWorkflowEdgeSchema),
})
export type IUpdateWorkflowWithNodesEdges = z.infer<
  typeof UpdateWorkflowWithNodesEdgesSchema
>

//

export const WorkflowSelectSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  updated_at: z.date(),
  created_at: z.date(),
  deleted_at: z.date().nullable(),
  secret: z.string().optional(),
})

// Type inference for TypeScript
export const WorkflowInsertSchema = WorkflowSelectSchema.pick({
  name: true,
  userId: true,
}).extend({
  secret: z.string().optional(),
  // Optional: Add default timestamps if needed
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
})

export const WorkflowInsertBulkSchema = z
  .array(WorkflowInsertSchema)
  .min(1, { message: 'Provide workflows data' })

export const WorkflowUpdateSchema = WorkflowInsertSchema.extend({
  name: WorkflowInsertSchema.shape.name.optional(),
  userId: WorkflowInsertSchema.shape.userId.optional(),
  secret: WorkflowInsertSchema.shape.secret.optional(),
  updated_at: z.date().default(() => new Date()),
  deleted_at: z.date().nullable().optional(),
  id: ULIDSchema('Provide a valid Id'),
})

// Optional: Schema for soft delete
export const WorkflowSoftDeleteSchema = z.object({
  id: ULIDSchema('Provide a valid Id'),
  deleted_at: z.date().default(() => new Date()),
})

// Optional: Query/filter schema
export const WorkflowQuerySchema = z.object({
  // Pagination
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),

  // Filters
  userId: z.string().optional(),
  search: z.string().optional(),

  // Include soft deleted
  includeDeleted: z.coerce.boolean().optional().default(false),

  // Sorting
  sortBy: z.enum(['name', 'created_at', 'updated_at']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

// Optional: Response schema (transform dates to ISO strings for API)
export const WorkflowResponseSchema = WorkflowSelectSchema.transform(
  (data) => ({
    ...data,
    updated_at: data.updated_at.toISOString(),
    created_at: data.created_at.toISOString(),
    deleted_at: data.deleted_at?.toISOString() ?? null,
  }),
)

export type IWorkflowInsert = z.infer<typeof WorkflowInsertSchema>
export type IWorkflowUpdate = z.infer<typeof WorkflowUpdateSchema>
export type IWorkflow = z.infer<typeof WorkflowSelectSchema>
export type IWorkflowQuery = z.infer<typeof WorkflowQuerySchema>
export type IWorkflowResponse = z.infer<typeof WorkflowResponseSchema>
export type IWorkflowSoftDelete = z.infer<typeof WorkflowSoftDeleteSchema>
