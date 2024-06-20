/* eslint-disable @typescript-eslint/no-unused-vars */
import { useStoreCamera } from '@/store/useCamera'
import { useViewModelLayout } from '@/store/useViewModelLayout'

export default function ViewModeLayout() {
  const { state, setState } = useViewModelLayout()
  const { fullScreen } = useStoreCamera()

  const handleChange = (value: string) => {
    setState(value)
  }

  return (
    <div
      style={fullScreen ? { display: 'none' } : { display: 'block' }}
      className="absolute top-0 w-full">
      <div className="m-8 flex justify-between">
        <div className="space-x-4">
          <button
            className={state === 'exterior' ? 'scene-layout-button-active' : 'scene-layout-button'}
            onClick={() => handleChange('exterior')}>
            EXTERIOR
          </button>
          <button
            className={state === 'interior' ? 'scene-layout-button-active' : 'scene-layout-button'}
            onClick={() => handleChange('interior')}>
            INTERIOR
          </button>
          <button
            className={state === 'floorplan' ? 'scene-layout-button-active' : 'scene-layout-button'}
            onClick={() => handleChange('floorplan')}>
            FLOOR PLAN
          </button>
        </div>
        <div>
          <button className="scene-layout-button">+ ADD OPTIONS</button>
        </div>
      </div>
    </div>
  )
}
