/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from 'react'

interface MenuPropsType {
  fontSize: number
  padding: number
  children: ReactNode
  onChangeHandle: any
}

export default function Menu({ fontSize, padding, children, onChangeHandle }: MenuPropsType) {
  return (
    <select
      id="location"
      name="location"
      className="mt-1 block w-full rounded-md border-gray-300 text-lg font-normal focus:border-blue-500"
      style={{ padding: padding + 'px', fontSize: fontSize + 'px' }}
      defaultValue="Canada"
      onChange={onChangeHandle}>
      {children}
    </select>
  )
}
