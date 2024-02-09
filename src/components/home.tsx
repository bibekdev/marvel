export const HomeBanner = () => {
  return (
    <div className='w-full overflow-hidden relative'>
      <img
        src='https://wallpapers.com/images/hd/marvel-pictures-a8zq5u8qw3ega7cx.jpg'
        alt='marvel page'
        className='w-full object-cover brightness-50 h-screen'
      />
      <div className='absolute z-[200] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col'>
        <h1 className='text-center text-2xl md:text-[40px] text-white md:leading-[40px] font-extrabold'>
          Portal For Marvel Characters
        </h1>
        <div className='button-borders mt-5'>
          <a href={'#table'}>
            <button className='button text-sm md:text-base'>EXPLORE CHARACTERS</button>
          </a>
        </div>
      </div>
    </div>
  )
}
