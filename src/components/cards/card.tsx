type CardProps = {
  imgUrl: string
  title: string
}

export const Card: React.FC<CardProps> = ({ imgUrl, title }) => {
  return (
    <div className='flex flex-col'>
      <img src={imgUrl} alt={title} className='w-[300px] h-full' />
      <p className='text-gray-400 mt-2'>{title}</p>
    </div>
  )
}
