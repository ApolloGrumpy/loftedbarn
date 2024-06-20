import Location from '@/components/SVGIcon/Location'

export default function LocationMap() {
  return (
    <div>
      <p className="mb-1 text-sm font-semibold">Location</p>
      <div className="flex justify-center rounded-sm border border-dashed border-blue-400 py-2">
        <div className="flex flex-col place-items-center">
          <div className="py-2">
            <Location />
          </div>
          <p className="text-xs font-medium text-gray-500">Select Location</p>
        </div>
      </div>
    </div>
  )
}
