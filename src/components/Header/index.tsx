/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Image from 'next/image'
import { useStoreCamera } from '@/store/useCamera'

export default function Header() {
  const { fullScreen } = useStoreCamera()
  return (
    <>
      {fullScreen === false && (
        <div>
          <div className="flex w-screen justify-between p-4">
            <Image
              src={'/assets/image/logo_1.png'}
              alt={'logo'}
              width={201.11}
              height={58.76}
              priority={true}
            />
            <Image
              src={'/assets/image/logo_2.png'}
              alt={'logo'}
              width={61}
              height={49}
              priority={true}
            />
          </div>
          <div className="flex items-center justify-center space-x-7">
            <div className="flex items-center justify-center space-x-3">
              <div className="h-6 w-6 rounded-full bg-blue-300 text-center text-white">1</div>
              <p className="text-blue-300">Product</p>
            </div>
            <div className="w-40 border border-gray-400" />
            <div className="flex items-center justify-center space-x-3">
              <div className="h-6 w-6 rounded-full bg-blue-500 text-center text-white">2</div>
              <p className="text-blue-500">Design</p>
            </div>
            <div className="w-40 border border-gray-400" />
            <div className="flex items-center justify-center space-x-3">
              <div className="h-6 w-6 rounded-full bg-gray-400 text-center text-white">3</div>
              <p className="text-gray-400">Information</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
