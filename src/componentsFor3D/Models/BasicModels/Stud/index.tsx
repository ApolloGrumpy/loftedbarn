/* eslint-disable @typescript-eslint/no-unused-vars */
import Textures from '@/utils/Textures.json'
import { Addition, Base, Geometry, Subtraction } from '@react-three/csg'
import { RepeatWrapping, TextureLoader } from 'three'
import { useMemo } from 'react'

interface StudPropsType {
  args: [number, number, number]
  position: [number, number, number]
  rotation: [number, number, number]
}

export default function Stud({ args, position, rotation }: StudPropsType) {
  const FloorTexture = useMemo(() => {
    const map = new TextureLoader().load(Textures.Wood_InteriorFloor.map)
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(0.1, 1)

    return { map: map }
  }, [])

  return (
    <Addition
      position={position}
      rotation={rotation}>
      <boxGeometry args={args} />
    </Addition>
  )
}
