import { ref } from 'vue'

export function useCropPromise() {
  const cropPromise = ref<Promise<Blob> | null>(null)
  const resolveCrop = ref<(value: Blob | PromiseLike<Blob>) => void>()
  const rejectCrop = ref<(reason?: any) => void>()

  const createCropPromise = () => {
    cropPromise.value = new Promise<Blob>((resolve, reject) => {
      resolveCrop.value = resolve
      rejectCrop.value = reject
    })
  }

  const crop = (cropFunction: () => Promise<Blob>) => {
    if (!cropPromise.value) {
      createCropPromise()
    }

    cropFunction()
      .then(resolveCrop.value)
      .catch(rejectCrop.value)

    return cropPromise.value
  }

  return {
    crop,
  }
}
