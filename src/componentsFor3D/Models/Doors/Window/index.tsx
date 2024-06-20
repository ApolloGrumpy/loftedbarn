/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import DoorsInfo from '@/utils/DoorsInfo.json'
import { useMemo } from 'react'
import { useOverlap } from '@/store/useOverlap'

interface WindowPropsType {
  windowIndex: number
}

export default function Window({ windowIndex }: WindowPropsType) {
  const { overlap, index } = useOverlap()
  const WindowInfo = DoorsInfo.Window

  const windowFrames = useMemo(() => {
    const posY: Array<number> = []
    for (let i = -8; i < 9; i++) {
      posY.push(0.05 * i)
    }
    return posY
  }, [])

  return (
    <mesh
      castShadow
      receiveShadow>
      <group
        castShadow
        receiveShadow>
        <mesh
          castShadow
          receiveShadow>
          <boxGeometry args={[WindowInfo.width, WindowInfo.height, WindowInfo.depth]} />
          <meshStandardMaterial color={overlap ? (windowIndex === index ? 'red' : 'white') : 'white'} />
        </mesh>
      </group>
      <group
        castShadow
        receiveShadow
        position={[0, 0, 0.115]}>
        {windowFrames.map((value, index) => (
          <mesh
            castShadow
            receiveShadow
            key={index}
            position={[-WindowInfo.width / 2 + (WindowInfo.width - 0.5) / 6 + 0.1, value, 0]}>
            <boxGeometry args={[(WindowInfo.width - 0.5) / 3, 0.03, 0.03]} />
            <meshStandardMaterial color={'white'} />
          </mesh>
        ))}
        {windowFrames.map((value, index) => (
          <mesh
            castShadow
            receiveShadow
            key={index}
            position={[WindowInfo.width / 2 - (WindowInfo.width - 0.5) / 6 - 0.1, value, 0]}>
            <boxGeometry args={[(WindowInfo.width - 0.5) / 3, 0.03, 0.03]} />
            <meshStandardMaterial color={'white'} />
          </mesh>
        ))}
        {windowFrames.map((value, index) => (
          <mesh
            castShadow
            receiveShadow
            key={index}
            position={[0, value, 0]}>
            <boxGeometry args={[(WindowInfo.width - 0.5) / 3, 0.03, 0.03]} />
            <meshStandardMaterial color={'white'} />
          </mesh>
        ))}
      </group>
    </mesh>
  )
}
