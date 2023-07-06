import { useEffect, useState } from 'react'
import { PokemonPage } from './types'
import { fetchPokemonData } from './api/api'
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom'

export const useLoadingState = (initialState = true) => {
  const [isLoading, setIsLoading] = useState(initialState)

  useEffect(() => {
    setIsLoading(true)
  }, [])

  return { isLoading, setIsLoading }
}

export const updateURL = (
  newPage: number,
  navigate: NavigateFunction,
  location: Location
) => {
  const searchParams = new URLSearchParams(location.search)
  searchParams.set('page', String(newPage))
  navigate({ search: searchParams.toString() })
}

export const usePagination = (pokemonData: PokemonPage) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const pageParam = searchParams.get('page')
    const parsedPage = pageParam ? parseInt(pageParam, 10) : 1
    setCurrentPage(parsedPage)
    setMaxPage(Math.ceil(pokemonData.count / 20))
  }, [location.search, pokemonData])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      updateURL(currentPage - 1, navigate, location)
    }
  }

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      updateURL(currentPage + 1, navigate, location)
    }
  }

  return {
    currentPage,
    handlePrevPage,
    handleNextPage,
  }
}

export const usePokemonData = () => {
  const [pokemonData, setPokemonData] = useState<PokemonPage>({
    results: [],
    next: null,
    previous: null,
    count: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { currentPage } = usePagination(pokemonData)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await fetchPokemonData((currentPage - 1) * 20)
      setPokemonData(data)
    } catch (error) {
      setError('Unable to fetch Pokemon list')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [currentPage])

  return {
    pokemonData,
    isLoading,
    error,
  }
}
