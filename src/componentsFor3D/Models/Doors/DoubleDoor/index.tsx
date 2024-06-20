/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-imports */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import DoorsInfo from '@/utils/DoorsInfo.json'
import Textures from '@/utils/Textures.json'
import { DoubleDoorHandle } from '../../BasicModels/DoubleDoorHandle'
import { DoubleDoorHinge } from '../../BasicModels/DoubleDoorHinge'
import { RepeatWrapping, TextureLoader } from 'three'
import { useMemo } from 'react'
import { useOverlap } from '@/store/useOverlap'

interface DoubleDoorPropsType {
  doorIndex: number
}

export default function DoubleDoor({ doorIndex }: DoubleDoorPropsType) {
  const { overlap, index } = useOverlap()
  const DoubleDoorInfo = DoorsInfo.DoubleDoor
  const FloorTexture = useMemo(() => {
    const map = new TextureLoader().load(Textures.Wood_InteriorFloor.map)
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(0.1, 1)

    return { map: map }
  }, [])

  const DoubleDoorTextures = useMemo(() => {
    const plyWoodNormalMap = new TextureLoader().load(Textures.Wood_PlankPorch.normalMap)
    plyWoodNormalMap.wrapS = RepeatWrapping
    plyWoodNormalMap.wrapT = RepeatWrapping
    plyWoodNormalMap.repeat.set(Textures.Wood_PlankPorch.normalMap_Repeat[0], Textures.Wood_PlankPorch.normalMap_Repeat[1])

    const plyWoodMap = new TextureLoader().load(Textures.Wood_PlankPorch.map)
    plyWoodMap.wrapS = RepeatWrapping
    plyWoodMap.wrapT = RepeatWrapping
    plyWoodMap.repeat.set(Textures.Wood_PlankPorch.map_Repeat[0], Textures.Wood_PlankPorch.map_Repeat[1])

    const doorTrimMap = new TextureLoader().load(Textures.Wood_Trim.normalMap)
    doorTrimMap.wrapS = RepeatWrapping
    doorTrimMap.wrapT = RepeatWrapping
    doorTrimMap.repeat.set(3, 0.5)

    const doorTopTrimMap = new TextureLoader().load(Textures.Wood_Trim.normalMap)
    doorTopTrimMap.wrapS = RepeatWrapping
    doorTopTrimMap.wrapT = RepeatWrapping
    doorTopTrimMap.repeat.set(9, 0.5)

    const doorLeftTrimMap = new TextureLoader().load(Textures.Wood_Trim.normalMap)
    doorLeftTrimMap.wrapS = RepeatWrapping
    doorLeftTrimMap.wrapT = RepeatWrapping
    doorLeftTrimMap.repeat.set(0.4, 10)

    return {
      plyWoodMap: plyWoodMap,
      plyWoodNormalMap: plyWoodNormalMap,
      doorTrimMap: doorTrimMap,
      doorTopTrimMap: doorTopTrimMap,
      doorLeftTrimMap: doorLeftTrimMap
    }
  }, [])

  return (
    <group
      castShadow
      receiveShadow>
      <group
        castShadow
        receiveShadow>
        <mesh
          castShadow
          receiveShadow
          position={[-DoubleDoorInfo.width / 4, DoubleDoorInfo.height / 2 - 0.15, 0]}>
          <boxGeometry args={[DoubleDoorInfo.width / 2 - 0.6, 0.3, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorTrimMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[-DoubleDoorInfo.width / 4, 0, 0]}>
          <boxGeometry args={[DoubleDoorInfo.width / 2 - 0.6, 0.3, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorTrimMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[-DoubleDoorInfo.width / 4, -(DoubleDoorInfo.height / 2 - 0.15), 0]}>
          <boxGeometry args={[DoubleDoorInfo.width / 2 - 0.6, 0.3, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorTrimMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[-DoubleDoorInfo.width / 2 + 0.15, 0, 0]}>
          <boxGeometry args={[0.3, DoubleDoorInfo.height, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorLeftTrimMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[-0.15, 0, 0]}>
          <boxGeometry args={[0.3, DoubleDoorInfo.height, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorLeftTrimMap} />
        </mesh>
      </group>
      <group
        castShadow
        receiveShadow>
        <mesh
          castShadow
          receiveShadow
          position={[DoubleDoorInfo.width / 4, DoubleDoorInfo.height / 2 - 0.15, 0]}>
          <boxGeometry args={[DoubleDoorInfo.width / 2 - 0.6, 0.3, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorTrimMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[DoubleDoorInfo.width / 4, 0, 0]}>
          <boxGeometry args={[DoubleDoorInfo.width / 2 - 0.6, 0.3, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorTrimMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[DoubleDoorInfo.width / 4, -(DoubleDoorInfo.height / 2 - 0.15), 0]}>
          <boxGeometry args={[DoubleDoorInfo.width / 2 - 0.6, 0.3, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorTrimMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[DoubleDoorInfo.width / 2 - 0.15, 0, 0]}>
          <boxGeometry args={[0.3, DoubleDoorInfo.height, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorLeftTrimMap} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0.15, 0, 0]}>
          <boxGeometry args={[0.3, DoubleDoorInfo.height, DoubleDoorInfo.depth]} />
          <meshStandardMaterial normalMap={DoubleDoorTextures.doorLeftTrimMap} />
        </mesh>
      </group>
      <group
        castShadow
        receiveShadow>
        <mesh
          castShadow
          receiveShadow
          position={[-(DoubleDoorInfo.width - 1.2) / 4 - 0.3, (DoubleDoorInfo.height - 0.9) / 4 + 0.15, 0]}>
          <boxGeometry args={[(DoubleDoorInfo.width - 1.2) / 2, (DoubleDoorInfo.height - 0.9) / 2, 0.1]} />
          <meshStandardMaterial
            map={DoubleDoorTextures.plyWoodMap}
            normalMap={DoubleDoorTextures.plyWoodNormalMap}
            color={'#697c83'}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[(DoubleDoorInfo.width - 1.2) / 4 + 0.3, (DoubleDoorInfo.height - 0.9) / 4 + 0.15, 0]}>
          <boxGeometry args={[(DoubleDoorInfo.width - 1.2) / 2, (DoubleDoorInfo.height - 0.9) / 2, 0.1]} />
          <meshStandardMaterial
            map={DoubleDoorTextures.plyWoodMap}
            normalMap={DoubleDoorTextures.plyWoodNormalMap}
            color={0x697c83}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[(DoubleDoorInfo.width - 1.2) / 4 + 0.3, -(DoubleDoorInfo.height - 0.9) / 4 - 0.15, 0]}>
          <boxGeometry args={[(DoubleDoorInfo.width - 1.2) / 2, (DoubleDoorInfo.height - 0.9) / 2, 0.1]} />
          <meshStandardMaterial
            map={DoubleDoorTextures.plyWoodMap}
            normalMap={DoubleDoorTextures.plyWoodNormalMap}
            color={0x697c83}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[-(DoubleDoorInfo.width - 1.2) / 4 - 0.3, -(DoubleDoorInfo.height - 0.9) / 4 - 0.15, 0]}>
          <boxGeometry args={[(DoubleDoorInfo.width - 1.2) / 2, (DoubleDoorInfo.height - 0.9) / 2, 0.1]} />
          <meshStandardMaterial
            map={DoubleDoorTextures.plyWoodMap}
            normalMap={DoubleDoorTextures.plyWoodNormalMap}
            color={0x697c83}
          />
        </mesh>
      </group>
      <group
        castShadow
        receiveShadow>
        <mesh
          castShadow
          receiveShadow
          position={[0, DoubleDoorInfo.height / 2 + 0.15, 0]}>
          <boxGeometry args={[DoubleDoorInfo.width + 0.6, 0.3, 0.2]} />
          <meshStandardMaterial
            color={overlap ? (doorIndex === index ? 'red' : 'white') : 'white'}
            normalMap={DoubleDoorTextures.doorTopTrimMap}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[DoubleDoorInfo.width / 2 + 0.15, 0, 0]}>
          <boxGeometry args={[0.3, DoubleDoorInfo.height, 0.2]} />
          <meshStandardMaterial
            color={overlap ? (doorIndex === index ? 'red' : 'white') : 'white'}
            normalMap={DoubleDoorTextures.doorLeftTrimMap}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[-(DoubleDoorInfo.width / 2 + 0.15), 0, 0]}>
          <boxGeometry args={[0.3, DoubleDoorInfo.height, 0.2]} />
          <meshStandardMaterial
            color={overlap ? (doorIndex === index ? 'red' : 'white') : 'white'}
            normalMap={DoubleDoorTextures.doorLeftTrimMap}
          />
        </mesh>
      </group>
      <group
        castShadow
        receiveShadow>
        <DoubleDoorHinge
          color={'gray'}
          scale={[0.1, 0.1, 0.1]}
          position={[-DoubleDoorInfo.width / 2 + 0.02, 0, 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <DoubleDoorHinge
          color={'gray'}
          scale={[0.1, 0.1, 0.1]}
          position={[-DoubleDoorInfo.width / 2 + 0.02, DoubleDoorInfo.height / 2 - 0.15, 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <DoubleDoorHinge
          color={'gray'}
          scale={[0.1, 0.1, 0.1]}
          position={[-DoubleDoorInfo.width / 2 + 0.02, -(DoubleDoorInfo.height / 2 - 0.15), 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <DoubleDoorHinge
          color={'gray'}
          scale={[0.1, 0.1, 0.1]}
          position={[DoubleDoorInfo.width / 2 - 0.02, 0, 0.1]}
          rotation={[-Math.PI / 2, Math.PI, 0]}
        />
        <DoubleDoorHinge
          color={'gray'}
          scale={[0.1, 0.1, 0.1]}
          position={[DoubleDoorInfo.width / 2 - 0.02, DoubleDoorInfo.height / 2 - 0.15, 0.1]}
          rotation={[-Math.PI / 2, Math.PI, 0]}
        />
        <DoubleDoorHinge
          color={'gray'}
          scale={[0.1, 0.1, 0.1]}
          position={[DoubleDoorInfo.width / 2 - 0.02, -(DoubleDoorInfo.height / 2 - 0.15), 0.1]}
          rotation={[-Math.PI / 2, Math.PI, 0]}
        />
      </group>
      <group
        castShadow
        receiveShadow>
        <mesh
          castShadow
          receiveShadow
          position={[0, DoubleDoorInfo.height / 2 + 0.2, -0.275]}>
          <boxGeometry args={[DoubleDoorInfo.width + 0.6, 0.2, 0.4]} />
          <meshStandardMaterial map={FloorTexture.map} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[DoubleDoorInfo.width / 2 + 0.2, 0.05, -0.275]}>
          <boxGeometry args={[0.2, DoubleDoorInfo.height + 0.1, 0.4]} />
          <meshStandardMaterial map={FloorTexture.map} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[-(DoubleDoorInfo.width / 2 + 0.2), 0.05, -0.275]}>
          <boxGeometry args={[0.2, DoubleDoorInfo.height + 0.1, 0.4]} />
          <meshStandardMaterial map={FloorTexture.map} />
        </mesh>
      </group>
      {/* <group
        castShadow
        receiveShadow>
        <DoubleDoorHandle
          scale={[0.005, 0.005, 0.005]}
          position={[0.15, 0, 0.07]}
          rotation={[0, 0, 0]}
        />
      </group> */}
    </group>
  )
}
