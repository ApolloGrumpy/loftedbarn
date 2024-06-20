/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { useStoreCamera } from '@/store/useCamera'
import { useThree } from '@react-three/fiber'

const DownLoad = () => {
  const { gl, scene, camera } = useThree()
  const { download, setDownload } = useStoreCamera()

  useEffect(() => {
    if (download) {
      const saveScreenshot = (fileName: string): Promise<void> => {
        gl.render(scene, camera)
        return new Promise((resolve) => {
          gl.domElement.toBlob(
            (blob) => {
              if (blob) {
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = fileName
                a.click()
                window.URL.revokeObjectURL(url)
                resolve()
              }
            },
            'image/png',
            1
          )
        })
      }

      const downloadFiles = async () => {
        const frontFileName = 'download.png'

        await saveScreenshot(frontFileName)
      }

      downloadFiles().then(() => {
        setDownload(false)
      })
    }
  }, [download])

  return null
}

export default DownLoad
