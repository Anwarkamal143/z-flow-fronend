'use client'

import { forwardRef, Ref } from 'react'
import MultiSelectCommonComponent, { ICommonMultiSelectProps } from './common'

/* -------------------------------- Types -------------------------------- */
export type IMultiSelectCompnentProps = ICommonMultiSelectProps

/* ----------------------------- Component ---------------------------- */
const MultiSelect = forwardRef<HTMLButtonElement, IMultiSelectCompnentProps>(
  (props, ref) => {
    const { placeholder = 'Select options', ...rest } = props

    return (
      <MultiSelectCommonComponent
        name={rest.name}
        placeholder={placeholder}
        {...rest}
        ref={ref}
      />
    )
  },
)

MultiSelect.displayName = 'MultiSelect'

export default MultiSelect