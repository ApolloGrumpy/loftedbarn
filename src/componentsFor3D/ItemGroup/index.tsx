/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import DraggableItem from '../DraggableItem'
import { useItem } from '@/store/useItem'

export default function ItemGroup() {
  const { itemData } = useItem()

  return (
    <mesh
      castShadow
      receiveShadow>
      {itemData.map((item, index) => (
        <DraggableItem
          key={index}
          index={item.key}
          name={item.name}
          wall={item.wall}
          size={item.size}
          pos={item.pos}
          rot={item.rot}
        />
      ))}
    </mesh>
  )
}
