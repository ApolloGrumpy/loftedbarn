/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Textures from '@/utils/Textures.json'
import { useMemo } from 'react'
import { RepeatWrapping, Shape, TextureLoader } from 'three'

interface FloorBlockPropsType {
  depth: number
  position: [number, number, number]
  rotation: [number, number, number]
}

export default function FloorBlock({ depth, position, rotation }: FloorBlockPropsType) {
  const FloorTexture = useMemo(() => {
    const map = new TextureLoader().load(Textures.Wood_InteriorFloor.map)
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(1, 1)

    return { map: map }
  }, [])

  const FloorBlockShape = useMemo(() => {
    const modelShape = new Shape()
    modelShape.moveTo(0, 0)
    modelShape.lineTo(-(depth / 2 - 0.3), 0)
    modelShape.lineTo(-depth / 2, 0.3)
    modelShape.lineTo(-depth / 2, 0.6)
    modelShape.lineTo(depth / 2, 0.6)
    modelShape.lineTo(depth / 2, 0.3)
    modelShape.lineTo(depth / 2 - 0.3, 0)

    modelShape.closePath()

    return modelShape
  }, [depth])
  return (
    <mesh
      castShadow
      receiveShadow
      position={position}
      rotation={rotation}>
      <extrudeGeometry
        args={[
          FloorBlockShape,
          {
            depth: 0.5,
            steps: 1,
            bevelEnabled: false,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 1
          }
        ]}
      />
      <meshStandardMaterial map={FloorTexture.map} />
    </mesh>
  )
}
