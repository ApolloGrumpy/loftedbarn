/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Textures from '@/utils/Textures.json'
import { RepeatWrapping, Shape, TextureLoader } from 'three'
import { useMemo } from 'react'

interface EndWallInsulationPropsType {
  pos: [number, number, number]
  rot: [number, number, number]
  width: number
  height: number
}

export default function EndWallInsulation({ pos, rot, width, height }: EndWallInsulationPropsType) {
  const insideWidth = Math.sin(Math.PI / 4) * (width / 2)

  const EndWall = useMemo(() => {
    const insulationMap = new TextureLoader().load(Textures.Wood_Interior.map)
    insulationMap.wrapS = RepeatWrapping
    insulationMap.wrapT = RepeatWrapping
    insulationMap.repeat.set(0.3, 0.3)

    return { insulationMap: insulationMap }
  }, [])

  const EndWallShape = useMemo(() => {
    const modelShape = new Shape()
    modelShape.moveTo(width / 2, 0)
    modelShape.lineTo(insideWidth, insideWidth)
    modelShape.lineTo(0, width / 2)
    modelShape.lineTo(-insideWidth, insideWidth)
    modelShape.lineTo(-width / 2, 0)
    modelShape.lineTo(-width / 2 + 0.1, -height + 0.1)

    modelShape.lineTo(-width / 2 + 0.1, -height + 0.1)
    modelShape.lineTo(width / 2 - 0.1, -height + 0.1)
    modelShape.lineTo(width / 2, 0)

    return modelShape
  }, [width, height])

  return (
    <mesh
      castShadow
      receiveShadow
      position={pos}
      rotation={rot}>
      <shapeGeometry args={[EndWallShape]} />
      <meshStandardMaterial map={EndWall.insulationMap} />
    </mesh>
  )
}
