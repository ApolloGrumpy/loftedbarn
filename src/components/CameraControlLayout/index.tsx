/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import CloudDownload from '../SVGIcon/CloudDownload'
import ZoomIn from '../SVGIcon/ZoomIn'
import ZoomOut from '../SVGIcon/ZoomOut'
import ZoomOutMap from '../SVGIcon/ZoomOutMap'
import { useRef, useState } from 'react'
import { useStoreCamera } from '@/store/useCamera'

export default function CameraControlLayout() {
  const { cameraRef, fullScreen, download, setFullScreen, setDownload } = useStoreCamera()
  const zoomVal = useRef<number>(0.2)
  return (
    <div className="camera-control-layout bottom-16 right-20 flex flex-col space-y-3">
      <div onClick={() => setDownload(true)}>
        <CloudDownload />
      </div>
      <div onClick={() => cameraRef.current?.zoom(-zoomVal.current, true)}>
        <ZoomOut />
      </div>
      <div onClick={() => cameraRef.current?.zoom(zoomVal.current, true)}>
        <ZoomIn />
      </div>
      <div onClick={() => setFullScreen(!fullScreen)}>
        <ZoomOutMap />
      </div>
    </div>
  )
}
