/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

interface IStoreViewModelLayout {
  state: string
  setState: (value: string) => void
}

export const useViewModelLayout = create<IStoreViewModelLayout>((set) => ({
  state: 'exterior',
  setState: (value) =>
    set((state) => ({
      ...state,
      state: value
    }))
}))
