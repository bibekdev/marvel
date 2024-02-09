import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { fetchAllCharacters } from '../services/api'
import { useQuery } from '@tanstack/react-query'
import { Loading } from '../components/loading'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

interface Character {
  id: number
  name: string
  comics: {
    available: number
  }
}

const ChartPage = () => {
  const [selectedCharacters, setSelectedCharacters] = useState<{
    [key: number]: boolean
  }>({})

  // * Fetching all the characters from the api
  const { data, isLoading } = useQuery({
    queryKey: ['characters', 0, ''],
    queryFn: async () => await fetchAllCharacters({ pageSize: 20, pageIndex: 0 }, ''),
  })

  // Adding and Removing the character id from state to toggle their data in the chart
  const handleCheckboxChange = (characterId: number) => {
    setSelectedCharacters(prevSelectedCharacters => ({
      ...prevSelectedCharacters,
      [characterId]: !prevSelectedCharacters[characterId],
    }))
  }

  // Use of filter function
  const selectedCharactersData = data?.results?.filter(
    (character: Character) => selectedCharacters[character.id]
  )

  // use of map function to create new array with character names only
  const characterNames = selectedCharactersData?.map(
    (character: Character) => character.name
  )
  // use of map function to create new array with character comics count only
  const comicsCount = selectedCharactersData?.map(
    (character: Character) => character.comics.available
  )

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const chartData = {
    labels: characterNames,
    datasets: [
      {
        label: 'Number of Comics',
        data: comicsCount,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Comic Appearance Bar Chart',
      },
    },
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className='text-gray-400'>
      <h2 className='mb-4'>Marvel Characters by Comics Count</h2>
      <div className='flex flex-col lg:flex-row gap-10'>
        <div>
          {data.results.map((character: Character) => (
            <div key={character.id} className='flex'>
              <label className='flex'>
                <input
                  type='checkbox'
                  checked={selectedCharacters[character.id]}
                  onChange={() => handleCheckboxChange(character.id)}
                />
                <p className='ml-1'>{character?.name}</p>
              </label>
            </div>
          ))}
        </div>
        <div className='md:w-full'>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default ChartPage
