/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

interface IStoreOverlap {
  overlap: boolean
  index: number
  setOverlap: (value: boolean, index: number) => void
}

export const useOverlap = create<IStoreOverlap>((set) => ({
  overlap: false,
  index: NaN,
  setOverlap: (value, index) =>
    set((state) => ({
      ...state,
      overlap: value,
      index: index
    }))
}))
