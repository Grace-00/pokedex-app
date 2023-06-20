export const handlePageChange = (
  newOffset: number | null,
  currentOffset: number
) => {
  if (newOffset !== null) {
    return newOffset
  }
  return currentOffset
}

export const extractOffsetFromUrl = (url: string) => {
  const urlParams = new URL(url)
  const offset = urlParams.searchParams.get('offset')
  return offset !== null ? Number(offset) : null
}
