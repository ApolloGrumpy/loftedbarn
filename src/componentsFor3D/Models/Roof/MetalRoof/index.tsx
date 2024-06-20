/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-imports */
import RightSideMetalRoof from '../../BasicModels/Roof/MetalRoof/RightSideMetalRoof'
import LeftSideMetalRoof from '../../BasicModels/Roof/MetalRoof/LeftSideMetalRoof'

interface MetalRoofPropsType {
  width: number
  depth: number
}

export default function MetalRoof({ width, depth }: MetalRoofPropsType) {
  const outsideWidth = Math.sin(Math.PI / 4) * (width / 2 + 0.5)
  const outsideFWidth = Math.sqrt(outsideWidth * outsideWidth + (width / 2 + 0.5 - outsideWidth) * (width / 2 + 0.5 - outsideWidth))

  return (
    <group
      castShadow
      receiveShadow>
      <group
        castShadow
        receiveShadow
        rotation={[0, 0, -(Math.PI * 67.5) / 180]}
        position={[outsideWidth, outsideWidth, 0]}>
        <RightSideMetalRoof
          position={[0, 0, depth]}
          rotation={[0, Math.PI / 2, 0]}
          width={depth}
          depth={outsideFWidth + 0.05}
        />
      </group>
      <group
        castShadow
        receiveShadow
        rotation={[0, 0, -Math.PI / 2 + (Math.PI * 67.5) / 180]}
        position={[0, width / 2 + 0.5, 0]}>
        <RightSideMetalRoof
          position={[0, 0, depth]}
          rotation={[0, Math.PI / 2, 0]}
          width={depth}
          depth={outsideFWidth + 0.05}
        />
      </group>
      <group
        castShadow
        receiveShadow
        rotation={[0, Math.PI, -Math.PI / 2 + (Math.PI * 67.5) / 180]}
        position={[0, width / 2 + 0.5, 0]}>
        <LeftSideMetalRoof
          position={[0, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          width={depth}
          depth={outsideFWidth + 0.05}
        />
      </group>
      <group
        castShadow
        receiveShadow
        rotation={[0, Math.PI, -(Math.PI * 67.5) / 180]}
        position={[-outsideWidth, outsideWidth, 0]}>
        <LeftSideMetalRoof
          position={[0, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          width={depth}
          depth={outsideFWidth + 0.05}
        />
      </group>
    </group>
  )
}
