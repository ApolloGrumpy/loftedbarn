/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Textures from '@/utils/Textures.json'
import { useViewModelLayout } from '@/store/useViewModelLayout'
import { useMemo } from 'react'
import { RepeatWrapping, TextureLoader } from 'three'
import { useRoof } from '@/store/useRoof'

interface LeftSideShingleRoofPropsType {
  width: number
  depth: number
  rotation: [number, number, number]
  position: [number, number, number]
}

export default function LeftSideShingleRoof({ width, depth, rotation, position }: LeftSideShingleRoofPropsType) {
  const { state } = useViewModelLayout()
  const { color } = useRoof()

  const ShingleTexture = useMemo(() => {
    const map = new TextureLoader().load(Textures.Roofing_Shingles_DesertTan.map)
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(width / 3, 3)

    return { map: map }
  }, [width])

  return (
    <mesh
      castShadow
      receiveShadow
      position={position}
      rotation={rotation}>
      <boxGeometry args={[width, 0.01, depth]} />
      <meshStandardMaterial
        map={ShingleTexture.map}
        roughness={1}
        metalness={0.1}
        transparent
        color={color}
        opacity={state === 'interior' ? 0.1 : 1}
      />
    </mesh>
  )
}
