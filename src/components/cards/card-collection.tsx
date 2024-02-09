import { Card } from './card'

type CardProps = {
  data: any
  title: string
}

export const CardCollection: React.FC<CardProps> = ({ data = [], title }) => {
  return (
    <div className='mt-5'>
      <h2 className='text-2xl font-bold text-gray-300 mb-5'>{title}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {data?.map((comic: any) => (
          <Card
            imgUrl={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            title={comic.title}
          />
        ))}
      </div>
    </div>
  )
}
