export function isImageByMimeType(file: File) {
  return file.type.startsWith('image/')
}
