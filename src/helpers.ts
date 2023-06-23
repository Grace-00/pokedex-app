import { useEffect, useState } from 'react'

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

export const useLoadingState = (initialState = true) => {
  const [isLoading, setIsLoading] = useState(initialState)

  useEffect(() => {
    setIsLoading(true)
  }, [])

  return { isLoading, setIsLoading }
}
