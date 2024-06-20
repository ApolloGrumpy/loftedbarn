/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'

interface IStoreBuilding {
  buildingWidth: number
  buildingDepth: number
  buildingHeight: number
  buildingDeltaHeight: number
  setWidth: (value: number) => void
  setHeight: (value: number) => void
  setDepth: (value: number) => void
  setDeltaHeight: (value: number) => void
}

export const useBuilding = create<IStoreBuilding>((set) => ({
  buildingWidth: 8,
  buildingDepth: 8,
  buildingHeight: 6,
  buildingDeltaHeight: 4.6,
  setWidth: (value) =>
    set(() => ({
      buildingWidth: value
    })),
  setHeight: (value) =>
    set(() => ({
      buildingHeight: value
    })),
  setDepth: (value) =>
    set(() => ({
      buildingDepth: value
    })),
  setDeltaHeight: (value) =>
    set(() => ({
      buildingDeltaHeight: value
    }))
}))
