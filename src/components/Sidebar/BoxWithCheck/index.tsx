/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CheckMark from '@/components/SVGIcon/CheckMark'
import { ReactNode } from 'react'

interface BoxWithCheckPropsType {
  children: ReactNode
  width: number
  height: number
  active: boolean
  onChangeHanlde: any
}

export default function BoxWithCheck({ children, width, height, active, onChangeHanlde }: BoxWithCheckPropsType) {
  return (
    <button
      className="relative box-border flex cursor-pointer items-center border p-1"
      style={{
        width: width,
        height: height,
        borderColor: active ? '#0066DE' : '#C4C4C4',
        backgroundColor: active ? '#0066DE' : 'white',
        color: active ? 'white' : 'black'
      }}
      onClick={onChangeHanlde}>
      {children}
      {active && <CheckMark />}
    </button>
  )
}
