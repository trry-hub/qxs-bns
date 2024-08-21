// useCanvas.ts
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'

export function useCanvas(canvasElement: HTMLCanvasElement) {
  const context: Ref<CanvasRenderingContext2D | null> = ref(null)

  if (canvasElement) {
    context.value = canvasElement.getContext('2d')
  }

  const clearCanvas = () => {
    if (context.value) {
      context.value.clearRect(0, 0, canvasElement.width, canvasElement.height)
    }
  }

  const drawColor = (x: number, y: number, width: number, height: number, color: string) => {
    if (context.value) {
      context.value.fillStyle = color
      context.value.fillRect(x, y, width, height)
    }
  }

  const drawImage = (image: HTMLImageElement, x: number, y: number, width: number, height: number) => {
    context.value!.drawImage(image, x, y, width, height)
  }

  const cropCanvas = (x: number, y: number, width: number, height: number): Promise<File | null> => {
    return new Promise((resolve) => {
      if (context.value) {
        const croppedCanvas = document.createElement('canvas')
        croppedCanvas.width = width
        croppedCanvas.height = height
        const croppedContext = croppedCanvas.getContext('2d')
        if (croppedContext) {
          croppedContext.drawImage(canvasElement, x, y, width, height, 0, 0, width, height)
          croppedCanvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], 'cropped_image.png', { type: 'image/png' })
              resolve(file)
            }
            else {
              resolve(null)
            }
          }, 'image/png')
        }
        else {
          resolve(null)
        }
      }
      else {
        resolve(null)
      }
    })
  }

  return {
    clearCanvas,
    drawColor,
    drawImage,
    cropCanvas,
  }
}
