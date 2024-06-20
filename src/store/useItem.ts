/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'

interface ItemInfo {
  key: number
  name: string
  wall: string
  size: [number, number, number]
  pos: [number, number, number]
  rot: [number, number, number]
}

interface IStoreItem {
  itemData: Array<ItemInfo>
  itemCount: number
  increaseItemCount: () => void
  addItemData: (item: ItemInfo) => void
  updateItemData: (item: ItemInfo, key: number) => void
  removeItemData: (keyArray: Array<number>) => void
}

export const useItem = create<IStoreItem>((set) => ({
  itemData: [],
  itemCount: 0,
  increaseItemCount: () =>
    set((state) => ({
      itemCount: state.itemCount + 1
    })),
  addItemData: (newItem) =>
    set((state) => ({
      ...state,
      itemData: [...state.itemData, newItem]
    })),
  updateItemData: (newItem, key) =>
    set((state) => ({
      ...state,
      itemData: state.itemData.map((item) => {
        if (item.key === key) return newItem
        return item
      })
    })),
  removeItemData: (keyArray) =>
    set((state) => ({
      ...state,
      itemData: state.itemData.filter((item) => {
        if (keyArray.length > 0) return !keyArray.includes(item.key)
      })
    }))
}))
