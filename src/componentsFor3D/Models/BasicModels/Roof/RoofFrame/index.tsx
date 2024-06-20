/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Textures from '@/utils/Textures.json'
import { useViewModelLayout } from '@/store/useViewModelLayout'
import { useMemo } from 'react'
import { RepeatWrapping, Shape, TextureLoader } from 'three'
import { useBuilding } from '@/store/useBuilding'

interface RoofFramePropsType {
  width: number
  depth: number
  deltaHeight: number
}

interface BuildingInfoType {
  width: number
  height: number
  depth: number
  deltaHeight: number
}

export default function RoofFrame({ width, depth, deltaHeight }: RoofFramePropsType) {
  const { buildingWidth, buildingHeight, buildingDepth, buildingDeltaHeight } = useBuilding()

  const LoftedBarnInfo: BuildingInfoType = {
    width: buildingWidth,
    height: buildingHeight,
    depth: buildingDepth,
    deltaHeight: buildingDeltaHeight
  }

  const { state } = useViewModelLayout()
  const outsideWidth = Math.sin(Math.PI / 4) * (width / 2 + 0.5)
  const insideWidth = Math.sin(Math.PI / 4) * (width / 2)
  const InsideWidth = Math.sin(Math.PI / 4) * (width / 2 - 0.4)

  const FloorTexture = useMemo(() => {
    const map = new TextureLoader().load(Textures.Wood_InteriorFloor.map)
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(0.1, 1)

    return { map: map }
  }, [])

  const OutsideRoofFrameShape = useMemo(() => {
    const modelShape = new Shape()
    modelShape.moveTo(-(width / 2 + 0.5), 0)
    modelShape.lineTo(-outsideWidth, outsideWidth)
    modelShape.lineTo(0, width / 2 + 0.5)
    modelShape.lineTo(outsideWidth, outsideWidth)
    modelShape.lineTo(width / 2 + 0.5, 0)
    modelShape.lineTo(width / 2, 0)
    modelShape.lineTo(insideWidth, insideWidth)
    modelShape.lineTo(0, width / 2)

    modelShape.lineTo(-insideWidth, insideWidth)
    modelShape.lineTo(-width / 2, 0)

    modelShape.closePath()

    return modelShape
  }, [buildingWidth, buildingDeltaHeight])

  const InsideRoofFrameShape = useMemo(() => {
    const modelShape = new Shape()
    modelShape.moveTo(width / 2 - 0.1, 0)
    modelShape.lineTo(insideWidth, insideWidth)
    modelShape.lineTo(0, width / 2)
    modelShape.lineTo(-insideWidth, insideWidth)
    modelShape.lineTo(-width / 2 + 0.12, 0)

    modelShape.lineTo(-width / 2 + 0.52, 0)
    modelShape.lineTo(-InsideWidth, InsideWidth)
    modelShape.lineTo(0, width / 2 - 0.4)
    modelShape.lineTo(InsideWidth, InsideWidth)
    modelShape.lineTo(width / 2 - 0.52, 0)

    modelShape.closePath()

    return modelShape
  }, [buildingWidth, buildingDeltaHeight])

  const studArray = useMemo(() => {
    const array = []

    for (let i = 0; i < LoftedBarnInfo.depth / 2; i++) {
      array.push([0, 0, i * 1.93 + 0.11])
    }

    return array
  }, [buildingWidth, buildingHeight, buildingDepth, buildingDeltaHeight])

  return (
    <group
      castShadow
      receiveShadow>
      <mesh
        castShadow
        receiveShadow>
        <extrudeGeometry
          args={[
            OutsideRoofFrameShape,
            {
              depth: depth,
              steps: 1,
              bevelEnabled: false,
              bevelThickness: 0,
              bevelSize: 0,
              bevelOffset: 0,
              bevelSegments: 1
            }
          ]}
        />
        <meshStandardMaterial
          metalness={0.9}
          roughness={0.2}
          color={'grey'}
          transparent
          opacity={state === 'interior' ? 0.1 : 1}
        />
      </mesh>
      <mesh
        position={[0, 0, 0.116]}
        castShadow
        receiveShadow>
        <extrudeGeometry
          args={[
            InsideRoofFrameShape,
            {
              depth: 0.4,
              steps: 1,
              bevelEnabled: false,
              bevelThickness: 0,
              bevelSize: 0,
              bevelOffset: 0,
              bevelSegments: 1
            }
          ]}
        />
        <meshStandardMaterial
          color={0xffd6b5}
          map={FloorTexture.map}
        />
      </mesh>
      <mesh
        position={[0, 0, depth - 0.516]}
        castShadow
        receiveShadow>
        <extrudeGeometry
          args={[
            InsideRoofFrameShape,
            {
              depth: 0.4,
              steps: 1,
              bevelEnabled: false,
              bevelThickness: 0,
              bevelSize: 0,
              bevelOffset: 0,
              bevelSegments: 1
            }
          ]}
        />
        <meshStandardMaterial
          color={0xffd6b5}
          map={FloorTexture.map}
        />
      </mesh>
      {studArray.map((item, index) => (
        <mesh
          key={index}
          position={[0, 0, item[2]]}
          castShadow
          receiveShadow>
          <extrudeGeometry
            args={[
              InsideRoofFrameShape,
              {
                depth: 0.2,
                steps: 1,
                bevelEnabled: false,
                bevelThickness: 0,
                bevelSize: 0,
                bevelOffset: 0,
                bevelSegments: 1
              }
            ]}
          />
          <meshStandardMaterial
            color={'#ffd6b5'}
            map={FloorTexture.map}
          />
        </mesh>
      ))}
    </group>
  )
}
