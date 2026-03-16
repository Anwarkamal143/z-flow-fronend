'use client'

import { forwardRef, Ref } from 'react'
import { FieldValues } from 'react-hook-form'

import FormMultiSelectFormComponent, {
  FormMultiSelectProps,
} from './multi-select-form-component'

import BaseMultiSelect, {
  IMultiSelectCompnentProps,
} from './multi-select-component'

type FormProps = {
  isFormComponent: true
} & FormMultiSelectProps<FieldValues>

type NormalProps = {
  isFormComponent?: false
} & IMultiSelectCompnentProps

type Props = FormProps | NormalProps

const MultiSelectComp = (props: Props, ref: Ref<HTMLButtonElement>) => {
  const { placeholder = 'Select options' } = props

  if (props.isFormComponent) {
    return <FormMultiSelectFormComponent {...props} placeholder={placeholder} />
  }

  return <BaseMultiSelect {...props} placeholder={placeholder} />
}

export const MultiSelect = forwardRef(MultiSelectComp)

export default MultiSelect
