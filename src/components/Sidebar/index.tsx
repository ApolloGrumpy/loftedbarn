/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BoxWithCheck from './BoxWithCheck'
import ItemController from './ItemController'
import LocationMap from './LocationMap'
import Menu from '../Forms/Menu'
import { useBuilding } from '@/store/useBuilding'
import { useMemo } from 'react'
import { useRoof } from '@/store/useRoof'

export default function Sidebar() {
  const { buildingHeight, setWidth, setHeight, setDepth, setDeltaHeight } = useBuilding()
  const { material, setRoofMaterial, setRoofColor } = useRoof()
  const sizeMenu = useMemo(() => {
    const sizeArray: any[] = []

    for (let i = 8; i <= 16; i += 2) {
      for (let j = i; j <= 44; j += 2) {
        sizeArray.push([i, j])
      }
    }

    return sizeArray
  }, [])
  const changeSizeHandle = (event: any) => {
    setWidth(sizeMenu[event.target.value][0])
    setDepth(sizeMenu[event.target.value][1])
  }

  const changeHeightHandle = (value: number) => {
    if (value === 6) {
      setDeltaHeight(4.6)
      setHeight(6)
    } else if (value === 8) {
      setDeltaHeight(5.16)
      setHeight(8)
    }
  }

  const changeRoofMaterial = (value: string) => {
    if (value === 'metal') {
      setRoofMaterial('metal')
    } else if (value === 'shingle') {
      setRoofMaterial('shingle')
    }
  }

  const changeRoofColor = (value: string) => {
    setRoofColor(value)
  }

  return (
    <div className="sidebar m-8 h-full w-96 space-y-5 px-2">
      <Menu
        fontSize={19}
        padding={12}
        onChangeHandle={null}>
        <option>Lofted Barn</option>
      </Menu>
      <LocationMap />
      <div>
        <p className=" mb-1 text-xs font-normal">Size</p>
        <div>
          <Menu
            fontSize={11}
            padding={9}
            onChangeHandle={changeSizeHandle}>
            {sizeMenu.map((item, index) => (
              <option
                key={index}
                value={index}>{`${item[0]}’ Width x ${item[1]}’ Length`}</option>
            ))}
          </Menu>
        </div>
      </div>
      <div>
        <p className=" mb-1 text-xs font-normal">Siding & Trim</p>
        <div>
          <Menu
            fontSize={11}
            padding={9}
            onChangeHandle={null}>
            <option>LP Smartside Siding: Barn Red</option>
          </Menu>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="mb-1 text-xs font-normal">Roof Material</p>
        <div className="mb-1 flex items-center space-x-2">
          <BoxWithCheck
            width={102}
            height={38}
            active={material === 'metal' ? true : false}
            onChangeHanlde={() => changeRoofMaterial('metal')}>
            <img
              src="assets/image/roofmaterial/roof_material_1.jpg"
              alt="No find image"
              className="h-full rounded-sm"
            />
            <p className="ml-3 text-xs font-light">Metal</p>
          </BoxWithCheck>
          <BoxWithCheck
            width={102}
            height={38}
            active={material === 'shingle' ? true : false}
            onChangeHanlde={() => changeRoofMaterial('shingle')}>
            <img
              src="assets/image/roofmaterial/roof_material_2.jpg"
              alt="No find image"
              className="h-full rounded-sm"
            />
            <p className="ml-3 text-xs font-light">Shingles</p>
          </BoxWithCheck>
          <p className="ml-3 cursor-pointer text-[8px] font-medium text-gray-500 underline underline-offset-1">AddMore</p>
        </div>
        <div className="flex space-x-2">
          <div
            className="h-3.5 w-3.5 rounded-full bg-[#697C83]"
            onClick={() => changeRoofColor('#697C83')}></div>
          <div
            className="h-3.5 w-3.5 rounded-full bg-[#9CD2D0]"
            onClick={() => changeRoofColor('#9CD2D0')}></div>
          <div
            className="h-3.5 w-3.5 rounded-full bg-[#8F9595]"
            onClick={() => changeRoofColor('#8F9595')}></div>
          <div
            className="h-3.5 w-3.5 rounded-full bg-[#FFDE4F]"
            onClick={() => changeRoofColor('#FFDE4F')}></div>
          <p className="ml-3 cursor-pointer text-[8px] font-medium text-gray-500 underline underline-offset-1">MoreColors</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="mb-1 text-xs font-normal">SideWall</p>
        <div className="mb-1 flex items-center space-x-2">
          <BoxWithCheck
            width={62}
            height={21}
            active={buildingHeight === 6 ? true : false}
            onChangeHanlde={() => changeHeightHandle(6)}>
            <p className="w-full text-center text-xs font-light">6’ Walls</p>
          </BoxWithCheck>
          <BoxWithCheck
            width={62}
            height={21}
            active={buildingHeight === 8 ? true : false}
            onChangeHanlde={() => changeHeightHandle(8)}>
            <p className="w-full text-center text-xs font-light">8’ Walls</p>
          </BoxWithCheck>
        </div>
      </div>
      <div className="border-t border-black"></div>
      <div className="flex justify-between">
        <div>
          <p className="text-[10px] font-light">Base Price</p>
          <p className="text-[10px] font-light">Upgrades</p>
          <p className="text-[11px] font-normal">Total Price</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-light">$5,540.00</p>
          <p className="text-[10px] font-light">$0.00</p>
          <p className="text-[11px] font-normal">$0.00</p>
        </div>
      </div>
      <div>
        <p className=" text-lg font-medium">Upgrades</p>
      </div>
      <ItemController />
    </div>
  )
}
