import { Subtraction } from '@react-three/csg'

interface SliceDoubleDoorPropsType {
  pos: [number, number, number]
  rot: [number, number, number]
  args: [number, number, number]
}

export default function SliceDoubleDoor({ pos, rot, args }: SliceDoubleDoorPropsType) {
  return (
    <Subtraction
      position={pos}
      rotation={rot}>
      <boxGeometry args={args} />
    </Subtraction>
  )
}
