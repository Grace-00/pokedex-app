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

export const isLastOffset = (
  offset: number,
  totalItems: number,
  pageSize: number
): boolean => {
  // Calculate the expected number of items in the last page
  const lastPageSize = totalItems % pageSize

  // If the last page has fewer items than the page size, it's the last offset
  return lastPageSize !== 0 && offset + pageSize >= totalItems
}
