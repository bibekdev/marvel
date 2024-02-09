import { PaginationState } from '@tanstack/react-table'
import axios from 'axios'

const apiUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  params: {
    ts: import.meta.env.VITE_TS,
    apikey: import.meta.env.VITE_API_KEY,
    hash: import.meta.env.VITE_HASH,
  },
})

export const fetchAllCharacters = async (
  pagination: PaginationState,
  characterName: string
) => {
  try {
    const { data } = await apiUrl.get(`/characters?offset=${pagination.pageIndex * 20}`)

    if (characterName) {
      const { data } = await apiUrl.get(
        `/characters?offset=${pagination.pageIndex * 20}&name=${characterName}`
      )
      return data.data
    }
    return data.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchSingleCharacter = async (characterId: string) => {
  const response = await apiUrl.get(`/characters/${characterId}`)
  return response.data?.data.results[0]
}

export const fetchSingleCharacterComics = async (characterId: string) => {
  const response = await apiUrl.get(`/characters/${characterId}/comics`)
  return response.data?.data.results
}

export const fetchSingleCharacterSeries = async (characterId: string) => {
  const response = await apiUrl.get(`/characters/${characterId}/series`)
  return response.data?.data.results
}
