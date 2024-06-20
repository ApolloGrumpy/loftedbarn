/* eslint-disable @typescript-eslint/no-explicit-any */
import { CameraControls } from '@react-three/drei'
import { create } from 'zustand'
import { createRef } from 'react'

interface IStoreCamera {
  cameraRef: any
  fullScreen: boolean
  download: boolean
  setDownload: (value: boolean) => void
  setFullScreen: (value: boolean) => void
}

export const useStoreCamera = create<IStoreCamera>((set) => ({
  cameraRef: createRef<CameraControls>(),
  download: false,
  fullScreen: false,
  setDownload: (value) => set(() => ({ download: value })),
  setFullScreen: (value) => set(() => ({ fullScreen: value }))
}))
