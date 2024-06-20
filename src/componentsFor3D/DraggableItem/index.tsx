/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as THREE from 'three'
import BuildingsInfo from '@/utils/BuildingsInfo.json'
import DoubleDoor from '../Models/Doors/DoubleDoor'
import Window from '../Models/Doors/Window'
import { useBuilding } from '@/store/useBuilding'
import { useDrag } from '@use-gesture/react'
import { useItem } from '@/store/useItem'
import { useOverlap } from '@/store/useOverlap'
import { useRef } from 'react'
import { useStoreCamera } from '@/store/useCamera'

interface DraggableItemPropsType {
  index: number
  name: string
  wall: string
  size: [number, number, number]
  pos: [number, number, number]
  rot: [number, number, number]
}

interface BuildingInfoType {
  width: number
  height: number
  depth: number
  deltaHeight: number
}

const planeIntersectPoint = new THREE.Vector3()
let deltaPos = new THREE.Vector3()
let moveItem = false
let polygonsOverlap = true

export default function DraggableItem({ index, name, wall, size, pos, rot }: DraggableItemPropsType) {
  const { buildingWidth, buildingHeight, buildingDepth, buildingDeltaHeight } = useBuilding()
  const LoftedBarnInfo: BuildingInfoType = {
    width: buildingWidth,
    height: buildingHeight,
    depth: buildingDepth,
    deltaHeight: buildingDeltaHeight
  }
  const ref = useRef<any>()
  const { cameraRef } = useStoreCamera()
  const { overlap, setOverlap } = useOverlap()
  const { itemData, updateItemData } = useItem()
  const insideWidth = Math.sin(Math.PI / 4) * (LoftedBarnInfo.width / 2)
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -LoftedBarnInfo.depth / 2 + 0.5)

  interface Point {
    x: number
    y: number
  }

  // Function to check if point P is inside polygon (list of vertices)
  function pointInPolygon(P: Point, polygon: Point[]): boolean {
    const n = polygon.length
    let inside = false
    for (let i = 0, j = n - 1; i < n; j = i++) {
      if (
        polygon[i].y > P.y !== polygon[j].y > P.y &&
        P.x < ((polygon[j].x - polygon[i].x) * (P.y - polygon[i].y)) / (polygon[j].y - polygon[i].y) + polygon[i].x
      ) {
        inside = !inside
      }
    }
    return inside
  }

  // Function to check if two polygons overlap
  function doPolygonsOverlap(polygon1: Point[], polygon2: Point[]): boolean {
    const polygonsOverlapA = pointInPolygon(polygon2[0], polygon1)
    const polygonsOverlapB = pointInPolygon(polygon2[1], polygon1)
    const polygonsOverlapC = pointInPolygon(polygon2[2], polygon1)
    const polygonsOverlapD = pointInPolygon(polygon2[3], polygon1)

    if (!polygonsOverlapA) return false
    else if (!polygonsOverlapB) return false
    else if (!polygonsOverlapC) return false
    else if (!polygonsOverlapD) return false
    else return true
  }

  // Example usage

  const doOverlap = (rect1l: THREE.Vec2, rect1r: THREE.Vec2, rect2l: THREE.Vec2, rect2r: THREE.Vec2) => {
    if (rect1l.x === rect1r.x || rect1l.y === rect1r.y || rect2r.x === rect2l.x || rect2l.y === rect2r.y) return false
    if (rect1l.x > rect2r.x || rect2l.x > rect1r.x) return false
    if (rect1r.y > rect2l.y || rect2r.y > rect1l.y) return false
    return true
  }

  const checkOverlapping = (pos: THREE.Vector3) => {
    const rect1Pos = wall.startsWith('SideWall') ? pos.z : pos.x

    const rect1LeftTop: THREE.Vec2 = new THREE.Vector2(rect1Pos - size[0] / 2, pos.y + size[1] / 2)
    const rect1RightDown: THREE.Vec2 = new THREE.Vector2(rect1Pos + size[0] / 2, pos.y - size[1] / 2)

    if (wall.startsWith('EndWall')) {
      for (let i = 0; i < itemData.length; i++) {
        const item = itemData[i]
        if (item.wall === wall && item.key !== index) {
          const rect2LeftTop: THREE.Vec2 = new THREE.Vector2(item.pos[0] - (item.size[0] / 2 + 0.1), item.pos[1] + (item.size[1] / 2 + 0.1))
          const rect2LeftDown: THREE.Vec2 = new THREE.Vector2(
            item.pos[0] + (item.size[0] / 2 + 0.1),
            item.pos[1] - (item.size[1] / 2 + 0.1)
          )

          if (doOverlap(rect1LeftTop, rect1RightDown, rect2LeftTop, rect2LeftDown)) {
            setOverlap(true, index)
            break
          } else {
            setOverlap(false, NaN)
          }
        }
      }
    }
  }

  const bind = useDrag(({ active, event }: any) => {
    let doorX = 0
    let doorY = 0
    let doorZ = 0

    if (active) {
      event.stopPropagation()
      cameraRef.current.enabled = false

      event.ray.intersectPlane(plane, planeIntersectPoint)
      if (!moveItem) {
        deltaPos = new THREE.Vector3(
          planeIntersectPoint.x - ref.current.position.x,
          planeIntersectPoint.y - ref.current.position.y,
          planeIntersectPoint.z - ref.current.position.z
        )
      }

      moveItem = true

      doorX = planeIntersectPoint.x - deltaPos.x
      doorY = planeIntersectPoint.y - deltaPos.y
      doorZ = planeIntersectPoint.z - deltaPos.z

      const polygon1: Point[] = [
        { x: -LoftedBarnInfo.width / 2, y: 0 },
        { x: LoftedBarnInfo.width / 2, y: 0 },
        { x: LoftedBarnInfo.width / 2, y: LoftedBarnInfo.height },
        { x: insideWidth, y: LoftedBarnInfo.height + insideWidth },
        { x: 0, y: LoftedBarnInfo.height + LoftedBarnInfo.width / 2 },
        { x: -insideWidth, y: LoftedBarnInfo.height + insideWidth },
        { x: -LoftedBarnInfo.width / 2, y: LoftedBarnInfo.height }
      ]
      const polygon2: Point[] = [
        { x: doorX - size[0] / 2, y: doorY - size[1] / 2 },
        { x: doorX + size[0] / 2, y: doorY - size[1] / 2 },
        { x: doorX + size[0] / 2, y: doorY + size[1] / 2 },
        { x: doorX - size[0] / 2, y: doorY + size[1] / 2 }
      ]

      if (name === 'DoubleDoor') {
        if (planeIntersectPoint.x > LoftedBarnInfo.width / 2 + deltaPos.x - size[0] / 2 - 0.1)
          planeIntersectPoint.x = LoftedBarnInfo.width / 2 + deltaPos.x - size[0] / 2 - 0.1
        if (planeIntersectPoint.x < -LoftedBarnInfo.width / 2 + deltaPos.x + size[0] / 2 + 0.1)
          planeIntersectPoint.x = -LoftedBarnInfo.width / 2 + deltaPos.x + size[0] / 2 + 0.1

        doorX = planeIntersectPoint.x - deltaPos.x
        doorY = planeIntersectPoint.y - deltaPos.y
        doorZ = planeIntersectPoint.z - deltaPos.z

        checkOverlapping(new THREE.Vector3(doorX, pos[1], pos[2]))
        ref.current.position.set(doorX, pos[1], pos[2])
      }
      if (name === 'Window') {
        if (doPolygonsOverlap(polygon1, polygon2)) {
          checkOverlapping(new THREE.Vector3(doorX, doorY, doorZ))
          polygonsOverlap = true
          if (ref.current) {
            if (name === 'Window') ref.current.position.set(doorX, doorY, pos[2])
          }
        } else {
          polygonsOverlap = false
          ref.current.position.set(pos[0], pos[1], pos[2])
          setOverlap(false, NaN)
        }
      }
    } else {
      moveItem = false
      cameraRef.current.enabled = true
      if (overlap || polygonsOverlap === false) {
        ref.current.position.set(pos[0], pos[1], pos[2])
        setOverlap(false, NaN)
      } else {
        if (name === 'DoubleDoor') {
          updateItemData(
            { key: index, name: name, wall: wall, size: size, pos: [planeIntersectPoint.x - deltaPos.x, pos[1], pos[2]], rot: rot },
            index
          )
        }
        if (name === 'Window') {
          updateItemData(
            {
              key: index,
              name: name,
              wall: wall,
              size: size,
              pos: [planeIntersectPoint.x - deltaPos.x, planeIntersectPoint.y - deltaPos.y, pos[2]],
              rot: rot
            },
            index
          )
        }
      }
    }
  })

  return (
    <mesh
      castShadow
      receiveShadow
      ref={ref}
      {...(bind() as any)}
      position={pos}
      rotation={rot}>
      {name === 'DoubleDoor' ? <DoubleDoor doorIndex={index} /> : null}
      {name === 'Window' ? <Window windowIndex={index} /> : null}
    </mesh>
  )
}
