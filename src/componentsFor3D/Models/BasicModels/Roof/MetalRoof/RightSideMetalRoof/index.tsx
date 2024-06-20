/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useViewModelLayout } from '@/store/useViewModelLayout'
import { useMemo } from 'react'
import { Shape } from 'three'
import { useRoof } from '@/store/useRoof'

interface RightSideMetalRoofPropsType {
  width: number
  depth: number
  rotation: [number, number, number]
  position: [number, number, number]
}

export default function RightSideMetalRoof({ width, depth, rotation, position }: RightSideMetalRoofPropsType) {
  const { state } = useViewModelLayout()
  const { color } = useRoof()
  const MetalRoofShape = useMemo(() => {
    const modelShape = new Shape()
    modelShape.moveTo(0, 0)
    for (let i = 0; i < width * 2; i++) {
      modelShape.lineTo(0 + i / 2, 0.01)
      modelShape.lineTo(0.06 + i / 2, 0.06)
      modelShape.lineTo(0.12 + i / 2, 0.01)

      modelShape.lineTo(0.191 + i / 2, 0.01)
      modelShape.lineTo(0.204 + i / 2, 0.03)
      modelShape.lineTo(0.235 + i / 2, 0.03)
      modelShape.lineTo(0.248 + i / 2, 0.01)
      modelShape.lineTo(0.358 + i / 2, 0.01)
      modelShape.lineTo(0.371 + i / 2, 0.03)
      modelShape.lineTo(0.402 + i / 2, 0.03)
      modelShape.lineTo(0.415 + i / 2, 0.01)

      modelShape.lineTo(0.5 + i / 2, 0.01)
    }
    for (let i = width * 2 - 1; i > -1; i--) {
      modelShape.lineTo(0.5 + i / 2, 0)

      modelShape.lineTo(0.415 + i / 2, 0)
      modelShape.lineTo(0.402 + i / 2, 0.02)
      modelShape.lineTo(0.371 + i / 2, 0.02)
      modelShape.lineTo(0.358 + i / 2, 0)
      modelShape.lineTo(0.248 + i / 2, 0)
      modelShape.lineTo(0.235 + i / 2, 0.02)
      modelShape.lineTo(0.204 + i / 2, 0.02)
      modelShape.lineTo(0.191 + i / 2, 0)

      modelShape.lineTo(0.12 + i / 2, 0)
      modelShape.lineTo(0.06 + i / 2, 0.05)
      modelShape.lineTo(0 + i / 2, 0)
    }
    modelShape.closePath()
    return modelShape
  }, [width, depth])

  return (
    <mesh
      castShadow
      receiveShadow
      position={position}
      rotation={rotation}>
      <extrudeGeometry
        args={[
          MetalRoofShape,
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
        metalness={0.5}
        roughness={0.2}
        color={color}
        transparent
        opacity={state === 'interior' ? 0.1 : 1}
      />
    </mesh>
  )
}
