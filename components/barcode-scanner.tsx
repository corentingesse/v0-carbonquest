"use client"

import { useEffect, useState } from "react"
import { BrowserMultiFormatReader } from "@zxing/library"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Camera } from "lucide-react"

interface BarcodeScannerProps {
  onScan: (barcode: string) => void
  onCancel: () => void
}

export function BarcodeScanner({ onScan, onCancel }: BarcodeScannerProps) {
  const [error, setError] = useState<string | null>(null)
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([])
  const [selectedCamera, setSelectedCamera] = useState<string | undefined>(undefined)

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()

    // Liste des caméras disponibles
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length === 0) {
          setError("Aucune caméra détectée")
          return
        }

        setCameras(videoInputDevices)
        setSelectedCamera(videoInputDevices[0].deviceId)

        const videoElement = document.getElementById("video") as HTMLVideoElement

        if (videoElement) {
          codeReader
            .decodeFromVideoDevice(videoInputDevices[0].deviceId, videoElement, (result, err) => {
              if (result) {
                // Vibrer si disponible
                if (navigator.vibrate) {
                  navigator.vibrate(100)
                }
                onScan(result.getText())
              }
            })
            .catch((err) => {
              setError("Erreur d'accès à la caméra: " + err)
            })
        }
      })
      .catch((err) => {
        setError("Erreur d'accès à la caméra: " + err)
      })

    return () => {
      codeReader.reset()
    }
  }, [onScan])

  const switchCamera = () => {
    if (cameras.length <= 1) return

    const codeReader = new BrowserMultiFormatReader()
    const currentIndex = cameras.findIndex((camera) => camera.deviceId === selectedCamera)
    const nextIndex = (currentIndex + 1) % cameras.length
    const nextCamera = cameras[nextIndex].deviceId

    setSelectedCamera(nextCamera)

    const videoElement = document.getElementById("video") as HTMLVideoElement

    if (videoElement) {
      codeReader.reset()
      codeReader
        .decodeFromVideoDevice(nextCamera, videoElement, (result, err) => {
          if (result) {
            // Vibrer si disponible
            if (navigator.vibrate) {
              navigator.vibrate(100)
            }
            onScan(result.getText())
          }
        })
        .catch((err) => {
          setError("Erreur d'accès à la caméra: " + err)
        })
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {error ? (
        <div className="flex items-center p-4 text-red-800 bg-red-50 rounded-xl border border-red-100">
          <AlertCircle className="w-5 h-5 mr-2" />
          <p>{error}</p>
        </div>
      ) : (
        <Card className="overflow-hidden w-full aspect-square relative border-none shadow-lg">
          <video id="video" className="w-full h-full object-cover"></video>
          <div className="absolute inset-0 border-2 border-green-500 opacity-30 pointer-events-none"></div>

          {/* Overlay avec instructions */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-4 bg-gradient-to-b from-black/30 to-black/30 text-white">
            <div className="text-center bg-black/50 px-3 py-1 rounded-full text-sm">Centrez le code-barres</div>
            <div className="flex justify-between w-full">
              {cameras.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 text-white border-none"
                  onClick={switchCamera}
                >
                  <Camera className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
      <Button
        variant="destructive"
        onClick={onCancel}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-none shadow-md hover:shadow-lg transition-all duration-200"
      >
        Annuler
      </Button>
    </div>
  )
}
