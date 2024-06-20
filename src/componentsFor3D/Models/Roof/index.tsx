/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-imports */
import RoofFrame from '../BasicModels/Roof/RoofFrame'
import RoofCap from '../BasicModels/Roof/RoofCap'
import MetalRoof from './MetalRoof'
import ShingleRoof from './ShingleRoof'
import { useRoof } from '@/store/useRoof'

interface RoofPropsType {
  width: number
  depth: number
  deltaHeight: number
  position: [number, number, number]
  rotation: [number, number, number]
}

export default function Roof({ width, depth, deltaHeight, position, rotation }: RoofPropsType) {
  const { material } = useRoof()
  return (
    <group
      castShadow
      receiveShadow
      position={position}
      rotation={rotation}>
      <RoofFrame
        width={width}
        depth={depth}
        deltaHeight={deltaHeight + 0.2}
      />
      {material === 'metal' ? (
        <MetalRoof
          width={width}
          depth={depth}
        />
      ) : null}
      {material === 'shingle' ? (
        <ShingleRoof
          width={width}
          depth={depth}
        />
      ) : null}
      <RoofCap
        depth={depth}
        width={width}
        position={material === 'metal' ? [0, width / 2 + 0.54, 0] : [0, width / 2 + 0.48, 0]}
      />
    </group>
  )
}
