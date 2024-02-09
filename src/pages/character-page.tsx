import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  fetchSingleCharacter,
  fetchSingleCharacterComics,
  fetchSingleCharacterSeries,
} from '../services/api'
import { Loading } from '../components/loading'
import { CardCollection } from '../components/cards/card-collection'

const CharacterPage = () => {
  const { characterId } = useParams()

  // Fetching data of character
  const { data, isLoading } = useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => await fetchSingleCharacter(characterId!),
  })

  // fetching comic list of that character
  const { data: comicData } = useQuery({
    queryKey: ['character', characterId, 'comic'],
    queryFn: async () => await fetchSingleCharacterComics(characterId!),
  })

  // fetching series list of that character
  const { data: seriesData } = useQuery({
    queryKey: ['character', characterId, 'series'],
    queryFn: async () => await fetchSingleCharacterSeries(characterId!),
  })

  return isLoading ? (
    <Loading />
  ) : (
    <div className='w-[70%] mx-auto mt-10'>
      <div className='flex flex-col md:flex-row items-center gap-[10%]'>
        <div className='w-[400px] overflow-hidden rounded-md'>
          <img
            src={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
            alt='character image'
            className='object-cover'
          />
        </div>
        <div className='mt-3 md:mt-0'>
          <h1 className='lg:text-4xl md:text-2xl text-xl font-bold text-gray-300'>
            {data.name}
          </h1>
          <p className='max-w-[700px] mt-5 md:mt-10 text-gray-400 text-base md:text-xl text-justify'>
            {data.description ? data.description : 'No description for this character.'}
          </p>
        </div>
      </div>
      <div>
        <CardCollection data={comicData} title='Comic Appearance' />
        <div className='mt-10'></div>
        <CardCollection data={seriesData} title='Series Appearance' />
      </div>
    </div>
  )
}

export default CharacterPage
