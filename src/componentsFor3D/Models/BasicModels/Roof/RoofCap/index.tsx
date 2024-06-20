/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Textures from '@/utils/Textures.json'
import { useViewModelLayout } from '@/store/useViewModelLayout'
import { useMemo } from 'react'
import { RepeatWrapping, Shape, TextureLoader } from 'three'
import { useRoof } from '@/store/useRoof'

interface RoofCapPropsType {
  depth: number
  width: number
  position: [number, number, number]
}

export default function RoofCap({ depth, width, position }: RoofCapPropsType) {
  const { material, color } = useRoof()
  const { state } = useViewModelLayout()
  const RoofCapShape = useMemo(() => {
    const modelShape = new Shape()
    modelShape.moveTo(-Math.sin((67.5 * Math.PI) / 180) * (width / 250 / Math.cos((67.5 * Math.PI) / 180)), 0)
    modelShape.lineTo(0, width / 250)
    modelShape.lineTo(Math.sin((67.5 * Math.PI) / 180) * (width / 250 / Math.cos((67.5 * Math.PI) / 180)), 0)
    modelShape.lineTo(Math.sin((67.5 * Math.PI) / 180) * (width / 240 / Math.cos((67.5 * Math.PI) / 180)), 0)
    modelShape.lineTo(0, width / 240)
    modelShape.lineTo(-Math.sin((67.5 * Math.PI) / 180) * (width / 240 / Math.cos((67.5 * Math.PI) / 180)), 0)

    return modelShape
  }, [width])

  const ShingleTexture = useMemo(() => {
    const map = new TextureLoader().load(Textures.Roofing_Shingles_DesertTan.map)
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.rotation = Math.PI / 2
    map.repeat.set(4 / 8, 0.5)

    return { map: map }
  }, [width])
  return (
    <mesh
      castShadow
      receiveShadow
      position={position}>
      <extrudeGeometry
        args={[
          RoofCapShape,
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
      {material === 'metal' ? (
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={state === 'interior' ? 0.1 : 1}
        />
      ) : null}
      {material === 'shingle' ? (
        <meshStandardMaterial
          map={ShingleTexture.map}
          color={color}
          transparent
          opacity={state === 'interior' ? 0.1 : 1}
        />
      ) : null}
    </mesh>
  )
}
