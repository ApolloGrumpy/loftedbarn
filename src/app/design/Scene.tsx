/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LoftedBarn from '@/componentsFor3D/Buildings/LoftedBarn'
import { Canvas } from '@react-three/fiber'
import { CameraControls, ContactShadows } from '@react-three/drei'
import { Environment } from '@react-three/drei'
import { useStoreCamera } from '@/store/useCamera'
import Lights from '@/components/Light'
import DownLoad from '@/components/Download'
import { Color } from 'three'

export default function Scene() {
  const { cameraRef, download } = useStoreCamera()
  const bgColor = new Color(0xffffff)
  return (
    <Canvas
      shadows
      camera={{ fov: 30, far: 200, position: [30, 50, 40] }}>
      <color
        attach="background"
        args={[bgColor.r, bgColor.g, bgColor.b]}
      />
      <ambientLight />
      <Lights />
      <spotLight
        castShadow
        intensity={10}
        angle={0.1}
        position={[-200, 220, -100]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.000001}
      />
      <LoftedBarn />
      <ContactShadows
        position={[0, -0.7, 0]}
        scale={100}
        blur={4}
        far={6.5}
      />
      <Environment
        files={'assets/potsdamer_platz_1k.hdr'}
        blur={1}
      />
      <CameraControls
        ref={cameraRef}
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      {download && <DownLoad />}
    </Canvas>
  )
}
