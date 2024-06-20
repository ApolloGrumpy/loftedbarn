/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as THREE from 'three'
import BuildingsInfo from '@/utils/BuildingsInfo.json'
import DoorsInfo from '@/utils/DoorsInfo.json'
import { useBuilding } from '@/store/useBuilding'
import { useItem } from '@/store/useItem'

interface ItemInfoType {
  key: number
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

export default function ItemController() {
  const { itemCount, itemData, addItemData, increaseItemCount } = useItem()

  let addItemInfo: ItemInfoType = {
    key: 0,
    name: '',
    wall: '',
    size: [0, 0, 0],
    pos: [0, 0, 0],
    rot: [0, 0, 0]
  }
  const DoubleDoorInfo = DoorsInfo.DoubleDoor
  const WindowInfo = DoorsInfo.Window
  const { buildingWidth, buildingHeight, buildingDepth, buildingDeltaHeight } = useBuilding()
  const LoftedBarnInfo: BuildingInfoType = {
    width: buildingWidth,
    height: buildingHeight,
    depth: buildingDepth,
    deltaHeight: buildingDeltaHeight
  }
  const insideWidth = Math.sin(Math.PI / 4) * (LoftedBarnInfo.width / 2)

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

  const doOverlap = (rect1l: THREE.Vec2, rect1r: THREE.Vec2, rect2l: THREE.Vec2, rect2r: THREE.Vec2) => {
    if (rect1l.x === rect1r.x || rect1l.y === rect1r.y || rect2r.x === rect2l.x || rect2l.y === rect2r.y) return false
    if (rect1l.x > rect2r.x || rect2l.x > rect1r.x) return false
    if (rect1r.y > rect2l.y || rect2r.y > rect1l.y) return false
    return true
  }

  const onClickHandle = (name: string): void => {
    if (name === 'DoubleDoor') {
      const points: number[] = []
      itemData.filter((item) => {
        if (item.wall === 'EndWallFront' && item.name === 'DoubleDoor') {
          points.push(item.pos[0] - item.size[0] / 2, item.pos[0] + item.size[0] / 2)
        }
      })
      points.push(-LoftedBarnInfo.width / 2 + 0.6)
      points.push(LoftedBarnInfo.width / 2 - 0.6)
      points.sort(function (a, b) {
        return a - b
      })

      const count = itemData.filter((item) => {
        if (item.wall === 'EndWallFront') return item
      }).length

      for (let i = 0; i <= count * 2 + 1; i += 2) {
        if (points[i + 1] - points[i] > DoubleDoorInfo.width) {
          addItemInfo = {
            key: itemCount + 1,
            name: 'DoubleDoor',
            wall: 'EndWallFront',
            size: [DoubleDoorInfo.width + 0.6, DoubleDoorInfo.height + 0.3, DoubleDoorInfo.depth],
            pos: [0, (DoubleDoorInfo.height + 0.2) / 2, LoftedBarnInfo.depth / 2 - DoubleDoorInfo.depth / 2 + 0.01],
            rot: [0, 0, 0]
          }
          addItemData(addItemInfo)
          increaseItemCount()
          return
        }
      }
    } else if (name === 'Window') {
      const polygon1: Point[] = [
        { x: -LoftedBarnInfo.width / 2, y: 0 },
        { x: LoftedBarnInfo.width / 2, y: 0 },
        { x: LoftedBarnInfo.width / 2, y: LoftedBarnInfo.height },
        { x: insideWidth, y: LoftedBarnInfo.height + insideWidth },
        { x: 0, y: LoftedBarnInfo.height + LoftedBarnInfo.width / 2 },
        { x: -insideWidth, y: LoftedBarnInfo.height + insideWidth },
        { x: -LoftedBarnInfo.width / 2, y: LoftedBarnInfo.height }
      ]

      const count = itemData.filter((item) => {
        if (item.name === 'Window') return item
      }).length

      if (count === 0) {
        addItemInfo = {
          key: itemCount + 1,
          name: 'Window',
          wall: 'EndWallFront',
          size: [WindowInfo.width, WindowInfo.height, WindowInfo.depth],
          pos: [0, WindowInfo.height + LoftedBarnInfo.height, LoftedBarnInfo.depth / 2 - WindowInfo.depth / 2 + 0.01],
          rot: [0, 0, 0]
        }
        addItemData(addItemInfo)
        increaseItemCount()
      } else {
        const windowItem = itemData.filter((item) => {
          if (item.name === 'Window') return item
        })

        let outFlag = false

        windowItem.map((item) => {
          if (outFlag) return
          const polygon2: Point[] = [
            { x: item.pos[0] + WindowInfo.width + 0.1 - WindowInfo.width / 2, y: item.pos[1] - WindowInfo.height / 2 },
            { x: item.pos[0] + WindowInfo.width + 0.1 + WindowInfo.width / 2, y: item.pos[1] - WindowInfo.height / 2 },
            { x: item.pos[0] + WindowInfo.width + 0.1 + WindowInfo.width / 2, y: item.pos[1] + WindowInfo.height / 2 },
            { x: item.pos[0] + WindowInfo.width + 0.1 - WindowInfo.width / 2, y: item.pos[1] + WindowInfo.height / 2 }
          ]

          let overlap = false
          let mapCount = 0

          const rect1LeftTop: THREE.Vec2 = new THREE.Vector2(
            item.pos[0] + WindowInfo.width + 0.1 - WindowInfo.width / 2,
            item.pos[1] + WindowInfo.height / 2
          )
          const rect1RightDown: THREE.Vec2 = new THREE.Vector2(
            item.pos[0] + WindowInfo.width + 0.1 + WindowInfo.width / 2,
            item.pos[1] - WindowInfo.height / 2
          )
          windowItem.map((window, index) => {
            const rect2LeftTop: THREE.Vec2 = new THREE.Vector2(window.pos[0] - WindowInfo.width / 2, window.pos[1] + WindowInfo.height / 2)
            const rect2LeftDown: THREE.Vec2 = new THREE.Vector2(window.pos[0] + WindowInfo.width / 2, window.pos[1] - WindowInfo.height / 2)

            if (doOverlap(rect1LeftTop, rect1RightDown, rect2LeftTop, rect2LeftDown)) overlap = true
            mapCount = index
          })

          if (mapCount === windowItem.length - 1) {
            if (doPolygonsOverlap(polygon1, polygon2) && overlap === false) {
              addItemInfo = {
                key: itemCount + 1,
                name: 'Window',
                wall: 'EndWallFront',
                size: [WindowInfo.width, WindowInfo.height, WindowInfo.depth],
                pos: [item.pos[0] + WindowInfo.width, item.pos[1], LoftedBarnInfo.depth / 2 - WindowInfo.depth / 2 + 0.01],
                rot: [0, 0, 0]
              }
              addItemData(addItemInfo)
              increaseItemCount()
              outFlag = true
              return
            }
          }
        })
      }
    }
  }

  return (
    <div>
      <button
        onClick={() => onClickHandle('DoubleDoor')}
        className="border text-sm">
        AddDoor
      </button>
      <button
        onClick={() => onClickHandle('Window')}
        className="border text-sm">
        AddWindow
      </button>
    </div>
  )
}
