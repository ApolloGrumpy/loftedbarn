/* eslint-disable react/jsx-key */
/* eslint-disable no-restricted-imports */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BuildingsInfo from '@/utils/BuildingsInfo.json'
import { useMemo } from 'react'
import { RepeatWrapping, Shape, TextureLoader } from 'three'
import { useItem } from '@/store/useItem'
import Textures from '@/utils/Textures.json'
import { useViewModelLayout } from '@/store/useViewModelLayout'
import Stud from '../../BasicModels/Stud'
import { Geometry, Subtraction } from '@react-three/csg'
import { useBuilding } from '@/store/useBuilding'

interface EndWallPropsType {
  wall: string
  width: number
  height: number
  position: [number, number, number]
  rotation: [number, number, number]
}

interface BuildingInfoType {
  width: number
  height: number
  depth: number
  deltaHeight: number
}

export default function EndWall({ wall, width, height, position, rotation }: EndWallPropsType) {
  const { buildingWidth, buildingHeight, buildingDepth, buildingDeltaHeight } = useBuilding()
  const LoftedBarnInfo: BuildingInfoType = {
    width: buildingWidth,
    height: buildingHeight,
    depth: buildingDepth,
    deltaHeight: buildingDeltaHeight
  }
  const insideWidth = Math.sin(Math.PI / 4) * (width / 2)
  const outsideWidth = Math.sin(Math.PI / 4) * (width / 2 + 0.5)
  const { itemData } = useItem()
  const { state } = useViewModelLayout()

  const EndWallTexture = useMemo(() => {
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

  const EndWallShape = useMemo(() => {
    const modelShape = new Shape()
    modelShape.moveTo(width / 2, 0)
    modelShape.lineTo(insideWidth, insideWidth)
    modelShape.lineTo(0, width / 2)
    modelShape.lineTo(-insideWidth, insideWidth)
    modelShape.lineTo(-width / 2, 0)
    modelShape.lineTo(-width / 2, -height)

    modelShape.lineTo(-width / 2, -height)
    modelShape.lineTo(width / 2, -height)
    modelShape.lineTo(width / 2, 0)

    if (wall === 'EndWallFront') {
      itemData.map((item) => {
        if (item.wall === 'EndWallFront') {
          const holeShape = new Shape()
          if (item.name === 'DoubleDoor') {
            holeShape.moveTo(item.pos[0] - item.size[0] / 2, item.pos[1] + item.size[1] / 2 - height + 0.15)
            holeShape.lineTo(item.pos[0] + item.size[0] / 2, item.pos[1] + item.size[1] / 2 - height + 0.15)
            holeShape.lineTo(item.pos[0] + item.size[0] / 2, item.pos[1] - item.size[1] / 2 - height + 0.15)
            holeShape.lineTo(item.pos[0] - item.size[0] / 2, item.pos[1] - item.size[1] / 2 - height + 0.15)
            holeShape.lineTo(item.pos[0] - item.size[0] / 2, item.pos[1] + item.size[1] / 2 - height + 0.15)
          }
          if (item.name === 'Window') {
            holeShape.moveTo(item.pos[0] - item.size[0] / 2, item.pos[1] + item.size[1] / 2 - height)
            holeShape.lineTo(item.pos[0] + item.size[0] / 2, item.pos[1] + item.size[1] / 2 - height)
            holeShape.lineTo(item.pos[0] + item.size[0] / 2, item.pos[1] - item.size[1] / 2 - height)
            holeShape.lineTo(item.pos[0] - item.size[0] / 2, item.pos[1] - item.size[1] / 2 - height)
            holeShape.lineTo(item.pos[0] - item.size[0] / 2, item.pos[1] + item.size[1] / 2 - height)
          }
          modelShape.holes.push(holeShape)
        }
      })
    }

    return modelShape
  }, [width, height, itemData])

  const studArray = useMemo(() => {
    const array = []
    const alpha = Math.atan((width / 2 - insideWidth) / insideWidth)
    const deltaWidth = ((width / 2) * insideWidth) / (width / 2 - insideWidth) - width / 2

    for (let i = 1; i < LoftedBarnInfo.width / 2; i++) {
      const deltaH = Math.tan(alpha) * (deltaWidth + width / 2 - Math.abs(i * 1.93 - LoftedBarnInfo.width / 2 + 0.2))
      if (wall === 'EndWallFront') {
        array.push([
          [i * 1.93 - LoftedBarnInfo.width / 2 + 0.2, -LoftedBarnInfo.height / 2 + deltaH / 2, -0.215],
          [0.2, LoftedBarnInfo.height - 0.1 + deltaH, 0.4]
        ])
      }
      if (wall === 'EndWallBack') {
        array.push([
          [i * 1.93 - LoftedBarnInfo.width / 2 + 0.2, -LoftedBarnInfo.height / 2 + deltaH / 2, 0.315],
          [0.2, LoftedBarnInfo.height - 0.1 + deltaH, 0.4]
        ])
      }
    }

    return array
  }, [buildingWidth, buildingHeight, buildingDepth, buildingDeltaHeight])

  return (
    <group
      castShadow
      receiveShadow
      position={position}
      rotation={rotation}>
      <mesh
        castShadow
        receiveShadow>
        <extrudeGeometry
          args={[
            EndWallShape,
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
          color={0xbd957a}
          transparent
          opacity={state === 'interior' ? 0.1 : 1}
          normalMap={EndWallTexture.wallNormalMap}
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
          {itemData.map((item, index) =>
            item.wall === wall ? (
              <Subtraction
                position={[item.pos[0], item.size[1] / 2 - LoftedBarnInfo.height, 0]}
                key={index}>
                <boxGeometry args={[item.size[0], item.size[1], 1]} />
              </Subtraction>
            ) : null
          )}
        </Geometry>
        <meshStandardMaterial
          color={'#ffd6b5'}
          map={FloorTexture.map}
        />
      </mesh>
    </group>
  )
}
