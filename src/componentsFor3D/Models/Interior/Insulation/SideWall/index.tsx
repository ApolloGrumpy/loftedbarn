/* eslint-disable @typescript-eslint/no-unused-vars */
import Textures from '@/utils/Textures.json'
import { RepeatWrapping, TextureLoader } from 'three'
import { useMemo } from 'react'

interface SideWallInsulationPropsType {
  pos: [number, number, number]
  rot: [number, number, number]
  size: [number, number]
}

export default function SideWallInsulation({ pos, rot, size }: SideWallInsulationPropsType) {
  const SideWall = useMemo(() => {
    const insulationMap = new TextureLoader().load(Textures.Wood_Interior.map)
    insulationMap.wrapS = RepeatWrapping
    insulationMap.wrapT = RepeatWrapping
    insulationMap.repeat.set(3, 3)

    return { insulationMap: insulationMap }
  }, [])

  return (
    <mesh
      castShadow
      receiveShadow
      position={pos}
      rotation={rot}>
      <planeGeometry args={[size[0], size[1], 1, 1]} />
      <meshStandardMaterial map={SideWall.insulationMap} />
    </mesh>
  )
}
