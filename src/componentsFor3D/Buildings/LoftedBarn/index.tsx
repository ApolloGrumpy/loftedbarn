/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BuildingsInfo from '@/utils/BuildingsInfo.json'
import SideWall from '@/componentsFor3D/Models/Walls/SideWall'
import EndWall from '@/componentsFor3D/Models/Walls/EndWall'
import Roof from '@/componentsFor3D/Models/Roof'
import Floor from '@/componentsFor3D/Models/Floor'
import ItemGroup from '@/componentsFor3D/ItemGroup'
import SideWallInsulation from '@/componentsFor3D/Models/Interior/Insulation/SideWall'
import EndWallInsulation from '@/componentsFor3D/Models/Interior/Insulation/EndWall'
import { useBuilding } from '@/store/useBuilding'

interface BuildingInfoType {
  width: number
  height: number
  depth: number
  deltaHeight: number
}

export default function LoftedBarn() {
  const { buildingWidth, buildingHeight, buildingDepth, buildingDeltaHeight } = useBuilding()
  const LoftedBarnInfo: BuildingInfoType = {
    width: buildingWidth,
    height: buildingHeight,
    depth: buildingDepth,
    deltaHeight: buildingDeltaHeight
  }

  return (
    <group
      castShadow
      receiveShadow>
      <group
        castShadow
        receiveShadow>
        <SideWall
          flag={true}
          height={LoftedBarnInfo.height}
          depth={LoftedBarnInfo.depth}
          position={[LoftedBarnInfo.width / 2 - 0.1, 0, LoftedBarnInfo.depth / 2 - 0.15]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <SideWall
          flag={false}
          height={LoftedBarnInfo.height}
          depth={LoftedBarnInfo.depth}
          position={[-LoftedBarnInfo.width / 2, 0, LoftedBarnInfo.depth / 2 - 0.15]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <EndWall
          wall={'EndWallFront'}
          width={LoftedBarnInfo.width}
          height={LoftedBarnInfo.height}
          position={[0, LoftedBarnInfo.height, LoftedBarnInfo.depth / 2 - 0.15]}
          rotation={[0, 0, 0]}
        />
        <EndWall
          wall={'EndWallBack'}
          width={LoftedBarnInfo.width}
          height={LoftedBarnInfo.height}
          position={[0, LoftedBarnInfo.height, -LoftedBarnInfo.depth / 2 - 0.05]}
          rotation={[0, 0, 0]}
        />
      </group>
      <group
        castShadow
        receiveShadow>
        <SideWallInsulation
          pos={[-LoftedBarnInfo.width / 2 + 0.11, LoftedBarnInfo.height / 2, -0.05]}
          rot={[0, Math.PI / 2, 0]}
          size={[LoftedBarnInfo.depth - 0.2, LoftedBarnInfo.height]}
        />
        <SideWallInsulation
          pos={[LoftedBarnInfo.width / 2 - 0.11, LoftedBarnInfo.height / 2, -0.05]}
          rot={[0, -Math.PI / 2, 0]}
          size={[LoftedBarnInfo.depth - 0.2, LoftedBarnInfo.height]}
        />
      </group>
      <group
        castShadow
        receiveShadow>
        <EndWallInsulation
          pos={[0, LoftedBarnInfo.height, -LoftedBarnInfo.depth / 2 + 0.06]}
          rot={[0, 0, 0]}
          width={LoftedBarnInfo.width}
          height={LoftedBarnInfo.height}
        />
        <EndWallInsulation
          pos={[0, LoftedBarnInfo.height, LoftedBarnInfo.depth / 2 - 0.16]}
          rot={[0, Math.PI, 0]}
          width={LoftedBarnInfo.width}
          height={LoftedBarnInfo.height}
        />
      </group>
      <Roof
        width={LoftedBarnInfo.width}
        depth={LoftedBarnInfo.depth}
        deltaHeight={LoftedBarnInfo.deltaHeight}
        position={[0, LoftedBarnInfo.height, -LoftedBarnInfo.depth / 2 - 0.05]}
        rotation={[0, 0, 0]}
      />
      <Floor
        width={LoftedBarnInfo.width}
        depth={LoftedBarnInfo.depth}
        position={[0, 0.05, -0.05]}
      />
      <ItemGroup />
    </group>
  )
}
