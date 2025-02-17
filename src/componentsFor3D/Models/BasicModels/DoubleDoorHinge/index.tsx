/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 door_hinge.glb -t 
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
    Object_3: THREE.Mesh
    Object_4: THREE.Mesh
  }
  materials: {
    ['material_0.001']: THREE.MeshStandardMaterial
    ['material_0.001']: THREE.MeshStandardMaterial
  }
}

interface DoubleDoorHingePropsType {
  color: string
  scale: [number, number, number]
  position: [number, number, number]
  rotation: [number, number, number]
}

export function DoubleDoorHinge({ color, scale, position, rotation }: DoubleDoorHingePropsType) {
  const { nodes, materials } = useGLTF('/assets/models/door_hinge.glb') as GLTFResult
  return (
    <group
      castShadow
      receiveShadow
      scale={scale}
      position={position}
      rotation={rotation}
      dispose={null}>
      <group
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}>
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.2}
            color={color}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}>
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.2}
            color={color}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}>
          <meshStandardMaterial
            metalness={0.9}
            roughness={0.2}
            color={color}
          />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/door_hinge.glb')
