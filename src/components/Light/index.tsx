/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const Lights = () => {
  const light = useRef<any>()

  useFrame(({ camera }) => {
    light.current.position.copy(camera.position)
  })

  return (
    <directionalLight
      position={[7, 10, -10]}
      intensity={2}
      ref={light}
    />
  )
}

export default Lights
