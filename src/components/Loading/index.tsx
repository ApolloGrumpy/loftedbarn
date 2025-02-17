import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useProgress } from '@react-three/drei'

export default function Loading() {
  const { progress } = useProgress()
  const bg = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [hide, setHide] = useState(false)
  const [finishIn, setFinishIn] = useState(false)

  const fadeIn = () => {
    gsap.to(content.current, {
      duration: 2,
      ease: 'power1.out',
      opacity: 1,
      onComplete: () => {
        setFinishIn(true)
      }
    })
  }

  const fadeOut = () => {
    gsap.to(content.current, {
      duration: 1,
      ease: 'power1.out',
      opacity: 0,
      onComplete: () => {
        gsap.to(bg.current, {
          duration: 2,
          ease: 'power1.out',
          opacity: 0,
          onComplete: () => {
            setHide(true)
          }
        })
      }
    })
  }
  useEffect(() => {
    if (!finishIn) fadeIn()
    if (progress === 100 && finishIn) fadeOut()
  }, [progress, finishIn])

  return hide ? null : (
    <div
      ref={bg}
      className="absolute left-0 top-0 z-[99999999] flex h-screen w-screen flex-col items-center justify-center bg-white  text-zinc-700">
      <div
        ref={content}
        className="flex flex-col items-center justify-center space-y-2 opacity-0">
        <div>
          <div
            style={{ width: (180 / 100) * progress }}
            className="w-0 translate-y-[2px] border-b-2 border-zinc-900 pb-1"
          />
          <p className="border-t-2 border-zinc-700 px-16 py-3 text-[9px]">L O A D I N G</p>
        </div>
      </div>
    </div>
  )
}
