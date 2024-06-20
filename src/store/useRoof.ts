/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

interface IStoreRoof {
  material: string
  color: string
  setRoofMaterial: (value: string) => void
  setRoofColor: (value: string) => void
}

export const useRoof = create<IStoreRoof>((set) => ({
  material: 'metal',
  color: '#697C83',
  setRoofMaterial: (value) => set(() => ({ material: value })),
  setRoofColor: (value) => set(() => ({ color: value }))
}))
