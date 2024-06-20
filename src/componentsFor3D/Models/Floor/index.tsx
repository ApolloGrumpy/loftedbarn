/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import FloorBlock from '../BasicModels/FloorBlock'
import Textures from '@/utils/Textures.json'
import { RepeatWrapping, TextureLoader } from 'three'
import { useMemo } from 'react'

interface FloorPropsType {
  width: number
  depth: number
  position: [number, number, number]
}

export default function Floor({ width, depth, position }: FloorPropsType) {
  const FloorTexture = useMemo(() => {
    const map = new TextureLoader().load(Textures.Wood_InteriorFloor.map)
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(3, 3)

    return { map: map }
  }, [])
  return (
    <group
      castShadow
      receiveShadow>
      <mesh
        castShadow
        receiveShadow
        position={position}>
        <boxGeometry args={[width - 0.2, 0.1, depth - 0.2]} />
        <meshStandardMaterial
          map={FloorTexture.map}
          color={'#ffd6b5'}
        />
      </mesh>
      <FloorBlock
        depth={depth}
        position={[width / 4, -0.6, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <FloorBlock
        depth={depth}
        position={[-width / 4, -0.6, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  )
}
