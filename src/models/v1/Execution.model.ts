import { createCrudClient } from '@/queries/v1'
import { IListCallOptions, IPaginationModes } from '@/queries/v1/types'
import { IExecution } from '@/types/Iexecution'
import { Model } from '.'

class ExecutionModel extends Model<IExecution> {
  constructor() {
    super('/executions', 'public-1')
  }
  // async requestCredit() {
  //   const res = await request("/add-beta-credits", {
  //     method: "POST",
  //     data: {},
  //   });

  //   return res;
  // }
}

const executionModel = new ExecutionModel()
export default executionModel
export const executionClient = createCrudClient(executionModel, {
  defaultParams: { entity: 'executions' },
})
export type ExecutionClient = typeof executionClient
export type ExecutionClientPartialEntity = typeof executionClient.Entity
export type ExecutionClientEntity = typeof executionClient.TEntity
export type ExecutionClientListOptions<
  Mode extends IPaginationModes | undefined = undefined,
  IsSuspense extends boolean = false,
> = IListCallOptions<typeof executionClient.Entity, IsSuspense, Mode>
