/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BuildingsInfo from '@/utils/BuildingsInfo.json'
import Stud from '../../BasicModels/Stud'
import Textures from '@/utils/Textures.json'
import { Geometry } from '@react-three/csg'
import { RepeatWrapping, Shape, TextureLoader } from 'three'
import { useBuilding } from '@/store/useBuilding'
import { useMemo } from 'react'
import { useViewModelLayout } from '@/store/useViewModelLayout'

interface SideWallPropsType {
  flag: boolean
  height: number
  depth: number
  position: [number, number, number]
  rotation: [number, number, number]
}

interface BuildingInfoType {
  width: number
  height: number
  depth: number
  deltaHeight: number
}

export default function SideWall({ flag, height, depth, position, rotation }: SideWallPropsType) {
  const { buildingWidth, buildingHeight, buildingDepth, buildingDeltaHeight } = useBuilding()
  const LoftedBarnInfo: BuildingInfoType = {
    width: buildingWidth,
    height: buildingHeight,
    depth: buildingDepth,
    deltaHeight: buildingDeltaHeight
  }

  const { state } = useViewModelLayout()
  const SideWallTexture = useMemo(() => {
    const wallNormalMap = new TextureLoader().load(Textures.Siding_LPSmartPanelSiding.normalMap)
    wallNormalMap.wrapS = RepeatWrapping
    wallNormalMap.wrapT = RepeatWrapping
    wallNormalMap.repeat.set(0.2, 0.2)

    return { wallNormalMap: wallNormalMap }
  }, [])

  const FloorTexture = useMemo(() => {
    const map = new TextureLoader().load(Textures.Wood_InteriorFloor.map)
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(0.1, 1)

    return { map: map }
  }, [])

  const SideWallShape = useMemo(() => {
    const modelShape = new Shape()
    modelShape.moveTo(0, 0)
    modelShape.lineTo(depth - 0.2, 0)
    modelShape.lineTo(depth - 0.2, height)
    modelShape.lineTo(0, height)

    return modelShape
  }, [depth, height])

  const studArray = useMemo(() => {
    const array = []

    for (let i = 0; i < LoftedBarnInfo.depth / 2 + 1; i++) {
      if (flag) {
        if (i === 0) {
          array.push([
            [LoftedBarnInfo.width / 2 - 0.32, LoftedBarnInfo.height / 2 + 0.05, i * 1.93 - LoftedBarnInfo.depth / 2 + 0.26],
            [0.4, LoftedBarnInfo.height - 0.1, 0.4]
          ])
        } else if (i === LoftedBarnInfo.depth / 2) {
          array.push([
            [LoftedBarnInfo.width / 2 - 0.32, LoftedBarnInfo.height / 2 + 0.05, LoftedBarnInfo.depth / 2 - 0.366],
            [0.4, LoftedBarnInfo.height - 0.1, 0.4]
          ])
        } else {
          array.push([
            [LoftedBarnInfo.width / 2 - 0.32, LoftedBarnInfo.height / 2 + 0.05, i * 1.93 - LoftedBarnInfo.depth / 2 + 0.16],
            [0.4, LoftedBarnInfo.height - 0.1, 0.2]
          ])
        }
      } else {
        if (i === 0) {
          array.push([
            [-(LoftedBarnInfo.width / 2 - 0.32), LoftedBarnInfo.height / 2 + 0.05, i * 1.93 - LoftedBarnInfo.depth / 2 + 0.26],
            [0.4, LoftedBarnInfo.height - 0.1, 0.4]
          ])
        } else if (i === LoftedBarnInfo.depth / 2) {
          array.push([
            [-(LoftedBarnInfo.width / 2 - 0.32), LoftedBarnInfo.height / 2 + 0.05, LoftedBarnInfo.depth / 2 - 0.366],
            [0.4, LoftedBarnInfo.height - 0.1, 0.4]
          ])
        } else {
          array.push([
            [-(LoftedBarnInfo.width / 2 - 0.32), LoftedBarnInfo.height / 2 + 0.05, i * 1.93 - LoftedBarnInfo.depth / 2 + 0.16],
            [0.4, LoftedBarnInfo.height - 0.1, 0.2]
          ])
        }
      }
    }

    return array
  }, [buildingWidth, buildingHeight, buildingDepth, buildingDeltaHeight])

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        position={position}
        rotation={rotation}>
        <extrudeGeometry
          args={[
            SideWallShape,
            {
              depth: 0.1,
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
          color={'#bd957a'}
          transparent
          opacity={state === 'interior' ? 0.1 : 1}
          normalMap={SideWallTexture.wallNormalMap}
          metalness={Textures.Siding_LPSmartPanelSiding.metalness}
          roughness={Textures.Siding_LPSmartPanelSiding.roughness}
        />
      </mesh>
      <mesh>
        <Geometry>
          {studArray.map((item, index) => (
            <Stud
              key={index}
              args={[item[1][0], item[1][1], item[1][2]]}
              position={[item[0][0], item[0][1], item[0][2]]}
              rotation={[0, 0, 0]}
            />
          ))}
        </Geometry>
        <meshStandardMaterial
          color={'#ffd6b5'}
          map={FloorTexture.map}
        />
      </mesh>
    </group>
  )
}
