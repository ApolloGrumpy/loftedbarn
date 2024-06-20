/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-imports */
import RightSideShingleRoof from '../../BasicModels/Roof/ShingleRoof/RightSideShingleRoof'
import LeftSideShingleRoof from '../../BasicModels/Roof/ShingleRoof/LeftSideShingleRoof'

interface ShingleRoofPropsType {
  width: number
  depth: number
}

export default function ShingleRoof({ width, depth }: ShingleRoofPropsType) {
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
        <RightSideShingleRoof
          position={[(outsideFWidth + 0.05) / 2, 0.005, depth / 2]}
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
        <RightSideShingleRoof
          position={[(outsideFWidth + 0.05) / 2, 0.005, depth / 2]}
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
        <LeftSideShingleRoof
          position={[(outsideFWidth + 0.05) / 2, 0.005, -depth / 2]}
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
        <LeftSideShingleRoof
          position={[(outsideFWidth + 0.05) / 2, 0.005, -depth / 2]}
          rotation={[0, Math.PI / 2, 0]}
          width={depth}
          depth={outsideFWidth + 0.05}
        />
      </group>
    </group>
  )
}
