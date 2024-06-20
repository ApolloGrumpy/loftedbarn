/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import CameraControlLayout from '@/components/CameraControlLayout'
import Scene from './Scene'
import Sidebar from '@/components/Sidebar'
import ViewModeLayout from '@/components/ViewModeLayout'
import { useStoreCamera } from '@/store/useCamera'

export default function Design() {
  const { fullScreen } = useStoreCamera()
  return (
    <div className="flex h-full w-full p-4">
      {fullScreen === false && <Sidebar />}
      <div className="relative w-full overflow-hidden">
        <Scene />
        {fullScreen === false && <ViewModeLayout />}
        <CameraControlLayout />
      </div>
    </div>
  )
}
