/**
 * 从给定的图像 Blob 中截取指定区域，并返回截取后的图像 Blob。
 *
 * @param {Blob} imageBlob - 输入的图像 Blob。
 * @param {number} cropWidth - 截取区域的宽度。
 * @param {number} cropHeight - 截取区域的高度。
 * @param {number} startX - 截取区域的左上角 X 坐标。
 * @param {number} startY - 截取区域的左上角 Y 坐标。
 * @param {number} endX - 截取区域的右下角 X 坐标。
 * @param {number} endY - 截取区域的右下角 Y 坐标。
 * @returns {Promise<Blob>} - 返回包含截取内容的 Blob 对象。
 *
 * @description
 * 该函数接收一个图像的 Blob 对象，并在指定的区域内截取图像部分，最后返回一个新的 Blob 对象，
 * 其中包含了截取的图像。这个方法主要用于对图像的裁剪操作，例如用户头像的裁剪。
 *
 * 具体步骤如下：
 * 1. 将传入的 Blob 转换为一个 Image 对象，以便在 Canvas 上进行绘制。
 * 2. 等待图像完全加载，以确保可以正确绘制在 Canvas 上。
 * 3. 创建一个 Canvas 元素，并设置其大小为需要截取的区域的大小。
 * 4. 使用 Canvas 的 drawImage 方法，将指定区域的图像绘制到 Canvas 上。
 * 5. 将 Canvas 的内容转换为一个新的 Blob 对象，表示截取后的图像。
 * 6. 释放临时的对象 URL，以避免内存泄漏。
 * 7. 返回截取后的 Blob 对象。
 */
export async function cropImageBlob(imageBlob: Blob, cropWidth: number, cropHeight: number, startX: number, startY: number, endX: number, endY: number): Promise<Blob> {
  // 将 Blob 转换为 Image 对象
  const imageUrl = URL.createObjectURL(imageBlob)
  const image = new Image()
  image.src = imageUrl

  // 等待图片加载完成
  await new Promise((resolve, reject) => {
    image.onload = resolve
    image.onerror = reject
  })

  // 创建 Canvas 元素
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // 设置 Canvas 大小为截取范围大小
  canvas.width = cropWidth
  canvas.height = cropHeight

  // 在 Canvas 上绘制截取的图像部分
  ctx?.drawImage(image, startX, startY, endX - startX, endY - startY, 0, 0, cropWidth, cropHeight)

  // 将 Canvas 内容转换为 Blob 对象
  const croppedBlob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      }
      else {
        reject(new Error('Failed to create blob'))
      }
    }, 'image/png')
  })

  // 释放对象 URL
  URL.revokeObjectURL(imageUrl)

  return croppedBlob
}
export async function cropImageFile(imageFile: File, cropWidth: number, cropHeight: number, startX: number, startY: number, endX: number, endY: number): Promise<File> {
  // 将 File 转换为 Blob
  const imageBlob = imageFile as Blob

  // 调用 cropImageBlob 函数进行剪切
  const croppedBlob = await cropImageBlob(imageBlob, cropWidth, cropHeight, startX, startY, endX, endY)

  // 将 Blob 转换为 File 对象
  const croppedFile = new File([croppedBlob], imageFile.name, {
    type: imageFile.type,
    lastModified: Date.now(),
  })

  return croppedFile
}

export function isImageByMimeType(file: File) {
  return file.type.startsWith('image/')
}
